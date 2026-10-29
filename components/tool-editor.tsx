'use client';

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const CodeEditor = dynamic(
  () => import("@/components/code-editor").then((mod) => mod.CodeEditor),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-muted/30 animate-pulse" />,
  }
);

const DiagramPreview = dynamic(
  () => import("@/components/diagram-preview").then((mod) => mod.DiagramPreview),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-background animate-pulse" />,
  }
);

interface ToolEditorProps {
  initialCode: string;
  storageKey?: string;
  className?: string;
}

export function ToolEditor({
  initialCode,
  storageKey,
  className,
}: ToolEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [refreshKey, setRefreshKey] = useState(0);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const isInitialMount = useRef(true);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    if (!storageKey || typeof window === "undefined") {
      isInitialMount.current = false;
      return;
    }
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setCode(saved);
    }
    isInitialMount.current = false;
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey || isInitialMount.current || typeof window === "undefined") {
      return;
    }
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      localStorage.setItem(storageKey, code);
    }, 500);
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [code, storageKey]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  const handleRefresh = useCallback(() => {
    if (storageKey && typeof window !== "undefined") {
      localStorage.setItem(storageKey, code);
    }
    setRefreshKey((prev) => prev + 1);
  }, [code, storageKey]);

  return (
    <div
      id="tool-editor"
      className={
        className ??
        "h-[min(70vh,640px)] w-full overflow-hidden rounded-lg border border-border bg-background"
      }
    >
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel id="tool-code" order={1} defaultSize={45} minSize={30}>
          <CodeEditor
            value={code}
            onChange={handleCodeChange}
            onRefresh={handleRefresh}
          />
        </ResizablePanel>
        <ResizableHandle className="w-1 bg-border" />
        <ResizablePanel id="tool-preview" order={2} defaultSize={55} minSize={30}>
          <DiagramPreview code={code} refreshKey={refreshKey} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
