import type { Category, Difficulty, Question } from "../types";

const jsQuestions: Question[] = [
  {
    id: "js-1",
    category: "JavaScript",
    topic: "Closures",
    difficulty: "Intermediate",
    question: "What is a closure in JavaScript and why is it useful?",
    answer:
      "A closure is a function that retains access to variables from its lexical scope even after the outer function has returned.",
    explanation:
      "Closures allow data encapsulation and are used in callbacks, private state, and async patterns. The inner function keeps a reference to the environment in which it was created.",
    tags: ["scope", "functions", "async"],
    codeExample: `function makeCounter() {\n  let count = 0;\n  return () => {\n    count += 1;\n    return count;\n  };\n}`,
  },
  {
    id: "js-2",
    category: "JavaScript",
    topic: "Event Loop",
    difficulty: "Advanced",
    question: "How does the JavaScript event loop work?",
    answer:
      "The event loop continuously checks the call stack and task queue so it can execute queued callbacks after the current call stack is clear.",
    explanation:
      "JavaScript is single-threaded, but asynchronous operations run in the browser or Node runtime and push callbacks to the queue. When the stack is empty, the event loop dispatches queued tasks.",
    tags: ["async", "browser", "runtime"],
  },
  {
    id: "js-3",
    category: "JavaScript",
    topic: "Hoisting",
    difficulty: "Intermediate",
    question: "Explain hoisting in JavaScript.",
    answer:
      "Hoisting is the behavior where variable and function declarations are moved to the top of their scope during compilation.",
    explanation:
      "Function declarations are hoisted completely, while var is hoisted with a value of undefined. let and const are hoisted to the temporal dead zone and remain uninitialized until their declaration is evaluated.",
    tags: ["scope", "var", "let"],
  },
  {
    id: "js-4",
    category: "JavaScript",
    topic: "Prototypal Inheritance",
    difficulty: "Intermediate",
    question: "What is prototypal inheritance in JavaScript?",
    answer:
      "Objects inherit properties and methods from their prototype chain, enabling shared behavior without classical inheritance.",
    explanation:
      "Every object has a prototype reference. When a property is not found on the object, JavaScript checks the prototype chain until it reaches null.",
    tags: ["prototype", "objects", "inheritance"],
  },
  {
    id: "js-5",
    category: "JavaScript",
    topic: "Debouncing",
    difficulty: "Intermediate",
    question: "What is debouncing and when would you use it?",
    answer:
      "Debouncing delays a function call until a pause in events, preventing excessive execution during rapid triggers like keystrokes or scroll events.",
    explanation:
      "It is useful for search suggestions, resize handlers, and input validation to reduce repeated work and improve performance.",
    tags: ["performance", "events"],
  },
  {
    id: "js-6",
    category: "JavaScript",
    topic: "Array Methods",
    difficulty: "Beginner",
    question: "What is the difference between map and forEach?",
    answer:
      "map creates a new array from transformed values, while forEach only iterates and does not return a new array.",
    explanation:
      "map is useful for transforming data, while forEach is better for side effects like logging or mutating external variables.",
    tags: ["arrays", "iteration"],
  },
  {
    id: "js-7",
    category: "JavaScript",
    topic: "This keyword",
    difficulty: "Intermediate",
    question: "How does this behave in JavaScript?",
    answer:
      "The value of this depends on call site and how the function is invoked; it can be the global object, a new instance, or a bound object.",
    explanation:
      "In normal function calls, this is dynamic. In arrow functions, this is lexical and inherits from the surrounding scope. In methods, it points to the object.",
    tags: ["context", "functions"],
  },
  {
    id: "js-8",
    category: "JavaScript",
    topic: "Promises",
    difficulty: "Intermediate",
    question: "What is a Promise and how does it help with async code?",
    answer:
      "A Promise represents the eventual result of an async operation and allows chaining with then/catch rather than nested callbacks.",
    explanation:
      "Promises handle success and failure explicitly, making asynchronous code easier to reason about and compose.",
    tags: ["async", "promise"],
  },
  {
    id: "js-9",
    category: "JavaScript",
    topic: "Deep copy vs Shallow copy",
    difficulty: "Intermediate",
    question: "What is the difference between deep and shallow copying?",
    answer:
      "A shallow copy copies only the top-level properties, while a deep copy duplicates nested objects recursively.",
    explanation:
      "Shallow copying can still leave nested objects shared between structures, causing accidental mutations. Deep copy avoids that by duplicating nested data.",
    tags: ["objects", "copying"],
  },
  {
    id: "js-10",
    category: "JavaScript",
    topic: "Call stack",
    difficulty: "Intermediate",
    question: "What is the call stack in JavaScript?",
    answer:
      "The call stack is a data structure that tracks the execution of function calls in LIFO order.",
    explanation:
      "As functions are invoked, they are pushed onto the stack. When they finish, they are popped off, enabling nested execution flow.",
    tags: ["execution", "functions"],
  },
  {
    id: "js-11",
    category: "JavaScript",
    topic: "Null vs Undefined",
    difficulty: "Beginner",
    question: "What is the difference between null and undefined?",
    answer:
      "undefined means a variable has been declared but no value is assigned, while null is an intentional empty value.",
    explanation:
      "Using null can signal deliberate absence, while undefined often indicates uninitialized values or missing arguments.",
    tags: ["values", "types"],
  },
  {
    id: "js-12",
    category: "JavaScript",
    topic: "Type coercion",
    difficulty: "Intermediate",
    question: "What is type coercion in JavaScript?",
    answer:
      "Type coercion is JavaScript’s automatic conversion of values from one type to another during operations.",
    explanation:
      "This can lead to surprising results like true + 1 becoming 2 or [] + [] becoming an empty string. Understanding coercion helps avoid bugs.",
    tags: ["types", "operators"],
  },
  {
    id: "js-13",
    category: "JavaScript",
    topic: "Array flattening",
    difficulty: "Intermediate",
    question: "How would you flatten a nested array in JavaScript?",
    answer:
      "You can use Array.prototype.flat() or reduce to concatenate nested arrays into a single array.",
    explanation:
      "flat() is the simplest built-in approach and accepts a depth parameter. It is widely used when normalizing data structures.",
    tags: ["arrays", "es6"],
  },
  {
    id: "js-14",
    category: "JavaScript",
    topic: "Temporal Dead Zone",
    difficulty: "Intermediate",
    question: "What is the temporal dead zone in JavaScript?",
    answer:
      "The temporal dead zone is the period before a let or const variable is initialized where accessing it throws a ReferenceError.",
    explanation:
      "This prevents accidental use of variables before their declarations, making code more predictable than var hoisting.",
    tags: ["let", "const", "scope"],
  },
  {
    id: "js-15",
    category: "JavaScript",
    topic: "Memoization",
    difficulty: "Advanced",
    question: "What is memoization and how does it improve performance?",
    answer:
      "Memoization caches computed results for expensive function calls so repeated inputs can return quickly without recomputation.",
    explanation:
      "It is often used in recursive algorithms and expensive calculations to reduce redundant work and improve efficiency.",
    tags: ["performance", "optimization"],
  },
  {
    id: "js-16",
    category: "JavaScript",
    topic: "Currying",
    difficulty: "Advanced",
    question: "Explain currying in JavaScript.",
    answer:
      "Currying transforms a function that takes multiple arguments into a sequence of functions each taking one argument.",
    explanation:
      "This pattern allows partial application and reusable function building, commonly used in functional programming and libraries.",
    tags: ["functional", "higher-order"],
  },
  {
    id: "js-17",
    category: "JavaScript",
    topic: "Execution context",
    difficulty: "Intermediate",
    question: "What is an execution context?",
    answer:
      "An execution context is the environment in which JavaScript code is evaluated and executed, including variables, objects, and the scope chain.",
    explanation:
      "Each function invocation creates a new execution context. The call stack manages these contexts as code runs.",
    tags: ["scope", "execution"],
  },
  {
    id: "js-18",
    category: "JavaScript",
    topic: "Optional chaining",
    difficulty: "Beginner",
    question: "What does optional chaining solve?",
    answer:
      "Optional chaining safely accesses nested properties without throwing errors when a value is null or undefined.",
    explanation:
      "It is useful when dealing with API responses or nested objects where some properties may be absent.",
    tags: ["es2020", "safety"],
  },
  {
    id: "js-19",
    category: "JavaScript",
    topic: "Array reduce",
    difficulty: "Intermediate",
    question: "How is reduce used in JavaScript?",
    answer:
      "reduce accumulates values across an array into a single output, using an accumulator and current value.",
    explanation:
      "It is powerful for summing values, grouping data, flattening structures, and building objects from arrays.",
    tags: ["arrays", "functional"],
  },
  {
    id: "js-20",
    category: "JavaScript",
    topic: "Strict mode",
    difficulty: "Beginner",
    question: "What is strict mode in JavaScript?",
    answer:
      "Strict mode enables stricter parsing and error handling, preventing common JavaScript pitfalls.",
    explanation:
      "It helps catch silent errors, disallows certain unsafe actions, and makes code more reliable and easier to debug.",
    tags: ["best-practices", "errors"],
  },
];

const reactQuestions: Question[] = [
  {
    id: "react-1",
    category: "React",
    topic: "Virtual DOM",
    difficulty: "Beginner",
    question: "What is the Virtual DOM in React?",
    answer:
      "The Virtual DOM is an in-memory representation of the UI that React compares with the real DOM to minimize expensive updates.",
    explanation:
      "React diffs the new virtual tree with the previous one and updates only the changed nodes, which improves rendering efficiency.",
    tags: ["rendering", "performance"],
  },
  {
    id: "react-2",
    category: "React",
    topic: "State updates",
    difficulty: "Intermediate",
    question: "How does React handle state updates asynchronously?",
    answer:
      "React batches state updates and processes them together before re-rendering to optimize performance.",
    explanation:
      "This means multiple setState calls can be coalesced, which is why stale state can occur if you rely on the previous value without a functional updater.",
    tags: ["state", "batching"],
  },
  {
    id: "react-3",
    category: "React",
    topic: "Hooks",
    difficulty: "Intermediate",
    question: "What are React hooks and why are they useful?",
    answer:
      "Hooks let functional components use state and lifecycle-like features without writing class components.",
    explanation:
      "They encourage reusable logic and simpler component design, especially for effects, context, and custom hooks.",
    tags: ["hooks", "components"],
  },
  {
    id: "react-4",
    category: "React",
    topic: "useEffect",
    difficulty: "Intermediate",
    question: "When should useEffect be used in React?",
    answer:
      "useEffect is used for side effects such as fetching data, subscriptions, timers, or syncing external state with component state.",
    explanation:
      "Its dependency array controls when the effect runs, making it crucial for preventing repeated execution and stale values.",
    tags: ["effects", "side-effects"],
  },
  {
    id: "react-5",
    category: "React",
    topic: "Controlled components",
    difficulty: "Beginner",
    question: "What is a controlled component in React?",
    answer:
      "A controlled component keeps its form state in React state and updates via event handlers.",
    explanation:
      "This gives React a single source of truth for form values and makes validation and dynamic behavior easier to implement.",
    tags: ["forms", "state"],
  },
  {
    id: "react-6",
    category: "React",
    topic: "Keys",
    difficulty: "Beginner",
    question: "Why are keys important in lists?",
    answer:
      "Keys help React identify which items changed, were added, or removed so it can update the list efficiently.",
    explanation:
      "Stable unique keys reduce unnecessary re-renders and prevent incorrect UI updates.",
    tags: ["lists", "rendering"],
  },
  {
    id: "react-7",
    category: "React",
    topic: "Context API",
    difficulty: "Intermediate",
    question: "What is the Context API used for?",
    answer:
      "It provides a way to pass data through a component tree without manually passing props at every level.",
    explanation:
      "It is useful for theme, authentication, or locale state shared by many components.",
    tags: ["context", "prop-drilling"],
  },
  {
    id: "react-8",
    category: "React",
    topic: "Conditional rendering",
    difficulty: "Beginner",
    question: "How can you conditionally render content in React?",
    answer:
      "Use JavaScript conditionals inside JSX such as if, ternaries, or logical && expressions.",
    explanation:
      "Conditional rendering is fundamental for loading states, errors, and user-specific UI sections.",
    tags: ["jsx", "ui"],
  },
  {
    id: "react-9",
    category: "React",
    topic: "Memoization",
    difficulty: "Intermediate",
    question: "What is React.memo used for?",
    answer:
      "React.memo prevents a component from re-rendering if its props are unchanged.",
    explanation:
      "It helps optimize performance in larger component trees where re-rendering is expensive.",
    tags: ["performance", "optimization"],
  },
  {
    id: "react-10",
    category: "React",
    topic: "Refs",
    difficulty: "Intermediate",
    question: "What is a ref in React?",
    answer:
      "A ref gives direct access to a DOM node or React instance without triggering a re-render.",
    explanation:
      "Refs are commonly used for focusing inputs, measuring elements, or integrating with third-party libraries.",
    tags: ["dom", "access"],
  },
  {
    id: "react-11",
    category: "React",
    topic: "useMemo",
    difficulty: "Intermediate",
    question: "What does useMemo do?",
    answer:
      "useMemo memoizes expensive computed values and only recalculates them when dependencies change.",
    explanation:
      "This can improve performance when derived values are computationally heavy.",
    tags: ["performance", "hooks"],
  },
  {
    id: "react-12",
    category: "React",
    topic: "Custom hooks",
    difficulty: "Intermediate",
    question: "What is a custom hook?",
    answer:
      "A custom hook is a reusable function that encapsulates logic and can use built-in hooks.",
    explanation:
      "Custom hooks help share logic such as fetching data, handling form state, or tracking window size.",
    tags: ["hooks", "composition"],
  },
  {
    id: "react-13",
    category: "React",
    topic: "Error boundaries",
    difficulty: "Advanced",
    question: "What is an error boundary in React?",
    answer:
      "An error boundary catches rendering errors in a component tree and renders a fallback UI instead of crashing the app.",
    explanation:
      "Error boundaries are useful in production apps to isolate failures and avoid blank screens.",
    tags: ["error-handling", "ui"],
  },
  {
    id: "react-14",
    category: "React",
    topic: "Portals",
    difficulty: "Advanced",
    question: "What is a React portal?",
    answer:
      "A portal renders a component into a DOM node outside the parent component tree.",
    explanation:
      "Portals are often used for modals, tooltips, and overlays so UI can appear above other content without CSS conflicts.",
    tags: ["dom", "modal"],
  },
  {
    id: "react-15",
    category: "React",
    topic: "Suspense",
    difficulty: "Advanced",
    question: "What is Suspense used for?",
    answer:
      "Suspense helps components display fallback UI while async data or lazy-loaded code is loading.",
    explanation:
      "It improves perceived performance and simplifies UI states for data fetching and code splitting.",
    tags: ["async", "lazy"],
  },
];

const tsQuestions: Question[] = [
  {
    id: "ts-1",
    category: "TypeScript",
    topic: "Basic typing",
    difficulty: "Beginner",
    question: "What is TypeScript and why use it?",
    answer:
      "TypeScript adds static typing to JavaScript for safer code and better tooling.",
    explanation:
      "It catches errors earlier, improves editor autocomplete, and makes refactors more reliable.",
    tags: ["types", "javascript"],
  },
  {
    id: "ts-2",
    category: "TypeScript",
    topic: "Interfaces",
    difficulty: "Beginner",
    question: "How do interfaces differ from types in TypeScript?",
    answer:
      "Interfaces are often used for object shapes, while type aliases can represent unions, primitives, and more complex combinations.",
    explanation:
      "Both can model structure, but interfaces are especially useful for object contracts and extension.",
    tags: ["interface", "typing"],
  },
  {
    id: "ts-3",
    category: "TypeScript",
    topic: "Generics",
    difficulty: "Intermediate",
    question: "What are TypeScript generics?",
    answer:
      "Generics allow functions and components to accept and return different types while preserving type safety.",
    explanation:
      "They help create reusable utilities and data structures without losing type information.",
    tags: ["generics", "reuse"],
  },
  {
    id: "ts-4",
    category: "TypeScript",
    topic: "Union types",
    difficulty: "Beginner",
    question: "What is a union type?",
    answer: "A union type allows a variable to hold one of several types.",
    explanation:
      "This is helpful when a value can legitimately be string, number, or null depending on the scenario.",
    tags: ["types", "primitives"],
  },
  {
    id: "ts-5",
    category: "TypeScript",
    topic: "Non-null assertion",
    difficulty: "Intermediate",
    question: "What is the non-null assertion operator?",
    answer:
      "The ! operator tells TypeScript that a value is definitely not null or undefined.",
    explanation:
      "It is useful for cases where runtime guarantees exist, but it should be used carefully.",
    tags: ["strictness", "null"],
  },
  {
    id: "ts-6",
    category: "TypeScript",
    topic: "Type narrowing",
    difficulty: "Intermediate",
    question: "What is type narrowing?",
    answer:
      "Type narrowing refines a broader type into a more specific one based on runtime checks.",
    explanation:
      "Techniques like typeof, in, and custom guards make code safe and expressive.",
    tags: ["guards", "types"],
  },
  {
    id: "ts-7",
    category: "TypeScript",
    topic: "Utility types",
    difficulty: "Intermediate",
    question: "What are utility types in TypeScript?",
    answer:
      "Utility types are built-in helpers such as Partial, Pick, Omit, and Record that transform existing types.",
    explanation:
      "They simplify common patterns without repeating boilerplate type definitions.",
    tags: ["utility", "types"],
  },
  {
    id: "ts-8",
    category: "TypeScript",
    topic: "Readonly",
    difficulty: "Intermediate",
    question: "What does the Readonly utility do?",
    answer: "Readonly makes all properties of an object immutable.",
    explanation:
      "This helps prevent accidental mutation in shared data structures and configuration objects.",
    tags: ["immutability", "objects"],
  },
  {
    id: "ts-9",
    category: "TypeScript",
    topic: "Enums",
    difficulty: "Intermediate",
    question: "When should you use enums?",
    answer:
      "Enums are useful for representing a small set of fixed values like statuses, directions, or states.",
    explanation:
      "They can improve readability, but string literal unions are often preferred for simpler and more tree-shakeable code.",
    tags: ["enum", "constants"],
  },
  {
    id: "ts-10",
    category: "TypeScript",
    topic: "Function types",
    difficulty: "Intermediate",
    question: "How do you type a function in TypeScript?",
    answer:
      "You define the parameter types and return type, or use a function signature.",
    explanation:
      "Typing functions helps enforce contracts and improve editor support for calls and implementations.",
    tags: ["functions", "types"],
  },
  {
    id: "ts-11",
    category: "TypeScript",
    topic: "Literal types",
    difficulty: "Beginner",
    question: "What are literal types?",
    answer:
      'Literal types allow a variable to accept only a specific value such as "success" or 404.',
    explanation: "They are useful for modeling exact states and API responses.",
    tags: ["types", "literals"],
  },
  {
    id: "ts-12",
    category: "TypeScript",
    topic: "as const",
    difficulty: "Intermediate",
    question: "Why is as const useful?",
    answer:
      "as const narrows a value to its literal type and reads it as readonly.",
    explanation:
      "It is commonly used for configuration objects and tuples to preserve exact values.",
    tags: ["const", "immutability"],
  },
  {
    id: "ts-13",
    category: "TypeScript",
    topic: "Index signatures",
    difficulty: "Intermediate",
    question: "What is an index signature in TypeScript?",
    answer:
      "An index signature defines the shape of values for keys not explicitly known in an object type.",
    explanation:
      "This is useful for dictionary-like objects, though it should be used carefully to avoid loose typing.",
    tags: ["objects", "dynamic"],
  },
  {
    id: "ts-14",
    category: "TypeScript",
    topic: "Type assertions",
    difficulty: "Beginner",
    question: "What is a type assertion?",
    answer:
      "A type assertion tells the compiler to treat a value as a specific type without changing runtime behavior.",
    explanation:
      "It is useful when you have more information than TypeScript can infer, but should be used intentionally.",
    tags: ["assertion", "types"],
  },
  {
    id: "ts-15",
    category: "TypeScript",
    topic: "Infer",
    difficulty: "Advanced",
    question: "What does the infer keyword do?",
    answer: "infer extracts a type from another type in a conditional type.",
    explanation:
      "It is commonly used in utility types such as ReturnType and PromiseType extraction.",
    tags: ["advanced", "conditional-types"],
  },
];

const htmlQuestions: Question[] = [
  {
    id: "html-1",
    category: "HTML",
    topic: "Semantic HTML",
    difficulty: "Beginner",
    question: "Why is semantic HTML important?",
    answer:
      "Semantic HTML improves accessibility, SEO, and code readability by using meaningful elements.",
    explanation:
      "Elements like header, nav, main, article, and footer communicate structure to browsers and assistive tools.",
    tags: ["accessibility", "structure"],
  },
  {
    id: "html-2",
    category: "HTML",
    topic: "Forms",
    difficulty: "Beginner",
    question: "What is the purpose of the form element?",
    answer:
      "The form element groups fields and submits user input to a server or client handler.",
    explanation:
      "It supports validation, submission, and interaction via attributes such as action and method.",
    tags: ["forms", "input"],
  },
  {
    id: "html-3",
    category: "HTML",
    topic: "Accessibility",
    difficulty: "Intermediate",
    question: "How can you make a form accessible?",
    answer:
      "Use label elements, provide clear instructions, and add input names and ARIA where necessary.",
    explanation:
      "Accessible forms help screen readers and keyboard users understand and complete tasks easily.",
    tags: ["a11y", "forms"],
  },
  {
    id: "html-4",
    category: "HTML",
    topic: "Meta tags",
    difficulty: "Beginner",
    question: "What are meta tags used for?",
    answer:
      "Meta tags provide page metadata like description, viewport settings, and character encoding.",
    explanation:
      "They help browsers, search engines, and social platforms understand and display the page correctly.",
    tags: ["seo", "metadata"],
  },
  {
    id: "html-5",
    category: "HTML",
    topic: "SVG",
    difficulty: "Intermediate",
    question: "What is SVG?",
    answer:
      "SVG is a vector graphics format used to draw scalable shapes, icons, and illustrations in HTML.",
    explanation:
      "It remains crisp at any size and is ideal for logos, charts, and simple animations.",
    tags: ["graphics", "vector"],
  },
  {
    id: "html-6",
    category: "HTML",
    topic: "Canvas",
    difficulty: "Intermediate",
    question: "How is canvas different from SVG?",
    answer:
      "Canvas draws pixels on a bitmap surface, while SVG uses vector elements described in XML.",
    explanation:
      "SVG scales cleanly and is easier to manipulate with DOM APIs; canvas is often used for dynamic pixel animation.",
    tags: ["graphics", "rendering"],
  },
  {
    id: "html-7",
    category: "HTML",
    topic: "Linking",
    difficulty: "Beginner",
    question: "What is the purpose of the anchor tag?",
    answer:
      "The anchor tag creates hyperlinks to another page, section, or external resource.",
    explanation:
      "It supports navigation, in-page links, downloads, and mailto interactions.",
    tags: ["links", "navigation"],
  },
  {
    id: "html-8",
    category: "HTML",
    topic: "Table semantics",
    difficulty: "Beginner",
    question: "How can tables be made more semantic?",
    answer:
      "Use thead, tbody, tfoot, th, and caption for structure and accessibility.",
    explanation:
      "Semantic tables help screen readers understand relationships between headers and data.",
    tags: ["tables", "a11y"],
  },
  {
    id: "html-9",
    category: "HTML",
    topic: "Media elements",
    difficulty: "Beginner",
    question: "What are audio and video tags used for?",
    answer:
      "They embed media content directly into HTML pages with built-in controls and APIs.",
    explanation:
      "These elements improve compatibility and user control across browsers.",
    tags: ["media", "html5"],
  },
  {
    id: "html-10",
    category: "HTML",
    topic: "Attributes",
    difficulty: "Beginner",
    question: "What are HTML attributes?",
    answer:
      "Attributes provide additional information about an element, such as id, class, src, alt, and type.",
    explanation:
      "They enable behavior, styling, and accessibility across the page.",
    tags: ["markup", "attributes"],
  },
];

const cssQuestions: Question[] = [
  {
    id: "css-1",
    category: "CSS",
    topic: "Box model",
    difficulty: "Beginner",
    question: "What is the CSS box model?",
    answer:
      "The box model describes the structure of an element as content, padding, border, and margin.",
    explanation:
      "Understanding it is essential for spacing, sizing, and layout decisions in CSS.",
    tags: ["layout", "spacing"],
  },
  {
    id: "css-2",
    category: "CSS",
    topic: "Flexbox",
    difficulty: "Intermediate",
    question: "How does Flexbox simplify layout?",
    answer:
      "Flexbox allows direction-based alignment and distribution of items within a container.",
    explanation:
      "It is ideal for one-dimensional layouts such as nav bars, card rows, and form controls.",
    tags: ["layout", "alignment"],
  },
  {
    id: "css-3",
    category: "CSS",
    topic: "Grid",
    difficulty: "Intermediate",
    question: "When would you use CSS Grid?",
    answer: "Use CSS Grid for two-dimensional layouts with rows and columns.",
    explanation:
      "It is excellent for dashboards, galleries, and complex page layouts.",
    tags: ["layout", "grid"],
  },
  {
    id: "css-4",
    category: "CSS",
    topic: "Specificity",
    difficulty: "Intermediate",
    question: "What is CSS specificity?",
    answer:
      "Specificity determines which CSS rule wins when multiple rules target the same element.",
    explanation:
      "It is based on selectors, IDs, classes, and inline styles, which influences cascade behavior.",
    tags: ["cascade", "styling"],
  },
  {
    id: "css-5",
    category: "CSS",
    topic: "Responsive design",
    difficulty: "Intermediate",
    question: "How do media queries help in responsive design?",
    answer:
      "Media queries apply different styles based on viewport size and device characteristics.",
    explanation:
      "They let a single website adapt to mobile, tablet, and desktop layouts.",
    tags: ["responsive", "mobile"],
  },
  {
    id: "css-6",
    category: "CSS",
    topic: "Positioning",
    difficulty: "Intermediate",
    question: "Explain CSS positioning values.",
    answer:
      "static, relative, absolute, fixed, and sticky each place elements in different ways within the layout.",
    explanation:
      "Positioning is essential for overlays, fixed headers, and layered UI patterns.",
    tags: ["layout", "positioning"],
  },
  {
    id: "css-7",
    category: "CSS",
    topic: "Pseudo-classes",
    difficulty: "Beginner",
    question: "What are pseudo-classes in CSS?",
    answer:
      "Pseudo-classes target elements in special states such as hover, focus, and active.",
    explanation:
      "They allow dynamic styling without extra markup and improve usability.",
    tags: ["selectors", "interaction"],
  },
  {
    id: "css-8",
    category: "CSS",
    topic: "Pseudo-elements",
    difficulty: "Intermediate",
    question: "What are pseudo-elements used for?",
    answer:
      "Pseudo-elements style parts of an element like the first letter or generated content before and after it.",
    explanation:
      "They are commonly used for decorative text effects and clear fixes.",
    tags: ["selectors", "design"],
  },
  {
    id: "css-9",
    category: "CSS",
    topic: "Variables",
    difficulty: "Beginner",
    question: "Why use CSS custom properties?",
    answer:
      "Custom properties store reusable values like colors, spacing, and breakpoints.",
    explanation:
      "They make theme switching and maintenance much easier across large codebases.",
    tags: ["variables", "design-system"],
  },
  {
    id: "css-10",
    category: "CSS",
    topic: "BEM",
    difficulty: "Intermediate",
    question: "What is BEM in CSS?",
    answer:
      "BEM is a naming convention that organizes class names for maintainable and scalable styles.",
    explanation:
      "It reduces selector conflicts and makes component styling more predictable.",
    tags: ["architecture", "naming"],
  },
];

const dsaQuestions: Question[] = [
  {
    id: "dsa-1",
    category: "DSA",
    topic: "Big O",
    difficulty: "Beginner",
    question: "What is time complexity?",
    answer:
      "Time complexity describes how algorithm runtime grows relative to input size.",
    explanation:
      "It helps compare algorithms and choose efficient solutions for large datasets.",
    tags: ["analysis", "performance"],
  },
  {
    id: "dsa-2",
    category: "DSA",
    topic: "Arrays",
    difficulty: "Beginner",
    question: "What is the difference between arrays and linked lists?",
    answer:
      "Arrays store contiguous data with index access, while linked lists use nodes with pointers.",
    explanation:
      "Arrays support fast indexing, while linked lists offer easier insertion and deletion in the middle.",
    tags: ["data-structures"],
  },
  {
    id: "dsa-3",
    category: "DSA",
    topic: "Binary Search",
    difficulty: "Intermediate",
    question: "When is binary search applicable?",
    answer:
      "Binary search works only on sorted data by repeatedly dividing the search range.",
    explanation:
      "It reduces the search space logarithmically, making it efficient for large collections.",
    tags: ["searching", "algorithm"],
  },
  {
    id: "dsa-4",
    category: "DSA",
    topic: "Stacks",
    difficulty: "Intermediate",
    question: "How does a stack work?",
    answer:
      "A stack follows Last In First Out (LIFO), where the latest item is removed first.",
    explanation:
      "Stacks are used in expression evaluation, undo operations, and recursive calls.",
    tags: ["stack", "lifo"],
  },
  {
    id: "dsa-5",
    category: "DSA",
    topic: "Queues",
    difficulty: "Intermediate",
    question: "What is a queue?",
    answer:
      "A queue follows First In First Out (FIFO), where the oldest item is processed first.",
    explanation:
      "Queues are used in task scheduling, breadth-first traversal, and buffering.",
    tags: ["queue", "fifo"],
  },
  {
    id: "dsa-6",
    category: "DSA",
    topic: "HashMap",
    difficulty: "Intermediate",
    question: "What is a hash map?",
    answer:
      "A hash map stores key-value pairs and retrieves values by key using hashing.",
    explanation:
      "It offers efficient access for lookup-heavy workloads in many applications.",
    tags: ["hashing", "dictionary"],
  },
  {
    id: "dsa-7",
    category: "DSA",
    topic: "Trees",
    difficulty: "Intermediate",
    question: "What is a binary tree?",
    answer:
      "A binary tree is a hierarchical structure where each node has at most two children.",
    explanation:
      "Binary trees are used in search trees, heaps, and expression parsing.",
    tags: ["tree", "graph"],
  },
  {
    id: "dsa-8",
    category: "DSA",
    topic: "Graphs",
    difficulty: "Advanced",
    question: "What is graph traversal?",
    answer:
      "Graph traversal visits all nodes using strategies like DFS or BFS.",
    explanation:
      "These approaches help solve connectivity, pathfinding, and dependency problems.",
    tags: ["graph", "algorithm"],
  },
  {
    id: "dsa-9",
    category: "DSA",
    topic: "Dynamic Programming",
    difficulty: "Advanced",
    question: "What is dynamic programming?",
    answer:
      "Dynamic programming solves problems by reusing subproblem results to avoid repeated work.",
    explanation:
      "It is especially effective for optimization problems like knapsack and longest common subsequence.",
    tags: ["dp", "optimization"],
  },
  {
    id: "dsa-10",
    category: "DSA",
    topic: "Recursion",
    difficulty: "Intermediate",
    question: "What is recursion?",
    answer:
      "Recursion is a technique where a function calls itself to solve smaller subproblems.",
    explanation:
      "It is elegant for tree traversal, backtracking, and divide-and-conquer algorithms.",
    tags: ["algorithms", "functions"],
  },
];

const dbmsQuestions: Question[] = [
  {
    id: "dbms-1",
    category: "DBMS",
    topic: "Normalization",
    difficulty: "Intermediate",
    question: "What is normalization in DBMS?",
    answer:
      "Normalization organizes data to reduce redundancy and improve integrity.",
    explanation:
      "It splits data into logical tables and reduces anomalies during updates, inserts, and deletes.",
    tags: ["schema", "database"],
  },
  {
    id: "dbms-2",
    category: "DBMS",
    topic: "Primary key",
    difficulty: "Beginner",
    question: "What is a primary key?",
    answer: "A primary key uniquely identifies each row in a table.",
    explanation:
      "It ensures entity identity and is essential for indexing and relationship design.",
    tags: ["keys", "database"],
  },
  {
    id: "dbms-3",
    category: "DBMS",
    topic: "Foreign key",
    difficulty: "Intermediate",
    question: "Why use a foreign key?",
    answer:
      "A foreign key enforces relationships between tables by referencing a primary key in another table.",
    explanation:
      "It preserves referential integrity and prevents orphan records.",
    tags: ["keys", "relationships"],
  },
  {
    id: "dbms-4",
    category: "DBMS",
    topic: "Indexes",
    difficulty: "Intermediate",
    question: "What is the purpose of an index?",
    answer:
      "An index speeds up search and lookup operations by reducing the amount of data scanned.",
    explanation:
      "Indexes improve query performance, but too many can slow writes and increase storage use.",
    tags: ["performance", "query"],
  },
  {
    id: "dbms-5",
    category: "DBMS",
    topic: "ACID",
    difficulty: "Intermediate",
    question: "What does ACID mean?",
    answer:
      "ACID stands for Atomicity, Consistency, Isolation, and Durability.",
    explanation:
      "These properties ensure reliable transaction processing in databases.",
    tags: ["transactions", "database"],
  },
  {
    id: "dbms-6",
    category: "DBMS",
    topic: "Joins",
    difficulty: "Intermediate",
    question: "What are SQL joins?",
    answer: "Joins combine rows from multiple tables based on related columns.",
    explanation:
      "INNER JOIN, LEFT JOIN, and RIGHT JOIN are common for retrieving related records.",
    tags: ["sql", "queries"],
  },
  {
    id: "dbms-7",
    category: "DBMS",
    topic: "Transactions",
    difficulty: "Intermediate",
    question: "What is a database transaction?",
    answer:
      "A transaction is a sequence of operations treated as a single unit of work.",
    explanation:
      "It ensures consistency by committing only if all steps succeed or rolling back when any fail.",
    tags: ["sql", "integrity"],
  },
  {
    id: "dbms-8",
    category: "DBMS",
    topic: "Views",
    difficulty: "Beginner",
    question: "What is a view in a database?",
    answer: "A view is a virtual table based on a query result.",
    explanation:
      "Views simplify complex queries and can provide a layer of abstraction over base tables.",
    tags: ["database", "sql"],
  },
  {
    id: "dbms-9",
    category: "DBMS",
    topic: "Denormalization",
    difficulty: "Advanced",
    question: "When might denormalization be used?",
    answer:
      "Denormalization is used to improve read performance by adding redundant data when normalized structures become too expensive to query.",
    explanation:
      "It trades some write complexity and redundancy for faster reads in analytical or reporting systems.",
    tags: ["schema", "optimization"],
  },
  {
    id: "dbms-10",
    category: "DBMS",
    topic: "Isolation levels",
    difficulty: "Advanced",
    question: "What are isolation levels?",
    answer:
      "Isolation levels define how transactions interact with one another when accessing the same data concurrently.",
    explanation:
      "They balance consistency and performance, with stricter levels increasing locking and reducing concurrency.",
    tags: ["transactions", "concurrency"],
  },
];

const networkQuestions: Question[] = [
  {
    id: "net-1",
    category: "Computer Networks",
    topic: "TCP/IP",
    difficulty: "Beginner",
    question: "What is the TCP/IP model?",
    answer:
      "TCP/IP is a layered networking model used to standardize communication over networks.",
    explanation:
      "It includes layers for application, transport, internet, and link communication.",
    tags: ["networking", "protocols"],
  },
  {
    id: "net-2",
    category: "Computer Networks",
    topic: "OSI model",
    difficulty: "Intermediate",
    question: "What is the OSI model?",
    answer:
      "The OSI model is a 7-layer conceptual framework for network communication.",
    explanation:
      "It helps explain how data moves from one device to another across multiple layers.",
    tags: ["networking", "layers"],
  },
  {
    id: "net-3",
    category: "Computer Networks",
    topic: "DNS",
    difficulty: "Beginner",
    question: "What does DNS do?",
    answer:
      "DNS translates human-readable domain names like example.com into IP addresses.",
    explanation:
      "It is essential for navigating the web without memorizing numeric addresses.",
    tags: ["internet", "resolution"],
  },
  {
    id: "net-4",
    category: "Computer Networks",
    topic: "HTTP vs HTTPS",
    difficulty: "Beginner",
    question: "What is the difference between HTTP and HTTPS?",
    answer: "HTTPS adds encryption via TLS/SSL, securing data in transit.",
    explanation:
      "HTTP is plaintext and vulnerable to interception; HTTPS protects confidentiality and integrity.",
    tags: ["security", "web"],
  },
  {
    id: "net-5",
    category: "Computer Networks",
    topic: "IP addresses",
    difficulty: "Intermediate",
    question: "What is the difference between IPv4 and IPv6?",
    answer:
      "IPv4 uses 32-bit addresses while IPv6 uses 128-bit addresses to support more devices.",
    explanation:
      "IPv6 also improves routing efficiency and eliminates the exhaustion issues of IPv4.",
    tags: ["networking", "internet"],
  },
  {
    id: "net-6",
    category: "Computer Networks",
    topic: "Subnetting",
    difficulty: "Intermediate",
    question: "What is subnetting?",
    answer: "Subnetting divides a network into smaller logical subnetworks.",
    explanation:
      "It improves efficiency, reduces network congestion, and helps manage IP allocation.",
    tags: ["routing", "ip"],
  },
  {
    id: "net-7",
    category: "Computer Networks",
    topic: "Routing",
    difficulty: "Intermediate",
    question: "What is routing in networks?",
    answer:
      "Routing is the process of selecting paths for data packets to move across networks.",
    explanation:
      "Routers use routing tables and protocols to deliver packets to their destination.",
    tags: ["routers", "internet"],
  },
  {
    id: "net-8",
    category: "Computer Networks",
    topic: "TCP vs UDP",
    difficulty: "Intermediate",
    question: "How do TCP and UDP differ?",
    answer:
      "TCP is connection-oriented and reliable, while UDP is connectionless and lightweight.",
    explanation:
      "TCP is preferred for email and file transfer, while UDP is commonly used for video streaming and gaming.",
    tags: ["protocols", "transport"],
  },
  {
    id: "net-9",
    category: "Computer Networks",
    topic: "Firewall",
    difficulty: "Beginner",
    question: "What is a firewall?",
    answer:
      "A firewall filters incoming and outgoing network traffic based on rules and policies.",
    explanation:
      "It helps protect systems from unauthorized access and malicious traffic.",
    tags: ["security", "network"],
  },
  {
    id: "net-10",
    category: "Computer Networks",
    topic: "Latency",
    difficulty: "Beginner",
    question: "What is network latency?",
    answer:
      "Latency is the time delay experienced when data travels across a network.",
    explanation:
      "High latency can impact responsiveness in real-time applications and user experience.",
    tags: ["performance", "network"],
  },
];

const osQuestions: Question[] = [
  {
    id: "os-1",
    category: "Operating Systems",
    topic: "Processes",
    difficulty: "Beginner",
    question: "What is a process?",
    answer:
      "A process is an instance of a running program with its own memory and execution state.",
    explanation:
      "Processes are isolated to prevent one program from accidentally modifying another’s memory.",
    tags: ["process", "memory"],
  },
  {
    id: "os-2",
    category: "Operating Systems",
    topic: "Threads",
    difficulty: "Intermediate",
    question: "How is a thread different from a process?",
    answer:
      "A thread is a lightweight execution unit within a process and shares memory with other threads.",
    explanation:
      "Threads allow parallel work inside one program but require careful synchronization.",
    tags: ["parallelism", "execution"],
  },
  {
    id: "os-3",
    category: "Operating Systems",
    topic: "Scheduling",
    difficulty: "Intermediate",
    question: "What is CPU scheduling?",
    answer: "CPU scheduling decides which process gets CPU time and when.",
    explanation:
      "It helps maximize fairness, responsiveness, and throughput in multitasking environments.",
    tags: ["cpu", "scheduler"],
  },
  {
    id: "os-4",
    category: "Operating Systems",
    topic: "Deadlocks",
    difficulty: "Advanced",
    question: "What is a deadlock?",
    answer:
      "A deadlock happens when processes wait on each other indefinitely because each holds resources needed by the others.",
    explanation:
      "Deadlocks are prevented or resolved through careful resource allocation and scheduling strategies.",
    tags: ["resources", "concurrency"],
  },
  {
    id: "os-5",
    category: "Operating Systems",
    topic: "Paging",
    difficulty: "Intermediate",
    question: "What is paging in operating systems?",
    answer:
      "Paging divides memory into fixed-size pages and maps them to frames in physical memory.",
    explanation:
      "It enables efficient memory management and allows virtual memory to work.",
    tags: ["memory", "virtualization"],
  },
  {
    id: "os-6",
    category: "Operating Systems",
    topic: "Virtual memory",
    difficulty: "Intermediate",
    question: "What is virtual memory?",
    answer:
      "Virtual memory allows the system to use disk space as an extension of RAM.",
    explanation:
      "It lets programs run even when physical memory is limited, though it can slow performance.",
    tags: ["memory", "performance"],
  },
  {
    id: "os-7",
    category: "Operating Systems",
    topic: "IPC",
    difficulty: "Intermediate",
    question: "What is inter-process communication?",
    answer:
      "IPC enables processes to communicate and synchronize with one another.",
    explanation:
      "It is essential in distributed and multi-process applications for coordination.",
    tags: ["communication", "processes"],
  },
  {
    id: "os-8",
    category: "Operating Systems",
    topic: "Semaphores",
    difficulty: "Advanced",
    question: "What is a semaphore?",
    answer:
      "A semaphore is a synchronization primitive that controls access to shared resources.",
    explanation:
      "It helps prevent race conditions and coordinate threads or processes.",
    tags: ["sync", "concurrency"],
  },
  {
    id: "os-9",
    category: "Operating Systems",
    topic: "Context switch",
    difficulty: "Intermediate",
    question: "What is a context switch?",
    answer:
      "A context switch is the process of storing a running process state and restoring another one.",
    explanation:
      "It allows multiple processes to share CPU time efficiently in a multitasking system.",
    tags: ["cpu", "scheduling"],
  },
  {
    id: "os-10",
    category: "Operating Systems",
    topic: "File system",
    difficulty: "Beginner",
    question: "What is a file system?",
    answer:
      "A file system manages how data is stored, organized, and retrieved on storage devices.",
    explanation:
      "It provides structure for files, directories, permissions, and metadata.",
    tags: ["storage", "filesystem"],
  },
];

const hrQuestionsData: Question[] = [
  {
    id: "hr-1",
    category: "HR",
    topic: "Tell me about yourself",
    difficulty: "Beginner",
    question: "How should you answer “Tell me about yourself?”",
    answer:
      "Give a concise overview of your background, skills, achievements, and career motivation.",
    explanation:
      "Keep it professional and structured around your journey, strengths, and why the role fits your goals.",
    tags: ["introduction", "communication"],
  },
  {
    id: "hr-2",
    category: "HR",
    topic: "Strengths",
    difficulty: "Beginner",
    question: "How do you speak about your strengths?",
    answer:
      "Highlight strengths that match the role and support them with specific examples.",
    explanation:
      "Strong answers include evidence, outcomes, and relevance to the job description.",
    tags: ["self-awareness", "presentation"],
  },
  {
    id: "hr-3",
    category: "HR",
    topic: "Weaknesses",
    difficulty: "Intermediate",
    question: "How should you answer about weaknesses?",
    answer:
      "Choose a real but manageable weakness and describe the steps taken to improve it.",
    explanation:
      "This shows honesty and growth while keeping the answer professional and constructive.",
    tags: ["growth", "honesty"],
  },
  {
    id: "hr-4",
    category: "HR",
    topic: "Why this company?",
    difficulty: "Intermediate",
    question: "What makes a good “Why this company?” answer?",
    answer:
      "It should connect your goals to the company’s mission, product, and culture.",
    explanation:
      "A good answer is specific, informed, and shows you understand the business value.",
    tags: ["motivation", "research"],
  },
  {
    id: "hr-5",
    category: "HR",
    topic: "Teamwork",
    difficulty: "Beginner",
    question: "How do you answer teamwork questions?",
    answer:
      "Describe your role, how you collaborated, and the result of the effort.",
    explanation:
      "Good answers show empathy, accountability, and contribution to a shared objective.",
    tags: ["teamwork", "leadership"],
  },
  {
    id: "hr-6",
    category: "HR",
    topic: "Conflict",
    difficulty: "Intermediate",
    question: "How should you answer conflict-related interview questions?",
    answer:
      "Describe a respectful disagreement, your approach to resolution, and the positive outcome.",
    explanation:
      "This demonstrates maturity, communication, and professionalism under pressure.",
    tags: ["conflict", "communication"],
  },
  {
    id: "hr-7",
    category: "HR",
    topic: "Why hire you?",
    difficulty: "Intermediate",
    question: "What is the best way to answer “Why should we hire you?”",
    answer:
      "Explain your fit with the role, unique strengths, and the value you can create.",
    explanation:
      "The answer should combine skills, experience, and attitude with confidence.",
    tags: ["value", "positioning"],
  },
  {
    id: "hr-8",
    category: "HR",
    topic: "Career goals",
    difficulty: "Intermediate",
    question: "How do you answer questions about future goals?",
    answer:
      "Talk about growth, skill development, and how the role fits your long-term direction.",
    explanation:
      "This should sound realistic and aligned with the company’s path.",
    tags: ["career", "planning"],
  },
  {
    id: "hr-9",
    category: "HR",
    topic: "Project questions",
    difficulty: "Intermediate",
    question: "How do you explain a project clearly?",
    answer:
      "Describe the problem, your approach, key decisions, and measurable impact.",
    explanation: "Interviewers want concise but meaningful project narratives.",
    tags: ["projects", "storytelling"],
  },
  {
    id: "hr-10",
    category: "HR",
    topic: "Leadership",
    difficulty: "Intermediate",
    question: "How do you discuss leadership experience?",
    answer:
      "Share examples where you influenced decisions, supported teammates, or drove outcomes.",
    explanation:
      "Leadership is not just titles; it includes ownership and initiative.",
    tags: ["leadership", "ownership"],
  },
];

export const allQuestions: Question[] = [
  ...jsQuestions,
  ...reactQuestions,
  ...tsQuestions,
  ...htmlQuestions,
  ...cssQuestions,
  ...dsaQuestions,
  ...dbmsQuestions,
  ...networkQuestions,
  ...osQuestions,
  ...hrQuestionsData,
];

export const categories: Category[] = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
  "Git & GitHub",
  "DSA",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
  "HR",
];

export const topicsByCategory: Record<string, string[]> = {
  HTML: ["Semantic HTML", "Forms", "Accessibility"],
  CSS: ["Box model", "Flexbox", "Grid"],
  JavaScript: ["Closures", "Event Loop", "Promises"],
  React: ["Hooks", "State updates", "Virtual DOM"],
  TypeScript: ["Generics", "Interfaces", "Utility types"],
  "Node.js": ["Event loop", "Modules", "Express"],
  "Git & GitHub": ["Branching", "PR flow", "Git rebase"],
  DSA: ["Big O", "Binary Search", "Graphs"],
  DBMS: ["Normalization", "Joins", "Transactions"],
  "Operating Systems": ["Processes", "Scheduling", "Memory"],
  "Computer Networks": ["TCP/IP", "DNS", "HTTP vs HTTPS"],
  HR: ["Tell me about yourself", "Strengths", "Teamwork"],
};

export const defaultDifficulty: Difficulty[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];
