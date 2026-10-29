export type ToolCategoryId =
  | "structural"
  | "behavioral"
  | "editors"
  | "developer"
  | "related";

export interface ToolCategory {
  id: ToolCategoryId;
  name: string;
  description: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolSection {
  heading: string;
  body: string;
}

export interface ToolDefinition {
  slug: string;
  category: ToolCategoryId;
  /** Primary searchable phrase this URL owns. One intent per page. */
  keyword: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  defaultCode: string;
  sections: ToolSection[];
  faqs: ToolFaq[];
  relatedSlugs: string[];
  /** Visible feature bullets. Also emitted as SoftwareApplication.featureList. */
  features: string[];
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "structural",
    name: "Structural UML",
    description: "Show what the system is made of: classes, objects, components, packages, and deployment.",
  },
  {
    id: "behavioral",
    name: "Behavioral UML",
    description: "Show what happens over time: interactions, workflows, use cases, and state changes.",
  },
  {
    id: "editors",
    name: "PlantUML Editor",
    description: "Write PlantUML in the browser with live preview and export.",
  },
  {
    id: "developer",
    name: "Code-focused",
    description: "Class diagrams tuned for Java and Python codebases.",
  },
  {
    id: "related",
    name: "Related diagrams",
    description: "ERD, flowchart, DFD, swimlane, C4, and microservices views teams use beside UML.",
  },
];

const themeHeader = `@startuml
!theme plain
skinparam backgroundColor transparent
skinparam defaultFontName JetBrains Mono
`;

function defaultToolFeatures(keyword: string): string[] {
  return [
    `Live editor for ${keyword}`,
    "Starter template included on the page",
    "PNG and SVG export",
    "No install required",
  ];
}

function tool(
  partial: Omit<ToolDefinition, "relatedSlugs" | "features"> & {
    relatedSlugs?: string[];
    features?: string[];
  }
): ToolDefinition {
  return {
    relatedSlugs: [],
    ...partial,
    features: partial.features ?? defaultToolFeatures(partial.keyword),
  };
}

/**
 * One URL = one user job. Broad umbrella terms (uml diagram, free uml tool, uml online)
 * live on the homepage and /studio, not as duplicate tool pages.
 */
export const tools: ToolDefinition[] = [
  tool({
    slug: "class-diagram-maker",
    category: "structural",
    keyword: "class diagram maker",
    name: "Class Diagram Maker",
    title: "Class Diagram Maker Online (Free)",
    metaDescription:
      "Make UML class diagrams online. Model classes, attributes, methods, and relationships with live preview and PNG or SVG export.",
    h1: "Class Diagram Maker",
    intro:
      "Build a UML class diagram in your browser. Start from the template, rename types to match your domain, and export when the structure is clear.",
    defaultCode: `${themeHeader}
title Class Diagram

class User {
  -id: string
  -email: string
  +login()
  +logout()
}

class Post {
  -id: string
  -title: string
  +publish()
}

User "1" -- "*" Post : creates
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Class diagrams show types, fields, operations, and relationships such as association, inheritance, aggregation, and composition. Use them for domain models, API resource shapes, and design reviews before a large refactor.",
      },
      {
        heading: "How to use this maker",
        body: "Edit the PlantUML in the editor. Add a class block for each type, list attributes and methods, then connect relationships. The preview updates as you type. Download PNG or SVG for docs and pull requests.",
      },
      {
        heading: "Notation that matters",
        body: "Visibility is often written as + public, - private, and # protected. Inheritance uses a hollow triangle toward the parent. Composition uses a filled diamond on the whole. Multiplicity labels such as 1, *, or 0..1 sit on association ends.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Limit one diagram to a single bounded context. Hide trivial getters on overview diagrams. Prefer names from the product language over abbreviations.",
      },
    ],
    faqs: [
      {
        question: "Is this class diagram maker free?",
        answer: "Yes. You can create and export diagrams in the browser without a paid plan.",
      },
      {
        question: "Can I work entirely online?",
        answer:
          "Yes. This page is a browser editor with live preview. No desktop install is required for everyday drafting.",
      },
      {
        question: "How is this different from a Java or Python class diagram page?",
        answer:
          "This page is the general class diagram tool. The Java and Python pages use starters and wording tuned to those languages.",
      },
    ],
    relatedSlugs: [
      "object-diagram-maker",
      "java-class-diagram-generator",
      "python-class-diagram-generator",
      "sequence-diagram-maker",
    ],
  }),
  tool({
    slug: "object-diagram-maker",
    category: "structural",
    keyword: "object diagram maker",
    name: "Object Diagram Maker",
    title: "Object Diagram Maker Online (Free)",
    metaDescription:
      "Create UML object diagrams online. Show instances, attribute values, and links for a concrete scenario.",
    h1: "Object Diagram Maker",
    intro:
      "Draw an object diagram when you need a snapshot of instances, not just types. Start from the template, fill in example values, and export when the scenario is obvious to your readers.",
    defaultCode: `${themeHeader}
title Object Diagram

object "user1: User" as user1 {
  id = "u-100"
  email = "alex@example.com"
}

object "post1: Post" as post1 {
  title = "Hello UML"
  status = "published"
}

user1 --> post1 : creates
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Object diagrams show concrete instances, attribute values, and links at a moment in time. Use them for fixtures, sample payloads, onboarding examples, and runtime explanations that a class diagram alone cannot make vivid.",
      },
      {
        heading: "How to use this maker",
        body: "Edit the PlantUML in the editor. Create an object block for each instance, set only the attribute values that matter to the story, draw links between instances, watch the preview, then download PNG or SVG.",
      },
      {
        heading: "Notation that matters",
        body: "Name instances clearly (user1: User). Show attribute values inside the object. Links usually mirror associations from your class model. Keep type names consistent with the class diagram so readers can map example to type.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Limit the scenario to one story, such as a single order with a few line items. Drop attributes that do not change the explanation. Prefer the class diagram maker for type structure and a sequence diagram when message order is the question.",
      },
    ],
    faqs: [
      {
        question: "Is this object diagram maker free?",
        answer: "Yes. You can create and export diagrams in the browser without a paid plan.",
      },
      {
        question: "When should I use an object diagram instead of a class diagram?",
        answer:
          "When stakeholders need a concrete example with real values, not only the abstract type model.",
      },
      {
        question: "Can I work entirely online?",
        answer:
          "Yes. This page is a browser editor with live preview. No desktop install is required for everyday drafting.",
      },
    ],
    relatedSlugs: ["class-diagram-maker", "sequence-diagram-maker", "communication-diagram-maker"],
  }),
  tool({
    slug: "component-diagram-maker",
    category: "structural",
    keyword: "component diagram maker",
    name: "Component Diagram Maker",
    title: "Component Diagram Maker Online (Free)",
    metaDescription:
      "Make UML component diagrams online. Map components, interfaces, and dependencies for modular architectures.",
    h1: "Component Diagram Maker",
    intro:
      "Show how larger software pieces depend on each other. Start from the template, rename components to match your system, and export for architecture notes.",
    defaultCode: `${themeHeader}
title Component Diagram

package "Frontend" {
  [Web App]
}

package "Backend" {
  [API Gateway]
  [Order Service]
}

[Web App] --> [API Gateway]
[API Gateway] --> [Order Service]
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Component diagrams map logical or deployable parts, interfaces, and dependencies. Use them for modular monoliths, library boundaries, and service-style components before you zoom into runtime topology.",
      },
      {
        heading: "How to use this maker",
        body: "Group related components in packages, draw dependency arrows in the direction of use or ownership, preview the layout, then export PNG or SVG for RFCs and onboarding docs.",
      },
      {
        heading: "Notation that matters",
        body: "Components appear as boxes (often with stereotype styling). Dependencies are dashed or solid arrows depending on your convention. Interfaces can be shown when the contract itself matters. Keep external systems visible so boundaries stay honest.",
      },
      {
        heading: "Keep the diagram readable",
        body: "One diagram should answer one architecture question. Hide internal classes unless they define a public boundary. Use the deployment diagram maker for hosts and containers, and the microservices diagram maker when service mesh topology is the story.",
      },
    ],
    faqs: [
      {
        question: "Is this component diagram maker free?",
        answer: "Yes. Create and export in the browser without a subscription.",
      },
      {
        question: "Component diagram or deployment diagram?",
        answer:
          "Component diagrams focus on software structure. Deployment diagrams show where those pieces run.",
      },
      {
        question: "Should every class become a component?",
        answer:
          "No. Components are larger units of structure. Keep fine-grained types on a class diagram.",
      },
    ],
    relatedSlugs: [
      "deployment-diagram-maker",
      "package-diagram-maker",
      "microservices-diagram-maker",
      "c4-diagram-maker",
    ],
  }),
  tool({
    slug: "package-diagram-maker",
    category: "structural",
    keyword: "package diagram maker",
    name: "Package Diagram Maker",
    title: "Package Diagram Maker Online (Free)",
    metaDescription:
      "Create UML package diagrams online. Organize modules and dependencies to keep layered architecture clear.",
    h1: "Package Diagram Maker",
    intro:
      "Map packages and dependency direction so illegal imports show up early. Adapt the layered starter to your module names, then export when the rules look right.",
    defaultCode: `${themeHeader}
title Package Diagram

package "domain" {
  class Order
}

package "application" {
  class PlaceOrder
}

package "infrastructure" {
  class OrderRepository
}

application ..> domain
infrastructure ..> domain
application ..> infrastructure
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Package diagrams show how model elements are grouped and how those groups depend on each other. They are ideal for layered architectures, module boundaries, and import rules that code review alone often misses.",
      },
      {
        heading: "How to use this maker",
        body: "Create package blocks, place only the types needed to explain direction, add dependency arrows, check for cycles in the preview, then export for architecture guidelines.",
      },
      {
        heading: "Notation that matters",
        body: "Packages nest elements. Dependency arrows point toward the package being used. Nested packages can show subsystems. Keep arrow direction consistent with your compile-time or import rules.",
      },
      {
        heading: "Keep the diagram readable",
        body: "If domain depends on infrastructure, the diagram should make that mistake obvious. Do not dump every class into the picture. Use a class diagram for type detail and a component diagram for deployable units.",
      },
    ],
    faqs: [
      {
        question: "Is this package diagram maker free?",
        answer: "Yes. Edit and export online without a paid plan.",
      },
      {
        question: "Should every class appear in a package diagram?",
        answer: "No. Show packages and only the types needed to explain dependency direction.",
      },
      {
        question: "Package diagram or component diagram?",
        answer:
          "Packages emphasize namespace and layering. Components emphasize larger software units and their wiring.",
      },
    ],
    relatedSlugs: ["component-diagram-maker", "class-diagram-maker", "deployment-diagram-maker"],
  }),
  tool({
    slug: "deployment-diagram-maker",
    category: "structural",
    keyword: "deployment diagram maker",
    name: "Deployment Diagram Maker",
    title: "Deployment Diagram Maker Online (Free)",
    metaDescription:
      "Make UML deployment diagrams online. Show nodes, artifacts, and runtime topology for servers and cloud targets.",
    h1: "Deployment Diagram Maker",
    intro:
      "Document where software runs: hosts, containers, artifacts, and communication paths. Rename the starter nodes to match your environment, then export for ops reviews.",
    defaultCode: `${themeHeader}
title Deployment Diagram

node "Web" {
  artifact "web-app"
}

node "API" {
  artifact "api-service"
}

node "Data" {
  database "orders-db"
}

"web-app" --> "api-service" : HTTPS
"api-service" --> "orders-db" : SQL
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Deployment diagrams show runtime topology: nodes for environments, artifacts for deployable units, and links for protocols. Use them when the question is where things run, not only how code is structured.",
      },
      {
        heading: "How to use this maker",
        body: "Add a node for each host or runtime target, place artifacts inside, label connections with protocols, preview, then export PNG or SVG for ops and architecture reviews.",
      },
      {
        heading: "Notation that matters",
        body: "Nodes contain artifacts or nested nodes. Communication paths connect nodes or artifacts. Databases and devices can appear as specialized nodes. Keep environment-specific secrets out of the diagram.",
      },
      {
        heading: "Keep the diagram readable",
        body: "One environment per diagram when staging and production differ. Avoid mixing every microservice detail here. Use a component or microservices diagram for software boundaries, and C4 when you want leveled architecture storytelling.",
      },
    ],
    faqs: [
      {
        question: "Is this deployment diagram maker free?",
        answer: "Yes. Create and export in the browser without a subscription.",
      },
      {
        question: "Can I model containers?",
        answer: "Yes. Treat containers or VMs as nodes and place deployable artifacts inside them.",
      },
      {
        question: "Deployment diagram or component diagram?",
        answer:
          "Deployment shows runtime placement. Components show software structure independent of where it runs.",
      },
    ],
    relatedSlugs: ["component-diagram-maker", "c4-diagram-maker", "microservices-diagram-maker"],
  }),
  tool({
    slug: "composite-structure-diagram-maker",
    category: "structural",
    keyword: "composite structure diagram maker",
    name: "Composite Structure Diagram Maker",
    title: "Composite Structure Diagram Maker (Free)",
    metaDescription:
      "Create UML composite structure diagrams online. Show internal parts and collaborations inside a classifier.",
    h1: "Composite Structure Diagram Maker",
    intro:
      "Model the inside of a complex class or component when a black-box view is not enough. Adapt the starter parts to your design, then export for detailed notes.",
    defaultCode: `${themeHeader}
title Composite Structure Style

class OrderService {
  +placeOrder()
}

class PaymentGateway {
  +charge()
}

class Inventory {
  +reserve()
}

OrderService --> PaymentGateway : charge
OrderService --> Inventory : reserve
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Composite structure diagrams show internal parts and how they collaborate inside one classifier. Use them for detailed design of a complex service or component that a flat class list does not explain.",
      },
      {
        heading: "How to use this maker",
        body: "Identify the enclosing classifier, list collaborating parts, connect collaborations with clear labels, preview, then export for design notes.",
      },
      {
        heading: "Notation that matters",
        body: "Parts sit inside or relate to the enclosing classifier. Connectors show collaboration paths. Ports appear when interaction points on the boundary matter. Keep names aligned with the class or component model.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Prefer a component or class diagram for system-wide structure. Reserve this view for one classifier at a time. If the story is message order, switch to a sequence diagram.",
      },
    ],
    faqs: [
      {
        question: "Is this composite structure diagram maker free?",
        answer: "Yes. Edit and export online without a paid plan.",
      },
      {
        question: "Is this the same as a component diagram?",
        answer:
          "No. Component diagrams emphasize larger software units. Composite structure focuses on internals of one classifier.",
      },
      {
        question: "When is this overkill?",
        answer:
          "When a simple class diagram already shows the collaboration clearly. Use composite structure only when internal parts need their own picture.",
      },
    ],
    relatedSlugs: ["component-diagram-maker", "class-diagram-maker", "sequence-diagram-maker"],
  }),
  tool({
    slug: "profile-diagram-maker",
    category: "structural",
    keyword: "profile diagram maker",
    name: "Profile Diagram Maker",
    title: "Profile Diagram Maker Online (Free)",
    metaDescription:
      "Make UML profile diagrams online. Define stereotypes, tagged values, and extensions for domain-specific modeling.",
    h1: "Profile Diagram Maker",
    intro:
      "Create a UML profile when your team needs shared stereotypes and tagged values beyond stock UML. Start from the template and document only the extensions you will enforce.",
    defaultCode: `${themeHeader}
title Profile Sketch

class <<metaclass>> Class
class <<stereotype>> Entity {
  taggedValue persistence: string
}

Class <|-- Entity
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Profile diagrams show how UML is extended: stereotypes, tagged values, and constraints for a domain such as persistence or messaging. They keep custom modeling rules consistent across teams.",
      },
      {
        heading: "How to use this maker",
        body: "Name the metaclasses you extend, add stereotypes, document tagged values, preview the relationships, then export into modeling guidelines.",
      },
      {
        heading: "Notation that matters",
        body: "Stereotypes extend metaclasses. Tagged values record properties of the stereotype. Constraints state rules the model must obey. Keep the profile small so toolchains stay practical.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Most product teams do not need a profile. Everyday class and sequence diagrams cover day-to-day design. Use a profile only when you maintain a shared custom modeling language.",
      },
    ],
    faqs: [
      {
        question: "Is this profile diagram maker free?",
        answer: "Yes. Create and export in the browser without a subscription.",
      },
      {
        question: "Do most projects need a profile diagram?",
        answer:
          "Only when you maintain a custom modeling language. Everyday class and sequence diagrams cover most product work.",
      },
      {
        question: "Profile diagram or class diagram?",
        answer:
          "Class diagrams model your system types. Profile diagrams model extensions to UML itself.",
      },
    ],
    relatedSlugs: ["class-diagram-maker", "package-diagram-maker", "component-diagram-maker"],
  }),
  tool({
    slug: "sequence-diagram-maker",
    category: "behavioral",
    keyword: "sequence diagram maker",
    name: "Sequence Diagram Maker",
    title: "Sequence Diagram Maker Online (Free)",
    metaDescription:
      "Make UML sequence diagrams online. Show message order between actors and services with live preview and export.",
    h1: "Sequence Diagram Maker",
    intro:
      "Draw a sequence diagram for auth flows, service calls, and feature interactions. Start from the template, keep one happy path clear, then add error branches if needed.",
    defaultCode: `${themeHeader}
title Sequence Diagram

actor User
participant App
participant Auth
database DB

User -> App: Submit login
App -> Auth: Validate
Auth -> DB: Find user
DB --> Auth: Row
Auth --> App: Token
App --> User: Success
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Sequence diagrams show participants as lifelines and messages as arrows over time. Use them for feature interactions, service calls, and any flow where order matters more than static structure.",
      },
      {
        heading: "How to use this maker",
        body: "Declare actors and participants, add messages in call order, use alt or loop fragments when branches matter, watch the preview, then export PNG or SVG.",
      },
      {
        heading: "Notation that matters",
        body: "Solid arrows usually mean synchronous calls. Dashed arrows often show returns. Activation bars mark when work is happening. Name messages after real operations so readers can map them to code. If you already have steps in a doc, turn each step into a short message top to bottom.",
      },
      {
        heading: "Keep the diagram readable",
        body: "One happy path per diagram when possible. Split deep error handling onto a second view. Use the API sequence diagram maker for HTTP hop documentation, and an activity diagram when the story is a procedure rather than message order.",
      },
    ],
    faqs: [
      {
        question: "Is this sequence diagram maker free?",
        answer: "Yes. Edit, preview, and export without a subscription.",
      },
      {
        question: "Sequence diagram or activity diagram?",
        answer:
          "Use sequence when message order between participants matters. Use activity when the focus is workflow steps and decisions.",
      },
      {
        question: "Need an API-focused sequence?",
        answer:
          "Open the API sequence diagram maker when the story is specifically HTTP request and response hops.",
      },
    ],
    relatedSlugs: [
      "api-sequence-diagram-maker",
      "activity-diagram-maker",
      "communication-diagram-maker",
      "plantuml-online",
    ],
  }),
  tool({
    slug: "api-sequence-diagram-maker",
    category: "behavioral",
    keyword: "api sequence diagram",
    name: "API Sequence Diagram Maker",
    title: "API Sequence Diagram Maker Online (Free)",
    metaDescription:
      "Create API sequence diagrams online. Model client, gateway, and service request or response flows for endpoint docs.",
    h1: "API Sequence Diagram Maker",
    intro:
      "Document an API call path with a sequence diagram: client, gateway, services, and status codes that matter. Adapt the starter hops to your endpoint, then export for specs.",
    defaultCode: `${themeHeader}
title API Sequence

actor Client
participant "API Gateway" as GW
participant "Users API" as Users
database DB

Client -> GW: GET /v1/users/42
GW -> Users: getUser(42)
Users -> DB: SELECT
DB --> Users: row
Users --> GW: 200 JSON
GW --> Client: 200 JSON
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "API sequence diagrams show hop-by-hop request and response paths: who receives the HTTP call, what internal call follows, and what status returns. They help frontend, backend, and QA agree on a flow before implementation drifts.",
      },
      {
        heading: "How to use this maker",
        body: "Name the client and services, write one message per hop, add an alt fragment for error statuses, preview, then export into an API spec or RFC.",
      },
      {
        heading: "Notation that matters",
        body: "Label messages with methods and paths when useful (GET /v1/users/42). Show return statuses on the way back. Keep participant aliases short so the diagram stays readable on a wiki page.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Prefer one diagram per important flow. Bundle trivial CRUD into a shared pattern note when hops are identical. Use the general sequence diagram maker for non-HTTP collaborations, and a microservices diagram for topology without message order.",
      },
    ],
    faqs: [
      {
        question: "Is this API sequence diagram maker free?",
        answer: "Yes. Create and export online without a paid plan.",
      },
      {
        question: "How is this different from the sequence diagram maker?",
        answer:
          "This page is optimized for API and HTTP flows. The general sequence maker covers broader interaction scenarios.",
      },
      {
        question: "Should every endpoint get its own diagram?",
        answer:
          "Prefer one diagram per important flow. Bundle identical CRUD hops into a shared pattern note.",
      },
    ],
    relatedSlugs: [
      "sequence-diagram-maker",
      "microservices-diagram-maker",
      "plantuml-online",
    ],
  }),
  tool({
    slug: "activity-diagram-maker",
    category: "behavioral",
    keyword: "activity diagram maker",
    name: "Activity Diagram Maker",
    title: "Activity Diagram Maker Online (Free)",
    metaDescription:
      "Make UML activity diagrams online. Model workflows, decisions, and process steps with live preview and export.",
    h1: "Activity Diagram Maker",
    intro:
      "Map a workflow with actions, decisions, and end states. Start from the template, rename steps to match your process, and export when the path is clear.",
    defaultCode: `${themeHeader}
title Activity Diagram

start
:Receive request;
if (Valid?) then (yes)
  :Process;
  :Return success;
else (no)
  :Return error;
endif
stop
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Activity diagrams show procedures with decisions and merges: onboarding, fulfillment, moderation, support scripts, and product user paths that follow a clear procedure.",
      },
      {
        heading: "How to use this maker",
        body: "Begin at start, add actions as verb phrases, branch with decisions, end at stop, preview, then export PNG or SVG for process docs.",
      },
      {
        heading: "Notation that matters",
        body: "Actions are steps. Diamonds (or if syntax) mark decisions. Merges reunite paths. Start and stop mark the ends of the flow. For user paths, name actions after screens or user goals. Keep platform-specific branches on separate diagrams when mobile and web diverge.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Prefer a sequence diagram when message order between systems is the main question. Use the flowchart maker for a general process picture without UML framing, and the swimlane maker when ownership by role matters.",
      },
    ],
    faqs: [
      {
        question: "Is this activity diagram maker free?",
        answer: "Yes. Edit and export in the browser without a subscription.",
      },
      {
        question: "Activity diagram or flowchart?",
        answer:
          "Activity diagrams follow UML and connect to other UML views. Use the flowchart maker when you want a general process picture without UML framing.",
      },
      {
        question: "Activity diagram or sequence diagram?",
        answer:
          "Use activity for workflow steps and decisions. Use sequence when participants exchanging messages over time is the story.",
      },
    ],
    relatedSlugs: [
      "flowchart-maker",
      "swimlane-diagram-maker",
      "use-case-diagram-maker",
      "sequence-diagram-maker",
    ],
  }),
  tool({
    slug: "use-case-diagram-maker",
    category: "behavioral",
    keyword: "use case diagram maker",
    name: "Use Case Diagram Maker",
    title: "Use Case Diagram Maker Online (Free)",
    metaDescription:
      "Create UML use case diagrams online. Capture actors, goals, and system boundaries for requirements workshops.",
    h1: "Use Case Diagram Maker",
    intro:
      "Show who uses the system and which goals they pursue. Start from the template, keep use cases at goal level, and export for requirements workshops.",
    defaultCode: `${themeHeader}
title Use Case Diagram

left to right direction
actor Customer
actor Admin

rectangle "Shop" {
  usecase "Browse catalog" as UC1
  usecase "Checkout" as UC2
  usecase "Manage inventory" as UC3
}

Customer --> UC1
Customer --> UC2
Admin --> UC3
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Use case diagrams capture actors, goals, and the system boundary. They support scope talks and requirements workshops without drowning readers in click-by-click steps.",
      },
      {
        heading: "How to use this maker",
        body: "List actors, place goals inside the system boundary, connect associations, add includes or extends only when they clarify reuse, preview, then export.",
      },
      {
        heading: "Notation that matters",
        body: "Actors sit outside the boundary. Use cases are goals inside it. Associations link actors to goals. Includes and extends show reuse relationships. Keep wording at goal level, not UI clicks.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Do not turn every requirement into an oval. Put detailed steps in text scenarios or an activity diagram. Use a sequence diagram when interaction order is the next question after scope is clear.",
      },
    ],
    faqs: [
      {
        question: "Is this use case diagram maker free?",
        answer: "Yes. Create and export online without a paid plan.",
      },
      {
        question: "Should every requirement become a use case oval?",
        answer: "No. Keep ovals at user goals. Split details into scenarios outside the diagram.",
      },
      {
        question: "Use case diagram or activity diagram?",
        answer:
          "Use cases show who and what goals. Activity diagrams show how a procedure runs step by step.",
      },
    ],
    relatedSlugs: ["activity-diagram-maker", "sequence-diagram-maker", "class-diagram-maker"],
  }),
  tool({
    slug: "state-diagram-maker",
    category: "behavioral",
    keyword: "state diagram maker",
    name: "State Diagram Maker",
    title: "State Diagram Maker Online (Free)",
    metaDescription:
      "Make UML state diagrams online. Model states, transitions, and lifecycles for orders, tickets, and devices.",
    h1: "State Diagram Maker",
    intro:
      "Model a lifecycle with states and transitions. Ideal for order status, document review, and device modes. Adapt the starter, then export when every transition is intentional.",
    defaultCode: `${themeHeader}
title State Diagram

[*] --> Draft
Draft --> Review : submit
Review --> Approved : approve
Review --> Draft : request changes
Approved --> Published : publish
Published --> [*]
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "State diagrams show the states an entity can be in and the events that move it between them. The same notation covers everyday state machine designs for tickets, subscriptions, and device modes.",
      },
      {
        heading: "How to use this maker",
        body: "List meaningful states, label transitions with events, mark start and end, validate that code can reach each transition, preview, then export.",
      },
      {
        heading: "Notation that matters",
        body: "Rounded states, labeled transitions, and start or end markers form the core. Guards can refine when a transition is allowed. Keep event names aligned with domain language used in code.",
      },
      {
        heading: "Keep the diagram readable",
        body: "A state diagram focuses on one entity. An activity diagram focuses on steps in a process. Prefer timing diagrams when duration and overlap are the risk. Drop states that the product cannot actually reach.",
      },
    ],
    faqs: [
      {
        question: "Is this state diagram maker free?",
        answer: "Yes. Edit and export in the browser without a subscription.",
      },
      {
        question: "Is a state machine diagram different?",
        answer:
          "In practice teams use the names interchangeably for UML state machines. This page covers that modeling job.",
      },
      {
        question: "State diagram or activity diagram?",
        answer:
          "Use state when the question is what status an entity is in. Use activity when the question is what steps a process takes.",
      },
    ],
    relatedSlugs: ["activity-diagram-maker", "sequence-diagram-maker", "timing-diagram-maker"],
  }),
  tool({
    slug: "communication-diagram-maker",
    category: "behavioral",
    keyword: "communication diagram maker",
    name: "Communication Diagram Maker",
    title: "Communication Diagram Maker Online (Free)",
    metaDescription:
      "Create UML communication diagrams online. Show object links with numbered messages for collaboration views.",
    h1: "Communication Diagram Maker",
    intro:
      "Use a communication diagram when structural links matter as much as message order. Start from the template, number messages clearly, and export for design notes.",
    defaultCode: `${themeHeader}
title Communication Diagram

object Controller
object Service
object Repository

Controller --> Service : 1: handle()
Service --> Repository : 2: save()
Repository --> Service : 3: ok
Service --> Controller : 4: result
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Communication diagrams show collaborating objects and numbered messages along their links. They help when layout of who talks to whom matters as much as call order.",
      },
      {
        heading: "How to use this maker",
        body: "Place collaborating objects, number messages in call order, preview the graph, then export PNG or SVG for design notes.",
      },
      {
        heading: "Notation that matters",
        body: "Objects sit as nodes. Links show structural relationships. Message numbers carry the sequence. Keep numbering dense and continuous so readers can follow the story without a time axis.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Sequence diagrams emphasize time and activations. Prefer those when timing matters. Use an object diagram for a value snapshot without messages, and a class diagram for type structure.",
      },
    ],
    faqs: [
      {
        question: "Is this communication diagram maker free?",
        answer: "Yes. Create and export online without a paid plan.",
      },
      {
        question: "Can this replace a sequence diagram?",
        answer:
          "Sometimes for small collaborations. Prefer sequence diagrams when timing and activations matter.",
      },
      {
        question: "Communication diagram or object diagram?",
        answer:
          "Object diagrams show instance values. Communication diagrams add numbered messages on top of collaboration links.",
      },
    ],
    relatedSlugs: ["sequence-diagram-maker", "object-diagram-maker", "class-diagram-maker"],
  }),
  tool({
    slug: "timing-diagram-maker",
    category: "behavioral",
    keyword: "timing diagram maker",
    name: "Timing Diagram Maker",
    title: "Timing Diagram Maker Online (Free)",
    metaDescription:
      "Make UML timing diagrams online. Visualize state changes against time for timing-sensitive designs.",
    h1: "Timing Diagram Maker",
    intro:
      "Plot state or condition against time when duration and overlap matter more than a simple message list. Adjust the starter timeline, then export for timing talks.",
    defaultCode: `${themeHeader}
title Timing Overview

concise "Request" as R
robust "Worker" as W

@0
R is Idle
W is Idle

@100
R is Waiting
W is Busy

@200
R is Done
W is Idle
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Timing diagrams show how values or states change against a timeline. They help with protocols, scheduled jobs, and overlapping states that a plain sequence list under-explains.",
      },
      {
        heading: "How to use this maker",
        body: "Define participants, mark time points, set states at each point, preview the timeline, then export for timing discussions.",
      },
      {
        heading: "Notation that matters",
        body: "Participants have lifelines across time. State changes sit at explicit time marks. Keep units consistent so relative duration stays meaningful to readers.",
      },
      {
        heading: "Keep the diagram readable",
        body: "You do not need a timing diagram for every feature. Use it when deadlines, overlap, or duration are the design risk. Prefer a state diagram for lifecycle without a clock, and a sequence diagram for message order.",
      },
    ],
    faqs: [
      {
        question: "Is this timing diagram maker free?",
        answer: "Yes. Edit and export in the browser without a subscription.",
      },
      {
        question: "Do I need a timing diagram for every feature?",
        answer: "No. Use it when deadlines, overlap, or duration are the design risk.",
      },
      {
        question: "Timing diagram or sequence diagram?",
        answer:
          "Sequence emphasizes message order. Timing emphasizes how long states last and how they overlap.",
      },
    ],
    relatedSlugs: [
      "sequence-diagram-maker",
      "state-diagram-maker",
      "interaction-overview-diagram-maker",
    ],
  }),
  tool({
    slug: "interaction-overview-diagram-maker",
    category: "behavioral",
    keyword: "interaction overview diagram maker",
    name: "Interaction Overview Diagram Maker",
    title: "Interaction Overview Diagram Maker (Free)",
    metaDescription:
      "Create UML interaction overview diagrams online. Combine control flow with references to detailed interactions.",
    h1: "Interaction Overview Diagram Maker",
    intro:
      "Sketch a map of several interactions when one sequence diagram would be too dense. Adapt the starter flows, then point readers to detailed sequence pages.",
    defaultCode: `${themeHeader}
title Interaction Overview

start
:Login flow;
if (Authorized?) then (yes)
  :Checkout flow;
  :Notify flow;
else (no)
  :Show error;
endif
stop
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Interaction overview diagrams provide high-level control flow that points to more detailed interactions. Readers see the order of scenarios without every message on one canvas.",
      },
      {
        heading: "How to use this maker",
        body: "Outline major interaction steps as actions, branch on outcomes, preview the map, then export and link readers to dedicated sequence diagrams for detail.",
      },
      {
        heading: "Notation that matters",
        body: "Nodes often represent interactions or interaction uses, not only atomic actions. Control flow connects those interactions much like an activity diagram, but the content of each node is a scenario reference.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Do not paste full message lists into the overview. Keep this page as a map. Use activity diagrams for single-process steps, and sequence diagrams for the detailed hops inside each referenced flow.",
      },
    ],
    faqs: [
      {
        question: "Is this interaction overview diagram maker free?",
        answer: "Yes. Create and export online without a paid plan.",
      },
      {
        question: "How is this different from an activity diagram?",
        answer:
          "Nodes often represent interactions or interaction uses, not only atomic actions in a single process.",
      },
      {
        question: "When should I skip this diagram?",
        answer:
          "If you only have one short sequence, draw that sequence directly. Overviews help when several scenarios must be ordered together.",
      },
    ],
    relatedSlugs: ["activity-diagram-maker", "sequence-diagram-maker", "use-case-diagram-maker"],
  }),
  tool({
    slug: "plantuml-online",
    category: "editors",
    keyword: "plantuml online",
    name: "PlantUML Online",
    title: "PlantUML Online Editor (Free)",
    metaDescription:
      "PlantUML online editor with live preview. Write PlantUML in the browser and export PNG or SVG. No local install.",
    h1: "PlantUML Online",
    intro:
      "Edit PlantUML in the browser with live preview. Use this when the PlantUML source is your source of truth. Start from the sample, then export PNG or SVG when the diagram looks right.",
    defaultCode: `${themeHeader}
title PlantUML Online

Alice -> Bob: Hello
Bob --> Alice: Hi
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "PlantUML covers common UML views and several related diagram types in one text syntax. This online editor is for everyday drafting when you want versionable diagram source without a local install.",
      },
      {
        heading: "How to use this editor",
        body: "Write an @startuml block, preview on the right, export PNG or SVG, and store the source in git. Open a type-specific maker when you want a guided starter for class, sequence, activity, or ER diagrams.",
      },
      {
        heading: "Notation that matters",
        body: "Every diagram starts with @startuml and ends with @enduml. Diagram kind is implied by the keywords you use (class, participant, usecase, entity, and so on). Keep themes simple for documentation embeds.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Need a full-height workspace? Open the studio. Prefer a focused maker when you are learning a specific diagram type. Split large systems across multiple source files or pages instead of one crowded canvas.",
      },
    ],
    faqs: [
      {
        question: "Is PlantUML online free here?",
        answer: "Yes. Edit and export in the browser without a paid plan.",
      },
      {
        question: "Do I need Java installed?",
        answer: "Not for this online editor. Diagrams render through the PlantUML service used by the preview.",
      },
      {
        question: "Which diagram types work?",
        answer:
          "Common UML types such as sequence, class, activity, use case, state, component, and deployment, plus related views PlantUML supports.",
      },
    ],
    relatedSlugs: [
      "class-diagram-maker",
      "sequence-diagram-maker",
      "activity-diagram-maker",
      "er-diagram-maker",
    ],
  }),
  tool({
    slug: "java-class-diagram-generator",
    category: "developer",
    keyword: "java class diagram generator",
    name: "Java Class Diagram Generator",
    title: "Java Class Diagram Generator Online (Free)",
    metaDescription:
      "Generate a UML class diagram for Java-style types online. Map classes, interfaces, and inheritance with live preview.",
    h1: "Java Class Diagram Generator",
    intro:
      "Produce a class diagram for Java-oriented models: classes, interfaces, and inheritance. Adapt the starter to your packages, then export for README or design review.",
    defaultCode: `${themeHeader}
title Java Class Diagram

interface Payable {
  +calculatePay(): double
}

abstract class Employee {
  -id: String
  -name: String
}

class SalariedEmployee {
  -salary: double
  +calculatePay(): double
}

Payable <|.. SalariedEmployee
Employee <|-- SalariedEmployee
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Java teams often need diagrams for entities, services, and interfaces. Visibility, abstract types, and realization map cleanly to UML class notation for design and onboarding docs.",
      },
      {
        heading: "How to use this generator",
        body: "Rename types to match your code, show interfaces with realization, keep one package story per diagram, preview, then export PNG or SVG.",
      },
      {
        heading: "Notation that matters",
        body: "Use interface for Java interfaces and abstract class for abstract types. Realization and inheritance arrows should match implements and extends. Field and method visibility should reflect your public API surface.",
      },
      {
        heading: "Keep the diagram readable",
        body: "This page does not upload a repository. Translate only the types that matter so the diagram stays intentional. Use the general class diagram maker for language-agnostic models, and the Python page when the codebase is Python.",
      },
    ],
    faqs: [
      {
        question: "Is this Java class diagram generator free?",
        answer: "Yes. Create and export online without a subscription.",
      },
      {
        question: "Can I paste a full .java file?",
        answer:
          "Prefer a simplified model of the types you want stakeholders to see. Large pastes create noisy diagrams.",
      },
      {
        question: "How is this different from the class diagram maker?",
        answer:
          "This page uses Java-oriented starters and wording. The class diagram maker is the general tool for any domain model.",
      },
    ],
    relatedSlugs: [
      "python-class-diagram-generator",
      "class-diagram-maker",
      "plantuml-online",
    ],
  }),
  tool({
    slug: "python-class-diagram-generator",
    category: "developer",
    keyword: "python class diagram generator",
    name: "Python Class Diagram Generator",
    title: "Python Class Diagram Generator Online (Free)",
    metaDescription:
      "Generate a UML class diagram for Python classes online. Show inheritance and composition with live preview and export.",
    h1: "Python Class Diagram Generator",
    intro:
      "Build a class diagram for Python services, models, and dataclasses. Align names with your modules, then export for docs or onboarding.",
    defaultCode: `${themeHeader}
title Python Class Diagram

class Repository {
  +save(entity)
  +get(id)
}

class UserService {
  -repo: Repository
  +register(email)
}

class User {
  +email: str
  +is_active: bool
}

UserService --> Repository
UserService --> User
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Python class diagrams help when inheritance trees, protocol-style interfaces, or service layers are hard to explain in prose alone. They clarify composition and dependencies for readers who will not open every module.",
      },
      {
        heading: "How to use this generator",
        body: "Model the types that matter, show composition for injected dependencies, preview, then export PNG or SVG for docs or onboarding.",
      },
      {
        heading: "Notation that matters",
        body: "Classes map to Python types. Associations and composition show how services hold repositories or models. Keep method names close to your public API so the diagram stays honest.",
      },
      {
        heading: "Keep the diagram readable",
        body: "There is no automatic AST upload here. List the classes your readers need. Use the Java generator for Java codebases and the general class diagram maker for language-agnostic domain models.",
      },
    ],
    faqs: [
      {
        question: "Is this Python class diagram generator free?",
        answer: "Yes. Edit and export in the browser without a paid plan.",
      },
      {
        question: "Does this parse Python in the browser?",
        answer:
          "No. You provide a PlantUML model of the classes you want to publish.",
      },
      {
        question: "How is this different from the class diagram maker?",
        answer:
          "This page uses Python-oriented examples and guidance. The class diagram maker is the general tool for any domain.",
      },
    ],
    relatedSlugs: [
      "java-class-diagram-generator",
      "class-diagram-maker",
      "plantuml-online",
    ],
  }),
  tool({
    slug: "er-diagram-maker",
    category: "related",
    keyword: "er diagram maker",
    name: "ER Diagram Maker",
    title: "ER Diagram Maker Online (Free)",
    metaDescription:
      "Create ER diagrams online. Model entities, keys, and relationships for database design with live preview and export.",
    h1: "ER Diagram Maker",
    intro:
      "Design an entity-relationship diagram for tables, keys, and cardinalities. Start from the template for schema reviews before migrations, then export for backend or DBA review.",
    defaultCode: `${themeHeader}
title ER Diagram

entity "User" {
  * id : INT <<PK>>
  --
  * email : VARCHAR(100)
}

entity "Post" {
  * id : INT <<PK>>
  --
  * title : VARCHAR(200)
  * user_id : INT <<FK>>
}

User ||--o{ Post : creates
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "ER diagrams emphasize persistence: entities, primary keys, foreign keys, and cardinality. Teams often call the same job a database diagram or ERD. Use this view when the contract is tables and relations.",
      },
      {
        heading: "How to use this maker",
        body: "Add entities, mark keys, set relationships, preview, then export for DBA or backend review. Name tables as they appear in SQL when that is the contract.",
      },
      {
        heading: "Notation that matters",
        body: "Entities list attributes. Primary and foreign keys should be obvious. Cardinality marks such as one-to-many sit on relationship ends. Keep attribute types aligned with your migration plan.",
      },
      {
        heading: "Keep the diagram readable",
        body: "ER focuses on data storage. Class diagrams focus on object types and behavior. Use a data flow diagram when the question is how data moves between processes, not how tables relate.",
      },
    ],
    faqs: [
      {
        question: "Is this ER diagram maker free?",
        answer: "Yes. Create and export online without a subscription.",
      },
      {
        question: "Is an ERD the same as a database diagram?",
        answer:
          "Teams often use the names for the same job: showing tables and relations. This page covers that modeling need.",
      },
      {
        question: "ER diagram vs class diagram?",
        answer:
          "ER focuses on data storage. Class diagrams focus on object types and behavior.",
      },
    ],
    relatedSlugs: [
      "class-diagram-maker",
      "flowchart-maker",
      "data-flow-diagram-maker",
      "plantuml-online",
    ],
  }),
  tool({
    slug: "flowchart-maker",
    category: "related",
    keyword: "flowchart maker",
    name: "Flowchart Maker",
    title: "Flowchart Maker Online (Free)",
    metaDescription:
      "Make flowcharts online for processes and decisions. Live preview and PNG or SVG export. No install.",
    h1: "Flowchart Maker",
    intro:
      "Create a flowchart for processes, support scripts, and simple algorithms. Start from the template, keep labels short, and export when the path is clear.",
    defaultCode: `${themeHeader}
title Flowchart

start
:Start;
if (OK?) then (yes)
  :Continue;
else (no)
  :Stop early;
endif
stop
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Flowcharts show steps and decisions in a process. They are familiar to mixed audiences: support teams, analysts, and engineers who need a general process picture.",
      },
      {
        heading: "How to use this maker",
        body: "List steps as actions, add decisions, keep labels short, preview, then export PNG or SVG for runbooks or slides.",
      },
      {
        heading: "Notation that matters",
        body: "Start and end markers bound the flow. Rectangles are steps. Diamonds (or if branches) are decisions. Use short verbs so readers can scan the path quickly.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Activity diagrams add UML conventions and connect to other UML artifacts. Use the swimlane maker when ownership by role matters, and a data flow diagram when the question is data movement rather than step order.",
      },
    ],
    faqs: [
      {
        question: "Is this flowchart maker free?",
        answer: "Yes. Edit and export in the browser without a paid plan.",
      },
      {
        question: "Can I make swimlanes here?",
        answer:
          "For lane-based responsibility, open the swimlane diagram maker. This page focuses on simple flowcharts.",
      },
      {
        question: "Flowchart or activity diagram?",
        answer:
          "Pick a flowchart for a general audience. Pick an activity diagram when you want UML framing and links to other UML views.",
      },
    ],
    relatedSlugs: [
      "swimlane-diagram-maker",
      "activity-diagram-maker",
      "data-flow-diagram-maker",
    ],
  }),
  tool({
    slug: "data-flow-diagram-maker",
    category: "related",
    keyword: "data flow diagram maker",
    name: "Data Flow Diagram Maker",
    title: "Data Flow Diagram Maker Online (Free)",
    metaDescription:
      "Create data flow diagrams (DFD) online. Show processes, data stores, and external entities with live preview.",
    h1: "Data Flow Diagram Maker",
    intro:
      "Build a data flow diagram to show how data moves between processes, stores, and external entities. Adapt the starter labels, then export for analysis docs.",
    defaultCode: `${themeHeader}
title Data Flow Diagram

rectangle "Customer" as Customer
rectangle "Order Process" as Process
database "Orders" as Store
rectangle "Warehouse" as Warehouse

Customer --> Process : order
Process --> Store : save order
Process --> Warehouse : fulfill request
Warehouse --> Process : status
Process --> Customer : confirmation
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Data flow diagrams (DFDs) focus on movement of data, not control logic inside a UI. They help analysts and engineers agree on inputs, stores, and outputs.",
      },
      {
        heading: "How to use this maker",
        body: "Place external entities, processes, and stores, label flows with data names, avoid unlabeled arrows, preview, then export.",
      },
      {
        heading: "Notation that matters",
        body: "External entities send or receive data. Processes transform data. Stores hold data at rest. Every arrow should name the data that moves, not only the fact that a link exists.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Use a flowchart for step order and decisions. Use an ER diagram for table structure. Keep each DFD at one level of detail so readers are not lost in nested explosions on a single page.",
      },
    ],
    faqs: [
      {
        question: "Is this data flow diagram maker free?",
        answer: "Yes. Create and export online without a subscription.",
      },
      {
        question: "DFD or flowchart?",
        answer:
          "Use a flowchart for step order and decisions. Use a DFD when the question is what data moves where.",
      },
      {
        question: "DFD or ER diagram?",
        answer:
          "DFDs show movement of data. ER diagrams show stored structure and keys.",
      },
    ],
    relatedSlugs: ["flowchart-maker", "er-diagram-maker", "activity-diagram-maker"],
  }),
  tool({
    slug: "swimlane-diagram-maker",
    category: "related",
    keyword: "swimlane diagram maker",
    name: "Swimlane Diagram Maker",
    title: "Swimlane Diagram Maker Online (Free)",
    metaDescription:
      "Make swimlane diagrams online. Show process steps by role or team with live preview and export.",
    h1: "Swimlane Diagram Maker",
    intro:
      "Separate process steps into lanes by role or system so ownership stays visible. Start from the template, rename lanes, and export for operations docs.",
    defaultCode: `${themeHeader}
title Swimlane Style Process

|Customer|
start
:Submit order;
|Shop|
:Validate stock;
|Payment|
:Charge card;
|Shop|
:Ship order;
|Customer|
:Receive package;
stop
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Swimlane diagrams show process steps by role or system. Cross-team processes fail when handoffs are invisible. Lanes make who acts at each step obvious.",
      },
      {
        heading: "How to use this maker",
        body: "Define a lane per role or system, place actions in order, preview handoffs, then export PNG or SVG for operations docs.",
      },
      {
        heading: "Notation that matters",
        body: "Each lane is a responsibility boundary. Actions sit in the lane of the actor who performs them. Handoffs appear when the flow crosses lanes. Keep lane names stable across related diagrams.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Use a plain flowchart when ownership is not the question. Use an activity diagram when you want stronger UML framing without stressing lanes. Avoid more lanes than readers can scan on one screen.",
      },
    ],
    faqs: [
      {
        question: "Is this swimlane diagram maker free?",
        answer: "Yes. Edit and export in the browser without a paid plan.",
      },
      {
        question: "Is a swimlane a UML diagram?",
        answer:
          "Swimlanes often appear in activity or process modeling. This page targets the swimlane process job people search for.",
      },
      {
        question: "Swimlane or flowchart?",
        answer:
          "Use swimlanes when you must show who owns each step. Use a flowchart for a simpler path without roles.",
      },
    ],
    relatedSlugs: ["activity-diagram-maker", "flowchart-maker", "data-flow-diagram-maker"],
  }),
  tool({
    slug: "c4-diagram-maker",
    category: "related",
    keyword: "c4 diagram maker",
    name: "C4 Diagram Maker",
    title: "C4 Diagram Maker Online (Free)",
    metaDescription:
      "Create C4-style architecture diagrams online. Sketch context and container views with PlantUML and export images.",
    h1: "C4 Diagram Maker",
    intro:
      "Draft C4-style context and container views for architecture talks. Start from the template, keep one level of detail per diagram, then export for the meeting.",
    defaultCode: `${themeHeader}
title C4 Style Context

actor Customer
rectangle "Online Shop" as Shop
rectangle "Payment Provider" as Pay

Customer --> Shop : browse and buy
Shop --> Pay : charge card
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "C4-style diagrams tell an architecture story in levels. Context shows people and systems. Containers show applications and data stores. Components and code go deeper. This maker is for clear sketches, not a full C4 suite replacement.",
      },
      {
        heading: "How to use this maker",
        body: "Name people and systems, label relationships with purpose, preview, then export. For service-mesh detail, continue on the microservices diagram maker.",
      },
      {
        heading: "Notation that matters",
        body: "People and software systems are primary boxes at context level. Relationship labels should state why the link exists. Do not mix context and container detail on one canvas.",
      },
      {
        heading: "Keep the diagram readable",
        body: "If you need UML deployment or component views without C4 vocabulary, open those makers. Keep each diagram at one C4 level so stakeholders are not lost between zoom levels.",
      },
    ],
    faqs: [
      {
        question: "Is this C4 diagram maker free?",
        answer: "Yes. Create and export online without a subscription.",
      },
      {
        question: "Is this a full C4 modeling suite?",
        answer:
          "It is a lightweight PlantUML-based starter for C4-style views, not a full C4 Studio replacement.",
      },
      {
        question: "C4 or microservices diagram?",
        answer:
          "Use C4 for leveled architecture storytelling. Use the microservices page when service boundaries and dependencies are the main question.",
      },
    ],
    relatedSlugs: [
      "microservices-diagram-maker",
      "component-diagram-maker",
      "deployment-diagram-maker",
    ],
  }),
  tool({
    slug: "microservices-diagram-maker",
    category: "related",
    keyword: "microservices diagram",
    name: "Microservices Diagram Maker",
    title: "Microservices Diagram Maker Online (Free)",
    metaDescription:
      "Create microservices architecture diagrams online. Show services, gateways, and data stores with live preview.",
    h1: "Microservices Diagram Maker",
    intro:
      "Map services, gateways, and datastores so ownership and call paths stay visible before the mesh grows. Adapt the starter, then export for RFCs.",
    defaultCode: `${themeHeader}
title Microservices Diagram

[API Gateway] as GW
[Catalog Service] as Catalog
[Cart Service] as Cart
[Order Service] as Orders
database "Catalog DB"
database "Orders DB"

GW --> Catalog
GW --> Cart
GW --> Orders
Catalog --> "Catalog DB"
Orders --> "Orders DB"
Cart --> Catalog : price
@enduml`,
    sections: [
      {
        heading: "What you can model",
        body: "Microservices diagrams show service boundaries, gateways, and data ownership. Use them when the main question is which services exist and how they call each other at runtime.",
      },
      {
        heading: "How to use this maker",
        body: "Place one box per service, attach databases to owners only, connect runtime calls, avoid shared-database shortcuts you do not intend, preview, then export for RFCs.",
      },
      {
        heading: "Notation that matters",
        body: "Services are components or boxes. Gateways sit at the edge. Databases belong to owners. Edges are runtime calls. Add a broker when messaging is part of the design, and label edges when the purpose is not obvious.",
      },
      {
        heading: "Keep the diagram readable",
        body: "Use C4 for leveled architecture storytelling. Use a component diagram for modular structure without service-mesh emphasis, and an API sequence diagram when hop-by-hop HTTP detail matters more than topology.",
      },
    ],
    faqs: [
      {
        question: "Is this microservices diagram maker free?",
        answer: "Yes. Edit and export in the browser without a paid plan.",
      },
      {
        question: "C4 or microservices diagram?",
        answer:
          "Use C4 for leveled architecture storytelling. Use this page when service boundaries and dependencies are the main question.",
      },
      {
        question: "Should every internal library appear?",
        answer:
          "No. Show deployable or independently owned services. Hide private libraries unless they define a public boundary.",
      },
    ],
    relatedSlugs: [
      "c4-diagram-maker",
      "component-diagram-maker",
      "api-sequence-diagram-maker",
    ],
  }),
];

export function getAllTools(): ToolDefinition[] {
  return tools;
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategoryId): ToolDefinition[] {
  return tools.filter((t) => t.category === category);
}

export function getCategoryById(id: ToolCategoryId): ToolCategory | undefined {
  return TOOL_CATEGORIES.find((c) => c.id === id);
}

export function getToolSlugs(): string[] {
  return tools.map((t) => t.slug);
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return tool.relatedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));
}

/** Old slugs removed to prevent cannibalization → canonical destination */
export const TOOL_REDIRECTS: Record<string, string> = {
  "uml-class-diagram-online": "/tools/class-diagram-maker",
  "class-diagram-generator": "/tools/class-diagram-maker",
  "class-diagram-from-code": "/tools/class-diagram-maker",
  "state-machine-diagram-maker": "/tools/state-diagram-maker",
  "uml-diagram-maker": "/",
  "uml-diagram-generator": "/",
  "uml-diagram-online": "/",
  "free-uml-diagram-tool": "/",
  "plantuml-editor": "/tools/plantuml-online",
  "plantuml-sequence-diagram": "/tools/sequence-diagram-maker",
  "plantuml-class-diagram": "/tools/class-diagram-maker",
  "mermaid-class-diagram": "/tools/class-diagram-maker",
  "mermaid-sequence-diagram": "/tools/sequence-diagram-maker",
  "erd-diagram-online": "/tools/er-diagram-maker",
  "database-diagram-maker": "/tools/er-diagram-maker",
  "sequence-diagram-from-text": "/tools/sequence-diagram-maker",
  "uml-diagram-from-xml": "/tools/plantuml-online",
  "architecture-diagram-maker": "/tools/c4-diagram-maker",
  "user-flow-diagram-maker": "/tools/activity-diagram-maker",
};
