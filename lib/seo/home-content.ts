/**
 * Homepage FAQ, how-to steps, and features.
 * Render these in the page and pass the same strings into JSON-LD.
 */

export const HOME_FEATURES = [
  "Live PlantUML preview",
  "No install required",
  "PNG and SVG export",
  "Starter templates for common diagrams",
  "Free to use in the browser",
];

export const HOME_HOW_TO = {
  name: "How to create a UML diagram here",
  description:
    "Create a UML diagram in the browser with a focused maker or the studio, then export PNG or SVG.",
  steps: [
    {
      name: "Open the right maker",
      text: "Open the maker that matches your question (structure, behavior, data, or architecture).",
    },
    {
      name: "Edit the starter",
      text: "Edit the starter so names match your domain.",
    },
    {
      name: "Check the preview",
      text: "Check the live preview.",
    },
    {
      name: "Export",
      text: "Export PNG or SVG for docs, tickets, or slides.",
    },
  ],
};

export interface HomeFaq {
  question: string;
  answer: string;
}

export const HOME_FAQS: HomeFaq[] = [
  {
    question: "What is a UML diagram?",
    answer:
      "A standardized visual for modeling software structure and behavior using Unified Modeling Language notation.",
  },
  {
    question: "Is this UML diagram tool free?",
    answer:
      "Yes. You can create and export diagrams online without a paid subscription.",
  },
  {
    question: "What can I create here?",
    answer:
      "Class, sequence, activity, use case, state, component, deployment, ER, flowchart, DFD, C4-style architecture, and more through the tools directory.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No. Editors run in the browser with live preview and export.",
  },
];

/** Phrases in the create-here answer that should link to the matching maker. */
export const HOME_FAQ_LINKS: Record<string, Array<{ phrase: string; href: string }>> = {
  "What can I create here?": [
    { phrase: "Class", href: "/tools/class-diagram-maker" },
    { phrase: "sequence", href: "/tools/sequence-diagram-maker" },
    { phrase: "activity", href: "/tools/activity-diagram-maker" },
    { phrase: "use case", href: "/tools/use-case-diagram-maker" },
    { phrase: "state", href: "/tools/state-diagram-maker" },
    { phrase: "component", href: "/tools/component-diagram-maker" },
    { phrase: "deployment", href: "/tools/deployment-diagram-maker" },
    { phrase: "ER", href: "/tools/er-diagram-maker" },
    { phrase: "flowchart", href: "/tools/flowchart-maker" },
    { phrase: "DFD", href: "/tools/data-flow-diagram-maker" },
    { phrase: "C4-style architecture", href: "/tools/c4-diagram-maker" },
    { phrase: "tools directory", href: "/tools" },
  ],
};
