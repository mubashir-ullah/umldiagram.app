'use client';

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { StudioTopBar } from "@/components/studio-top-bar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const CodeEditor = dynamic(() => import("@/components/code-editor").then(mod => mod.CodeEditor), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-muted/30 animate-pulse" />
});

const DiagramPreview = dynamic(() => import("@/components/diagram-preview").then(mod => mod.DiagramPreview), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-background animate-pulse" />
});

const DEFAULT_CODE = `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono

title Simple Class Diagram

class User {
  -id: string
  -username: string
  -email: string
  +login()
  +logout()
}

class Post {
  -id: string
  -title: string
  -content: string
  -createdAt: Date
  +publish()
  +delete()
}

User "1" -- "*" Post : creates
@enduml`;

const STORAGE_KEY = 'plantuml-code';

export function PageEditor() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [refreshKey, setRefreshKey] = useState(0);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem(STORAGE_KEY);
      if (savedCode) {
        setCode(savedCode);
      }
      isInitialMount.current = false;
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }

    if (typeof window !== 'undefined') {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, code);
      }, 500);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [code]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const handleTemplateSelect = useCallback((templateCode: string) => {
    setCode(templateCode);
  }, []);

  const handleRefresh = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, code);
    }
    setRefreshKey(prev => prev + 1);
  }, [code]);

  return (
    <div id="editor" className="flex flex-col h-screen w-full bg-background">
      <StudioTopBar onTemplateSelect={handleTemplateSelect} />

      <div className="flex-1 overflow-hidden h-screen">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel id="code-editor" order={1} defaultSize={40} minSize={25}>
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              onRefresh={handleRefresh}
            />
          </ResizablePanel>

          <ResizableHandle className="w-1 bg-border hover-elevate" />

          <ResizablePanel id="diagram-preview" order={2} defaultSize={60} minSize={25}>
            <DiagramPreview code={code} refreshKey={refreshKey} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
