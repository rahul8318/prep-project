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
  {
    id: "js-21",
    category: "JavaScript",
    topic: "Array sorting",
    difficulty: "Beginner",
    question:
      "How does sort() work in JavaScript and why is a compare function often needed?",
    answer:
      "sort() sorts array elements in place, but without a compare function it converts values to strings and orders them by Unicode code points.",
    explanation:
      "This can create surprising behavior for numbers because [10, 2, 30].sort() produces [10, 2, 30] instead of [2, 10, 30]. A compare function such as (a, b) => a - b ensures correct numeric sorting.",
    tags: ["arrays", "sorting"],
  },
  {
    id: "js-22",
    category: "JavaScript",
    topic: "Rest parameters",
    difficulty: "Beginner",
    question: "What are rest parameters in JavaScript?",
    answer:
      "Rest parameters allow a function to accept an indefinite number of arguments as an array.",
    explanation:
      "They are useful when you want to handle a variable number of arguments without manually using the arguments object. They also simplify function definitions and make intent clearer.",
    tags: ["functions", "arguments"],
  },
  {
    id: "js-23",
    category: "JavaScript",
    topic: "Spread syntax",
    difficulty: "Beginner",
    question: "How is the spread operator different from rest parameters?",
    answer:
      "Spread expands iterable values into individual elements, while rest collects multiple values into an array.",
    explanation:
      "Spread is commonly used to copy arrays, merge objects, and pass arguments to functions. Rest is used in function signatures to absorb extra arguments.",
    tags: ["es6", "functions"],
  },
  {
    id: "js-24",
    category: "JavaScript",
    topic: "Function declaration vs expression",
    difficulty: "Beginner",
    question:
      "What is the difference between a function declaration and a function expression?",
    answer:
      "A function declaration is hoisted and can be used before its definition, while a function expression is created at runtime and is not hoisted the same way.",
    explanation:
      "Function declarations are ideal for named utility functions. Function expressions are often used in callbacks, IIFEs, and assignments where scope and timing matter.",
    tags: ["functions", "hoisting"],
  },
  {
    id: "js-25",
    category: "JavaScript",
    topic: "Lexical scoping",
    difficulty: "Intermediate",
    question: "What is lexical scoping in JavaScript?",
    answer:
      "Lexical scoping means a function can access variables from the scope in which it was defined, not where it is called.",
    explanation:
      "This is why closures work: inner functions keep access to their outer environment even after the outer function finishes executing. It is a foundational concept in JavaScript.",
    tags: ["scope", "closures"],
  },
  {
    id: "js-26",
    category: "JavaScript",
    topic: "Array filter",
    difficulty: "Beginner",
    question: "When would you use filter() instead of map()?",
    answer:
      "filter() is used when you want to keep only the elements that satisfy a condition, while map() transforms every element.",
    explanation:
      "filter() returns a new array with matching values, while map() returns a transformed array of the same length. They solve different problems and are often used together.",
    tags: ["arrays", "functional"],
  },
  {
    id: "js-27",
    category: "JavaScript",
    topic: "setTimeout and closures",
    difficulty: "Intermediate",
    question: "Why can closures be important with setTimeout in JavaScript?",
    answer:
      "Closures allow a callback to remember the surrounding state even after the surrounding function has returned.",
    explanation:
      "This is especially useful when scheduling delayed work. Without closures, the timer callback would not have access to the original variables unless they are passed explicitly.",
    tags: ["async", "closures"],
  },
  {
    id: "js-28",
    category: "JavaScript",
    topic: "Regular expressions",
    difficulty: "Intermediate",
    question: "What is a regular expression and how is it used in JavaScript?",
    answer:
      "A regular expression is a pattern used to match or search strings based on specific rules.",
    explanation:
      "JavaScript supports regex via literals or constructor functions. They are used for validation, parsing, replacements, and extracting information from text.",
    tags: ["strings", "regex"],
  },
  {
    id: "js-29",
    category: "JavaScript",
    topic: "IIFE",
    difficulty: "Intermediate",
    question: "What is an IIFE and why would you use one?",
    answer:
      "An IIFE is an Immediately Invoked Function Expression that runs as soon as it is defined.",
    explanation:
      "It helps isolate variables from the global scope, avoiding accidental collisions. IIFEs were commonly used in older JavaScript before modules became standard.",
    tags: ["functions", "scope"],
  },
  {
    id: "js-30",
    category: "JavaScript",
    topic: "Promise finally",
    difficulty: "Intermediate",
    question: "What does Promise.finally() do?",
    answer:
      "Promise.finally() runs a callback after a promise settles, whether it resolves or rejects.",
    explanation:
      "It is useful for cleanup operations such as hiding loading spinners, resetting UI state, or releasing resources regardless of the outcome.",
    tags: ["async", "promises"],
  },
  {
    id: "js-31",
    category: "JavaScript",
    topic: "JSON serialization",
    difficulty: "Intermediate",
    question: "Why can JSON.stringify fail on some objects?",
    answer:
      "JSON.stringify throws or omits values when the object contains circular references or functions, symbols, or undefined values.",
    explanation:
      "If an object references itself, serialization cannot be completed. To handle circular data, you need custom logic or a library that supports special cases.",
    tags: ["json", "objects"],
  },
  {
    id: "js-32",
    category: "JavaScript",
    topic: "DOMContentLoaded",
    difficulty: "Beginner",
    question: "What is the DOMContentLoaded event?",
    answer:
      "It fires when the initial HTML document has been fully parsed and the DOM is ready to be manipulated.",
    explanation:
      "This event is used to run scripts after the markup is available, without waiting for stylesheets and images to finish loading. It is a common place to initialize UI logic.",
    tags: ["browser", "dom"],
  },
  {
    id: "js-33",
    category: "JavaScript",
    topic: "Array flatMap",
    difficulty: "Intermediate",
    question: "What is flatMap() used for?",
    answer:
      "flatMap() maps each element and then flattens the result into a new array.",
    explanation:
      "This is helpful when you need to project one-to-many relationships, such as expanding a list of orders into all of their items in a single operation.",
    tags: ["arrays", "mapping"],
  },
  {
    id: "js-34",
    category: "JavaScript",
    topic: "Reducer pattern",
    difficulty: "Intermediate",
    question: "What is the purpose of reduce() in JavaScript?",
    answer:
      "reduce() reduces an array to a single value by repeatedly combining an accumulator with each element.",
    explanation:
      "It is often used for sums, grouping, object creation, and data aggregation. The accumulator can start with an initial value or the first element of the array.",
    tags: ["arrays", "functional"],
  },
  {
    id: "js-35",
    category: "JavaScript",
    topic: "Modules",
    difficulty: "Intermediate",
    question: "How do JavaScript modules help with code organization?",
    answer:
      "Modules let you split code into reusable files and export or import only the pieces that are needed.",
    explanation:
      "They improve maintainability, avoid global namespace pollution, and make dependencies explicit. ES modules are the standard modern browser and Node pattern.",
    tags: ["modules", "es6"],
  },
  {
    id: "js-36",
    category: "JavaScript",
    topic: "WeakSet",
    difficulty: "Advanced",
    question: "What is a WeakSet and how is it different from a Set?",
    answer:
      "A WeakSet stores only objects and does not prevent them from being garbage collected.",
    explanation:
      "This makes WeakSet useful for tracking object identity without keeping references alive longer than necessary. Unlike Set, WeakSet does not support iteration or size checking.",
    tags: ["collections", "memory"],
  },
  {
    id: "js-37",
    category: "JavaScript",
    topic: "Recursion",
    difficulty: "Intermediate",
    question: "What is recursion in JavaScript?",
    answer:
      "Recursion is when a function calls itself to solve smaller instances of the same problem.",
    explanation:
      "Recursion is well-suited for tree traversal, divide-and-conquer algorithms, and nested structures. It must include a base case to prevent infinite recursion.",
    tags: ["functions", "algorithms"],
  },
  {
    id: "js-38",
    category: "JavaScript",
    topic: "Garbage collection",
    difficulty: "Intermediate",
    question: "How does JavaScript garbage collection work?",
    answer:
      "The JavaScript engine automatically reclaims memory that is no longer reachable from any active references.",
    explanation:
      "This means objects that have no roots in the running program can be cleaned up by the garbage collector. Understanding reachability is important when working with closures and caches.",
    tags: ["memory", "runtime"],
  },
  {
    id: "js-39",
    category: "JavaScript",
    topic: "Event target",
    difficulty: "Intermediate",
    question:
      "What is the difference between event.target and event.currentTarget?",
    answer:
      "event.target is the element that triggered the event, while event.currentTarget is the element whose listener is handling it.",
    explanation:
      "This distinction is especially important in event delegation, where a parent listener handles events from child elements. The target is the origin, while currentTarget is the listener owner.",
    tags: ["events", "dom"],
  },
  {
    id: "js-40",
    category: "JavaScript",
    topic: "Fetch API",
    difficulty: "Intermediate",
    question: "How does the Fetch API work in JavaScript?",
    answer:
      "Fetch makes HTTP requests and returns a Promise that resolves to a Response object.",
    explanation:
      "It supports modern asynchronous web communication and is often paired with response.json(), response.text(), or response.ok checks. It is more promise-based and cleaner than XMLHttpRequest.",
    tags: ["network", "async"],
  },
  {
    id: "js-41",
    category: "JavaScript",
    topic: "Object destructuring",
    difficulty: "Beginner",
    question: "What is object destructuring and why is it useful?",
    answer:
      "Object destructuring extracts properties from an object into variables with a concise syntax.",
    explanation:
      "It reduces repeated property access and makes code easier to read, especially when working with configuration objects and API responses.",
    tags: ["es6", "objects"],
  },
  {
    id: "js-42",
    category: "JavaScript",
    topic: "Array reduction",
    difficulty: "Intermediate",
    question: "How can reduce() be used to count values in an array?",
    answer:
      "reduce() can accumulate a counter object and increment counts for each matching value.",
    explanation:
      "This pattern is useful for frequency analysis, grouping results, and summarizing data. It keeps logic centralized and expressive for data processing tasks.",
    tags: ["arrays", "data"],
  },
  {
    id: "js-43",
    category: "JavaScript",
    topic: "Nullish coalescing",
    difficulty: "Beginner",
    question: "Why is nullish coalescing safer than || for default values?",
    answer:
      "?? only falls back when the value is null or undefined, while || treats other falsy values such as 0, false, and empty strings as missing.",
    explanation:
      "This makes ?? better for cases where valid falsy values should be preserved, such as 0 or empty strings. It is especially useful in configuration and UI defaults.",
    tags: ["es2020", "operators"],
  },
  {
    id: "js-44",
    category: "JavaScript",
    topic: "Shadowing",
    difficulty: "Intermediate",
    question: "What is variable shadowing in JavaScript?",
    answer:
      "Shadowing occurs when an inner scope declares a variable with the same name as a variable in an outer scope.",
    explanation:
      "The inner variable hides the outer one within its own scope. Shadowing can make code confusing, so it should be used carefully and deliberately.",
    tags: ["scope", "variables"],
  },
  {
    id: "js-45",
    category: "JavaScript",
    topic: "Array includes",
    difficulty: "Beginner",
    question: "What is the difference between includes() and indexOf()?",
    answer:
      "includes() returns a boolean, while indexOf() returns the index position of a match or -1 if it is missing.",
    explanation:
      "includes() is often more readable for membership checks and supports easier conditionals. indexOf() remains useful when you need the exact position in the array.",
    tags: ["arrays", "methods"],
  },
  {
    id: "js-46",
    category: "JavaScript",
    topic: "Proxy",
    difficulty: "Advanced",
    question: "What is a Proxy in JavaScript?",
    answer:
      "A Proxy wraps an object and intercepts operations such as reading, writing, and method calls.",
    explanation:
      "Proxies are powerful for validation, logging, custom property access, and reactive abstractions. They allow developers to define custom behavior for object interaction.",
    tags: ["objects", "meta-programming"],
  },
  {
    id: "js-47",
    category: "JavaScript",
    topic: "Array every and some",
    difficulty: "Beginner",
    question: "How are every() and some() different?",
    answer:
      "every() returns true only if all elements match a condition, while some() returns true if at least one element matches.",
    explanation:
      "They are useful for validation checks and early truth assessment. every() is ideal for ensuring all items pass a rule, while some() checks whether there is any positive match.",
    tags: ["arrays", "validation"],
  },
  {
    id: "js-48",
    category: "JavaScript",
    topic: "Date API",
    difficulty: "Intermediate",
    question: "What is the JavaScript Date object used for?",
    answer:
      "The Date object represents dates and times and supports parsing, formatting, and date arithmetic.",
    explanation:
      "It is useful for timers, logs, scheduling, and displaying timestamps. However, it can be tricky because time zones and locale formatting vary by environment.",
    tags: ["date", "browser"],
  },
  {
    id: "js-49",
    category: "JavaScript",
    topic: "Object freeze",
    difficulty: "Intermediate",
    question: "What does Object.freeze() do?",
    answer:
      "Object.freeze() makes an object immutable so its properties cannot be added, removed, or changed.",
    explanation:
      "It is useful for protecting configuration objects and shared constants. The freeze is shallow, meaning nested objects are still mutable unless frozen separately.",
    tags: ["immutability", "objects"],
  },
  {
    id: "js-50",
    category: "JavaScript",
    topic: "Template literals",
    difficulty: "Beginner",
    question: "What are template literals and why are they useful?",
    answer:
      "Template literals are strings enclosed with backticks that support interpolation and multi-line text.",
    explanation:
      "They make string building easier and cleaner than concatenation. They also support multi-line content and embedded expressions in a natural syntax.",
    tags: ["strings", "es6"],
  },
  {
    id: "js-51",
    category: "JavaScript",
    topic: "Types",
    difficulty: "Intermediate",
    question: "What is the difference between Number() and parseInt()?",
    answer:
      "Number() converts the entire input into a number, while parseInt() reads an integer from the beginning of a string and stops when it reaches an invalid character.",
    explanation:
      'Number() is strict: Number("123abc") returns NaN because the complete value is not a valid number, while Number("123") returns 123. parseInt() parses from left to right, so parseInt("123abc", 10) returns 123. parseInt() also truncates decimals, so parseInt("12.8", 10) returns 12. Always provide the radix, normally 10, to make the intended base explicit. Use Number() when the whole value must be numeric and parseInt() when you intentionally need to extract an integer prefix from text.',
    tags: ["types", "numbers", "conversion"],
    codeExample: `Number(\"123abc\"); // NaN
Number(\"123\"); // 123
parseInt(\"123abc\", 10); // 123
parseInt(\"12.8\", 10); // 12`,
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
  {
    id: "react-16",
    category: "React",
    topic: "useCallback",
    difficulty: "Intermediate",
    question: "What does useCallback do in React?",
    answer:
      "useCallback memoizes a function so the same function reference is reused across renders unless dependencies change.",
    explanation:
      "It helps avoid unnecessary re-renders in child components that depend on function identity, especially when passing callbacks as props to optimized components.",
    tags: ["hooks", "performance"],
  },
  {
    id: "react-17",
    category: "React",
    topic: "useReducer",
    difficulty: "Intermediate",
    question: "When is useReducer a better choice than useState?",
    answer:
      "useReducer is better for managing more complex state transitions or multiple related updates in a predictable reducer pattern.",
    explanation:
      "It centralizes logic in a reducer function, making code easier to reason about when state updates depend on previous state or multiple actions.",
    tags: ["hooks", "state-management"],
  },
  {
    id: "react-18",
    category: "React",
    topic: "Prop drilling",
    difficulty: "Beginner",
    question: "What is prop drilling and how can it be avoided?",
    answer:
      "Prop drilling is when data is passed through many intermediate components just to reach a deeply nested child.",
    explanation:
      "It can be avoided with Context API, composition, or state management libraries. This reduces complexity and makes component APIs cleaner.",
    tags: ["props", "context"],
  },
  {
    id: "react-19",
    category: "React",
    topic: "Lifting state up",
    difficulty: "Intermediate",
    question: "What does lifting state up mean in React?",
    answer:
      "Lifting state up means moving shared state to the closest parent component that needs it so multiple children can synchronize.",
    explanation:
      "This keeps data consistent across siblings and prevents duplicate state in separate components. It is a common design pattern in React UIs.",
    tags: ["state", "architecture"],
  },
  {
    id: "react-20",
    category: "React",
    topic: "Fragment",
    difficulty: "Beginner",
    question: "Why would you use a React Fragment?",
    answer:
      "A Fragment lets you group multiple elements without adding an extra DOM node.",
    explanation:
      "This is useful when a component needs to return multiple sibling elements but you do not want unnecessary wrapper elements in the markup.",
    tags: ["jsx", "rendering"],
  },
  {
    id: "react-21",
    category: "React",
    topic: "Children prop",
    difficulty: "Beginner",
    question: "What is the children prop in React?",
    answer:
      "The children prop contains the content passed between a component’s opening and closing tags.",
    explanation:
      "It is common for layout components, wrappers, and design-system primitives where a parent component renders content supplied by its caller.",
    tags: ["props", "composition"],
  },
  {
    id: "react-22",
    category: "React",
    topic: "useEffect cleanup",
    difficulty: "Intermediate",
    question: "Why is cleanup important in useEffect?",
    answer:
      "Cleanup prevents memory leaks and removes side effects such as event listeners, subscriptions, or timers when the component unmounts or the effect reruns.",
    explanation:
      "Without cleanup, stale subscriptions or duplicated listeners can create bugs. React automatically runs cleanup before re-running an effect or unmounting the component.",
    tags: ["effects", "memory"],
  },
  {
    id: "react-23",
    category: "React",
    topic: "State updates with object",
    difficulty: "Intermediate",
    question: "How should you update nested object state in React?",
    answer:
      "You should create a new object or use a functional state update so you do not mutate the existing state object directly.",
    explanation:
      "React relies on immutability to detect state changes. Mutating nested properties can prevent re-renders and cause stale UI data.",
    tags: ["state", "immutability"],
  },
  {
    id: "react-24",
    category: "React",
    topic: "Controlled inputs",
    difficulty: "Beginner",
    question:
      "What is the difference between controlled and uncontrolled inputs?",
    answer:
      "Controlled inputs are managed by React state, while uncontrolled inputs keep their value in the DOM until needed.",
    explanation:
      "Controlled components provide a single source of truth and easier validation, while uncontrolled inputs can be useful for simple forms or when integrating with third-party libraries.",
    tags: ["forms", "state"],
  },
  {
    id: "react-25",
    category: "React",
    topic: "List rendering",
    difficulty: "Beginner",
    question: "Why should every list item in React have a unique key?",
    answer:
      "Keys help React identify which items changed, were added, or removed, allowing efficient reconciliation.",
    explanation:
      "Using stable unique keys avoids incorrect DOM updates and unnecessary re-renders. Index keys are acceptable for static lists but can cause issues when the list changes order.",
    tags: ["lists", "performance"],
  },
  {
    id: "react-26",
    category: "React",
    topic: "Higher-order components",
    difficulty: "Intermediate",
    question: "What is a higher-order component in React?",
    answer:
      "A higher-order component is a function that takes a component and returns a new component with added behavior or props.",
    explanation:
      "HOCs were a common way to reuse cross-cutting concerns such as authentication or logging before hooks became the standard pattern.",
    tags: ["components", "patterns"],
  },
  {
    id: "react-27",
    category: "React",
    topic: "Lazy loading",
    difficulty: "Intermediate",
    question: "What is lazy loading in React?",
    answer:
      "Lazy loading defers loading a component or resource until it is actually needed.",
    explanation:
      "React.lazy and Suspense make it easier to split bundles and improve initial load times for large applications, especially on routes or heavy pages.",
    tags: ["performance", "code-splitting"],
  },
  {
    id: "react-28",
    category: "React",
    topic: "Refs vs state",
    difficulty: "Intermediate",
    question: "When should you use refs instead of state?",
    answer:
      "Use refs for direct DOM access or non-rendering values such as focus, animation, media playback, or imperative interactions.",
    explanation:
      "State drives UI updates, while refs are meant for values that do not need to trigger re-rendering. Overusing refs can make code harder to reason about.",
    tags: ["refs", "state"],
  },
  {
    id: "react-29",
    category: "React",
    topic: "ForwardRef",
    difficulty: "Advanced",
    question: "What is React.forwardRef used for?",
    answer:
      "forwardRef allows a child component to expose a ref to a DOM node or class component to its parent.",
    explanation:
      "This is commonly used in reusable input components, custom form controls, and third-party library wrappers where parent code needs imperative access.",
    tags: ["refs", "components"],
  },
  {
    id: "react-30",
    category: "React",
    topic: "StrictMode",
    difficulty: "Intermediate",
    question: "What does React.StrictMode do?",
    answer:
      "StrictMode activates additional development checks to help identify unsafe lifecycle patterns, side effects, and render issues.",
    explanation:
      "It does not change production behavior and is mainly used during development to catch patterns that can lead to bugs or inconsistent rendering.",
    tags: ["development", "debugging"],
  },
  {
    id: "react-31",
    category: "React",
    topic: "Synthetic events",
    difficulty: "Intermediate",
    question: "What are synthetic events in React?",
    answer:
      "Synthetic events are React’s cross-browser wrapper around browser events, providing a consistent API across platforms.",
    explanation:
      "They normalize event behavior so developers can use one interface regardless of the browser. They still flow through the same event phases and can be prevented or stopped.",
    tags: ["events", "browser"],
  },
  {
    id: "react-32",
    category: "React",
    topic: "Server components",
    difficulty: "Advanced",
    question: "What are React Server Components?",
    answer:
      "Server Components allow parts of the UI to be rendered on the server and sent to the client without shipping all their JavaScript.",
    explanation:
      "This reduces client bundle size and enables data fetching close to the source. They are part of modern React architecture and work alongside client components.",
    tags: ["architecture", "performance"],
  },
  {
    id: "react-33",
    category: "React",
    topic: "Hydration",
    difficulty: "Advanced",
    question: "What is hydration in React?",
    answer:
      "Hydration is the process of attaching React behavior to server-rendered HTML so the client app becomes interactive.",
    explanation:
      "This ensures the initial UI matches the server output while enabling event listeners and state management on the client. Bugs here often result from mismatched markup or IDs.",
    tags: ["ssr", "rendering"],
  },
  {
    id: "react-34",
    category: "React",
    topic: "Route params",
    difficulty: "Intermediate",
    question: "How do you access route parameters in React Router?",
    answer:
      "You use the useParams hook to read values defined in the route path.",
    explanation:
      "This is useful for detail pages where the URL contains an ID or slug. The hook returns an object of the currently matched route parameters.",
    tags: ["routing", "hooks"],
  },
  {
    id: "react-35",
    category: "React",
    topic: "Protected routes",
    difficulty: "Intermediate",
    question: "What is a protected route in a React app?",
    answer:
      "A protected route restricts access to certain pages until the user is authenticated or authorized.",
    explanation:
      "Typically, this is implemented by checking auth state and redirecting unauthenticated users to a login page or displaying a fallback. It is common in dashboard and admin workflows.",
    tags: ["routing", "security"],
  },
  {
    id: "react-36",
    category: "React",
    topic: "Error boundaries",
    difficulty: "Advanced",
    question: "How do error boundaries improve production reliability?",
    answer:
      "Error boundaries catch rendering errors in a subtree and display a fallback UI instead of crashing the whole app.",
    explanation:
      "They are essential for building resilient interfaces where a single failing component should not blank out the entire page. They help isolate problems and improve user experience.",
    tags: ["error-handling", "ui"],
  },
  {
    id: "react-37",
    category: "React",
    topic: "useLayoutEffect",
    difficulty: "Advanced",
    question: "When would you choose useLayoutEffect over useEffect?",
    answer:
      "useLayoutEffect runs synchronously after DOM mutations but before the browser paints, which makes it useful for measuring layout or reading dimensions.",
    explanation:
      "It is best for cases where you need to read layout before paint, such as animations or DOM measurements. It should be used carefully because it can block painting.",
    tags: ["hooks", "performance"],
  },
  {
    id: "react-38",
    category: "React",
    topic: "Form validation",
    difficulty: "Intermediate",
    question: "How is validation typically handled in React forms?",
    answer:
      "Validation is typically done in event handlers or custom hooks, often using state to track field values and errors.",
    explanation:
      "Validation can happen on submit, on change, or both. Keeping validation logic declarative and centralized helps maintain clean and predictable form behavior.",
    tags: ["forms", "validation"],
  },
  {
    id: "react-39",
    category: "React",
    topic: "Context provider",
    difficulty: "Intermediate",
    question: "How does a Context provider work in React?",
    answer:
      "A Context provider supplies a value to all components below it in the tree, allowing shared state or functions to be accessed without prop drilling.",
    explanation:
      "This makes theme, auth, and localization data easy to share across an app. Consumers read from the nearest provider and update when the provider value changes.",
    tags: ["context", "state"],
  },
  {
    id: "react-40",
    category: "React",
    topic: "Memoization",
    difficulty: "Intermediate",
    question: "How does React.memo help optimize components?",
    answer:
      "React.memo skips re-rendering a component when its props are shallowly equal to the previous render.",
    explanation:
      "It is useful for pure presentational components that receive stable props. If props are recreated frequently, memoization may not provide much benefit.",
    tags: ["performance", "optimization"],
  },
  {
    id: "react-41",
    category: "React",
    topic: "Conditional rendering",
    difficulty: "Beginner",
    question: "What are common patterns for conditional rendering in React?",
    answer:
      "Common patterns include if statements, ternary operators, and logical && expressions inside JSX.",
    explanation:
      "These patterns let components show loading states, placeholders, or alternative UI based on data and user actions. They are part of the core React rendering model.",
    tags: ["jsx", "ui"],
  },
  {
    id: "react-42",
    category: "React",
    topic: "State batching",
    difficulty: "Intermediate",
    question: "What is state batching in React and why does it matter?",
    answer:
      "State batching combines multiple updates into one render cycle to reduce unnecessary work.",
    explanation:
      "This makes UI updates more efficient, but it also means that multiple setState calls in a single event can use the previous state unless you provide a functional update.",
    tags: ["state", "performance"],
  },
  {
    id: "react-43",
    category: "React",
    topic: "Component lifecycle",
    difficulty: "Intermediate",
    question:
      "How do lifecycle methods differ in class components versus function components?",
    answer:
      "Class components use lifecycle methods like componentDidMount and componentWillUnmount, while function components use hooks such as useEffect.",
    explanation:
      "Hooks make lifecycle logic easier to read and share, especially when combining effects with state and context. They also reduce class boilerplate.",
    tags: ["lifecycle", "hooks"],
  },
  {
    id: "react-44",
    category: "React",
    topic: "Portal",
    difficulty: "Advanced",
    question: "What is a React portal and when is it useful?",
    answer:
      "A portal renders a child component into a DOM node outside the parent component tree.",
    explanation:
      "This is helpful for modals, toasts, dropdowns, and other overlays that should visually escape the normal layout flow while staying logically connected to React.",
    tags: ["ui", "dom"],
  },
  {
    id: "react-45",
    category: "React",
    topic: "Immutability",
    difficulty: "Intermediate",
    question: "Why is immutability important in React state management?",
    answer:
      "Immutability allows React to detect changes by comparing references and avoids mutating shared objects unexpectedly.",
    explanation:
      "When state is updated immutably, React can efficiently determine whether a re-render is necessary. This reduces subtle bugs and helps maintain predictable state updates.",
    tags: ["state", "best-practice"],
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
