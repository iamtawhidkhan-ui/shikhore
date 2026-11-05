import type { Lesson } from "../types/learning";

const PATH_ID = "web-development";

export const LESSONS: Lesson[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    id: "how-the-web-works",
    pathId: PATH_ID,
    title: "How the Web Works",
    description: "Follow one page request from your browser to a server and back.",
    estimatedMinutes: 20,
    order: 1,
    objectives: [
      "Describe what happens when you open a web page",
      "Tell the difference between a browser (client) and a server",
      "Explain HTTP requests, responses and common status codes",
      "Read the parts of a URL",
    ],
    content: [
      {
        type: "paragraph",
        text: "Every time you open a website, a quick conversation happens between your device and a computer somewhere else in the world. Understanding that conversation makes everything else in web development easier. In this lesson you will follow one page request from your browser to a server and back.",
      },
      { type: "heading", text: "Clients and servers" },
      {
        type: "paragraph",
        text: "The browser on your device is called the client. It asks for things. A server is a computer that stores a website's files and data and sends them back when asked. Your browser never owns the website; it only requests it and displays what it receives.",
      },
      { type: "heading", text: "The journey of a page request" },
      {
        type: "bulletList",
        items: [
          "1. You type a URL or click a link.",
          "2. The browser asks a DNS service to turn the domain name into an IP address, like looking up a phone number.",
          "3. The browser sends an HTTP request to that address.",
          "4. The server prepares a response and sends it back with a status code and, usually, HTML.",
          "5. The browser reads the HTML, requests any extra files (CSS, JavaScript, images) and draws the page.",
        ],
      },
      { type: "heading", text: "Anatomy of a URL" },
      {
        type: "code",
        language: "text",
        code: "https://shikhore.app/explore?level=beginner#results",
      },
      {
        type: "bulletList",
        items: [
          "https is the protocol: the rules used to talk, with encryption.",
          "shikhore.app is the domain: the name of the server.",
          "/explore is the path: which page or resource you want.",
          "?level=beginner is the query string: extra details for the server.",
          "#results is the fragment: a spot inside the page, handled by the browser.",
        ],
      },
      { type: "heading", text: "HTTP requests and responses" },
      {
        type: "paragraph",
        text: "HTTP is the language browsers and servers use. A request names a method (GET asks for something) and a path. The response begins with a status code that tells you how it went.",
      },
      {
        type: "code",
        language: "http",
        code: "GET /explore HTTP/1.1\nHost: shikhore.app\n\nHTTP/1.1 200 OK\nContent-Type: text/html",
      },
      {
        type: "bulletList",
        items: [
          "200 OK: everything worked.",
          "301 Moved Permanently: the page lives somewhere else now.",
          "404 Not Found: the server could not find what you asked for.",
          "500 Internal Server Error: something broke on the server.",
        ],
      },
      {
        type: "callout",
        title: "Real-world example: ordering at a restaurant",
        text: "You (the browser) tell the waiter (HTTP) what you want. The waiter carries the order to the kitchen (the server), which prepares it and sends it back. If the dish is not on the menu you hear, \"Sorry, we don't have that\", which is exactly what a 404 means.",
      },
      { type: "heading", text: "Key takeaways" },
      {
        type: "bulletList",
        items: [
          "The browser is the client; it requests and displays.",
          "A server stores and sends website files and data.",
          "DNS finds the server; HTTP carries the request and response.",
          "Status codes tell you quickly whether a request succeeded.",
        ],
      },
      { type: "heading", text: "Practical activity" },
      {
        type: "callout",
        title: "Try it yourself",
        text: "Open any website, press F12 and choose the Network tab. Reload the page. Click the first entry, then note its status code, its method and the type of file returned. Count how many extra files the browser had to request.",
      },
    ],
    knowledgeCheck: [
      {
        id: "how-the-web-works-q1",
        question: "In the client-server model, what is the browser's role?",
        options: [
          "It stores the website's files and sends them out",
          "It requests pages and displays the response",
          "It translates domain names into IP addresses",
          "It writes the website's code",
        ],
        correctOptionIndex: 1,
        explanation:
          "The browser is the client: it asks for pages and draws what comes back. Storing and sending files is the server's job, translating names is done by DNS, and developers write the code.",
      },
      {
        id: "how-the-web-works-q2",
        question: "A page request comes back with status code 404. What does that mean?",
        options: [
          "The server crashed",
          "The page was found and delivered",
          "The server could not find what was requested",
          "You must sign in again",
        ],
        correctOptionIndex: 2,
        explanation:
          "404 means Not Found: the server is working but has nothing at that address. A crash would be a 5xx code such as 500, a success is 200, and a sign-in problem is usually 401.",
      },
      {
        id: "how-the-web-works-q3",
        question: "In https://shikhore.app/explore?level=beginner, which part is the query string?",
        options: ["https", "shikhore.app", "/explore", "?level=beginner"],
        correctOptionIndex: 3,
        explanation:
          "The query string starts at the question mark and carries extra details for the server. https is the protocol, shikhore.app is the domain and /explore is the path.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id: "html-structure",
    pathId: PATH_ID,
    title: "HTML: Structuring Content",
    description: "Give your pages a meaningful, accessible structure with semantic HTML.",
    estimatedMinutes: 25,
    order: 2,
    challengeIds: ["personal-profile-page"],
    objectives: [
      "Explain what semantic HTML is and why it matters",
      "Structure a page with header, nav, main, section and footer",
      "Use headings, lists, links and images correctly",
      "Write helpful alt text",
    ],
    content: [
      {
        type: "paragraph",
        text: "HTML describes what your content is, not how it looks. A heading is a heading, a list is a list, a navigation menu is navigation. When the structure is right, browsers, search engines and screen readers can all understand your page.",
      },
      { type: "heading", text: "Elements, tags and attributes" },
      {
        type: "paragraph",
        text: "An element is made of an opening tag, content and a closing tag. Attributes add extra information to the opening tag.",
      },
      {
        type: "code",
        language: "html",
        code: '<a href="https://shikhore.app">Visit Shikhore</a>',
      },
      {
        type: "paragraph",
        text: "Here a is the element, href is an attribute and the text between the tags is the content.",
      },
      { type: "heading", text: "Semantic page structure" },
      {
        type: "paragraph",
        text: "Semantic elements describe their purpose. Prefer them over generic div elements whenever one fits.",
      },
      {
        type: "code",
        language: "html",
        code: '<body>\n  <header>\n    <h1>Alex Morgan</h1>\n    <nav>\n      <a href="#about">About</a>\n      <a href="#projects">Projects</a>\n    </nav>\n  </header>\n  <main>\n    <section id="about">\n      <h2>About me</h2>\n      <p>I am learning web development.</p>\n    </section>\n  </main>\n  <footer>\n    <p>Alex Morgan, 2026</p>\n  </footer>\n</body>',
      },
      { type: "heading", text: "Headings, lists and images" },
      {
        type: "bulletList",
        items: [
          "Use one h1 for the page title, then h2 for sections and h3 for subsections. Do not skip levels to change the size; use CSS for size.",
          "Use ul for unordered lists and ol when order matters.",
          "Write link text that makes sense alone, such as \"Read the guide\" instead of \"Click here\".",
          "Every meaningful image needs alt text that describes it.",
        ],
      },
      {
        type: "code",
        language: "html",
        code: '<img src="alex.jpg" alt="Alex smiling at a laptop" />',
      },
      {
        type: "callout",
        title: "Real-world example: a news site",
        text: "A news site wraps each story in an article element, with a heading and a paragraph inside. A screen reader user can jump from story to story, and a search engine can tell where each story begins and ends. A page built only from div elements gives them nothing to work with.",
      },
      { type: "heading", text: "Key takeaways" },
      {
        type: "bulletList",
        items: [
          "HTML is about meaning and structure, not appearance.",
          "Choose elements by purpose: header, nav, main, section, article, footer.",
          "Keep a clear heading order with a single h1.",
          "Always write useful alt text for meaningful images.",
        ],
      },
      { type: "heading", text: "Practical activity" },
      {
        type: "callout",
        title: "Put it into practice",
        text: "Sketch the sections of your own profile page on paper, then complete the Personal Profile Page challenge to build it with semantic HTML.",
      },
    ],
    knowledgeCheck: [
      {
        id: "html-structure-q1",
        question: "Which element best marks up the main navigation links of a page?",
        options: ['<div class="links">', "<section>", "<nav>", "<span>"],
        correctOptionIndex: 2,
        explanation:
          "nav exists to hold major navigation links, so assistive technology can find it quickly. A div, section or span would work visually but says nothing about purpose.",
      },
      {
        id: "html-structure-q2",
        question: "Why is the alt attribute important on images?",
        options: [
          "It makes the image load faster",
          "It describes the image for screen readers and when the image fails to load",
          "It changes the size of the image",
          "It is required for the image to be visible",
        ],
        correctOptionIndex: 1,
        explanation:
          "Alt text gives a text description of the image to people who cannot see it and shows when the file fails to load. It does not affect speed or size, and images are visible without it.",
      },
      {
        id: "html-structure-q3",
        question: "Which heading structure is best for a page?",
        options: [
          "One h1 for the page title, then h2 for sections and h3 for subsections",
          "Several h1 elements so every heading looks big",
          "An h4 for the title because it looks smaller",
          "No headings; use bold text instead",
        ],
        correctOptionIndex: 0,
        explanation:
          "A single h1 with a logical h2 and h3 hierarchy gives the page a clear outline. Choosing a heading level for its size confuses assistive technology; size belongs in CSS.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id: "css-interfaces",
    pathId: PATH_ID,
    title: "CSS: Designing Interfaces",
    description: "Style pages and build layouts that adapt to any screen size.",
    estimatedMinutes: 30,
    order: 3,
    challengeIds: ["responsive-product-card"],
    objectives: [
      "Write CSS rules with selectors and properties",
      "Explain the box model",
      "Build layouts with Flexbox and Grid",
      "Make a layout responsive with media queries",
    ],
    content: [
      {
        type: "paragraph",
        text: "If HTML is the skeleton of a page, CSS is its appearance: colour, spacing, typography and layout. Good CSS also makes a page work on every screen, from a small phone to a wide monitor.",
      },
      { type: "heading", text: "Selectors and rules" },
      {
        type: "paragraph",
        text: "A CSS rule picks elements with a selector and sets properties inside curly braces.",
      },
      {
        type: "code",
        language: "css",
        code: ".card {\n  background: white;\n  border-radius: 12px;\n  padding: 16px;\n}",
      },
      { type: "heading", text: "The box model" },
      {
        type: "paragraph",
        text: "Every element is a box with four layers: content in the middle, then padding, then the border, and finally margin, which pushes other boxes away. Setting box-sizing to border-box makes width include padding and border, which is far easier to reason about.",
      },
      { type: "code", language: "css", code: "* {\n  box-sizing: border-box;\n}" },
      { type: "heading", text: "Layout with Flexbox" },
      {
        type: "paragraph",
        text: "Flexbox lays children out in a row or column and makes spacing and alignment simple. Grid does the same in two dimensions, rows and columns together.",
      },
      {
        type: "code",
        language: "css",
        code: ".nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}",
      },
      { type: "heading", text: "Responsive design" },
      {
        type: "paragraph",
        text: "Start with the small-screen layout, then use media queries to adjust once there is more room. This is called mobile-first.",
      },
      {
        type: "code",
        language: "css",
        code: ".cards {\n  display: grid;\n  gap: 16px;\n  grid-template-columns: 1fr;\n}\n\n@media (min-width: 768px) {\n  .cards {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}",
      },
      {
        type: "callout",
        title: "Real-world example: an online shop",
        text: "A shop shows products one per row on a phone and three per row on a desktop. The HTML is identical; only the CSS changes the layout at a wider breakpoint. That is why one site can serve every device.",
      },
      { type: "heading", text: "Key takeaways" },
      {
        type: "bulletList",
        items: [
          "CSS rules combine a selector with properties.",
          "Every element is a box: content, padding, border, margin.",
          "Flexbox and Grid handle modern layouts.",
          "Design for small screens first, then enhance with media queries.",
        ],
      },
      { type: "heading", text: "Practical activity" },
      {
        type: "callout",
        title: "Put it into practice",
        text: "Take a plain list of three products and make them stack on a phone and sit side by side on a wide screen. Then complete the Responsive Product Card challenge.",
      },
    ],
    knowledgeCheck: [
      {
        id: "css-interfaces-q1",
        question: "Which part of the box model creates space outside an element's border?",
        options: ["Padding", "Content", "Margin", "Outline"],
        correctOptionIndex: 2,
        explanation:
          "Margin sits outside the border and pushes neighbouring elements away. Padding is the space inside the border around the content.",
      },
      {
        id: "css-interfaces-q2",
        question: "What does display: flex do on a container?",
        options: [
          "It hides the children",
          "It lays the children out in a row or column so they are easy to align and space",
          "It makes the text bold",
          "It turns the container into an image",
        ],
        correctOptionIndex: 1,
        explanation:
          "display: flex turns the container into a flex container, so its children can be arranged and aligned with properties like gap, align-items and justify-content. It does not hide or restyle the content.",
      },
      {
        id: "css-interfaces-q3",
        question: "What does a mobile-first approach mean?",
        options: [
          "Designing for large screens first, then shrinking",
          "Supporting phones only",
          "Using fixed pixel widths so nothing moves",
          "Writing base styles for small screens, then adding media queries for larger ones",
        ],
        correctOptionIndex: 3,
        explanation:
          "Mobile-first starts with the simplest small-screen layout and adds media queries as space grows. It does not mean phones only, and fixed pixel widths make layouts brittle.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id: "javascript-behaviour",
    pathId: PATH_ID,
    title: "JavaScript: Adding Behaviour",
    description: "Make pages interactive with data, functions and events.",
    estimatedMinutes: 35,
    order: 4,
    challengeIds: ["interactive-task-tracker"],
    objectives: [
      "Store data in variables, arrays and objects",
      "Write and call functions",
      "React to user actions with events",
      "Update the page from your data",
    ],
    content: [
      {
        type: "paragraph",
        text: "JavaScript brings a page to life. It reacts when someone clicks, types or scrolls, and it can change what is on screen without reloading the page.",
      },
      { type: "heading", text: "Variables and data" },
      {
        type: "paragraph",
        text: "Use const for values that never change and let for values that will. Arrays hold lists; objects group related details.",
      },
      {
        type: "code",
        language: "javascript",
        code: 'const name = "Alex";\nlet completedLessons = 2;\nconst tasks = [\n  { id: 1, title: "Read the lesson", done: true },\n  { id: 2, title: "Try the challenge", done: false },\n];',
      },
      { type: "heading", text: "Functions" },
      {
        type: "paragraph",
        text: "A function packages a piece of logic so you can reuse it. It takes inputs and returns a result.",
      },
      {
        type: "code",
        language: "javascript",
        code: "function percent(done, total) {\n  return total === 0 ? 0 : Math.round((done / total) * 100);\n}\n\npercent(2, 6); // 33",
      },
      { type: "heading", text: "Events and the DOM" },
      {
        type: "paragraph",
        text: "The DOM is the browser's live model of your page. JavaScript can find elements, listen for events and change them.",
      },
      {
        type: "code",
        language: "javascript",
        code: 'const button = document.querySelector("#add");\nconst list = document.querySelector("#tasks");\n\nbutton.addEventListener("click", () => {\n  const item = document.createElement("li");\n  item.textContent = "New task";\n  list.append(item);\n});',
      },
      { type: "heading", text: "Thinking in state" },
      {
        type: "paragraph",
        text: "Instead of editing the page by hand everywhere, keep your data in one variable (the state), write one function that draws the page from that data, and call it after every change. The page can then never drift away from the data. This idea is the foundation of React.",
      },
      {
        type: "callout",
        title: "Real-world example: a like button",
        text: "A like button keeps a number in memory. When you click, the number goes up and the screen is redrawn to match. The counter, not the screen, is the source of truth.",
      },
      { type: "heading", text: "Key takeaways" },
      {
        type: "bulletList",
        items: [
          "Use const by default and let when a value must change.",
          "Functions make logic reusable.",
          "Events connect user actions to your code.",
          "Keep data in one place and draw the page from it.",
        ],
      },
      { type: "heading", text: "Practical activity" },
      {
        type: "callout",
        title: "Put it into practice",
        text: "Write a function that takes a list of tasks and returns how many are done. Then complete the Interactive Task Tracker challenge.",
      },
    ],
    knowledgeCheck: [
      {
        id: "javascript-behaviour-q1",
        question: "Which keyword should you use for a value that will never be reassigned?",
        options: ["var", "let", "const", "function"],
        correctOptionIndex: 2,
        explanation:
          "const declares a value that cannot be reassigned, which prevents accidental changes. let allows reassignment, var is the older style and function declares a function.",
      },
      {
        id: "javascript-behaviour-q2",
        question: "What does addEventListener(\"click\", handler) do?",
        options: [
          "Runs handler immediately",
          "Runs handler every time the element is clicked",
          "Prevents the element from being clicked",
          "Copies the element",
        ],
        correctOptionIndex: 1,
        explanation:
          "It registers the handler to run each time that event happens. It does not run the handler straight away and it does not block or copy the element.",
      },
      {
        id: "javascript-behaviour-q3",
        question: "Why keep tasks in an array and redraw the list from it, instead of editing the page by hand?",
        options: [
          "The data stays the single source of truth, so the page and the data cannot drift apart",
          "It makes the page load faster",
          "The DOM requires arrays",
          "It removes the need for functions",
        ],
        correctOptionIndex: 0,
        explanation:
          "One source of truth means the screen is always a reflection of the data. It is about correctness and maintainability, not speed, and you still need functions to do the drawing.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    id: "react-components",
    pathId: PATH_ID,
    title: "React: Thinking in Components",
    description: "Build interfaces from small, reusable pieces.",
    estimatedMinutes: 35,
    order: 5,
    objectives: [
      "Explain what a component is and why reuse matters",
      "Write a function component that returns JSX",
      "Pass data into components with props",
      "Keep changing data in state with useState",
    ],
    content: [
      {
        type: "paragraph",
        text: "React lets you build an interface from small, reusable pieces called components. Instead of one long page, you describe your screen as a tree of components, each responsible for one thing.",
      },
      { type: "heading", text: "Components are building blocks" },
      {
        type: "paragraph",
        text: "A component is a function that returns what should appear on screen, written in JSX, which looks like HTML inside JavaScript.",
      },
      {
        type: "code",
        language: "tsx",
        code: "function LessonCard({ title, minutes }: { title: string; minutes: number }) {\n  return (\n    <article className=\"card\">\n      <h3>{title}</h3>\n      <p>{minutes} min</p>\n    </article>\n  );\n}",
      },
      { type: "heading", text: "Props: passing data in" },
      {
        type: "paragraph",
        text: "Props are the inputs of a component. The parent decides what to pass, so one component can appear many times with different content.",
      },
      {
        type: "code",
        language: "tsx",
        code: '<LessonCard title="HTML: Structuring Content" minutes={25} />\n<LessonCard title="CSS: Designing Interfaces" minutes={30} />',
      },
      { type: "heading", text: "State: data that changes" },
      {
        type: "paragraph",
        text: "State is data a component remembers between renders. You never change it directly; you call the setter and React redraws the component with the new value.",
      },
      {
        type: "code",
        language: "tsx",
        code: 'import { useState } from "react";\n\nfunction LikeButton() {\n  const [likes, setLikes] = useState(0);\n\n  return (\n    <button onClick={() => setLikes(likes + 1)}>\n      Likes: {likes}\n    </button>\n  );\n}',
      },
      { type: "heading", text: "Rendering lists" },
      {
        type: "paragraph",
        text: "Use map to turn an array into elements. Give every item a stable key so React can tell items apart when the list changes.",
      },
      {
        type: "code",
        language: "tsx",
        code: "{lessons.map((lesson) => (\n  <LessonCard key={lesson.id} title={lesson.title} minutes={lesson.minutes} />\n))}",
      },
      {
        type: "callout",
        title: "Real-world example: this very app",
        text: "Shikhore reuses the same ProgressBar, Button and Card components on the dashboard, the path page and the lesson page. Fix a bug or restyle a button once and it improves everywhere.",
      },
      { type: "heading", text: "Key takeaways" },
      {
        type: "bulletList",
        items: [
          "A component is a reusable function that returns JSX.",
          "Props pass data from parent to child.",
          "State holds data that changes; update it with the setter.",
          "Lists need a stable key on each item.",
        ],
      },
      { type: "heading", text: "Practical activity" },
      {
        type: "callout",
        title: "Put it into practice",
        text: "Look at your product card from the CSS challenge and decide how you would split it into components, for example ProductCard, Price and AddToCartButton. Write down the props each one needs.",
      },
    ],
    knowledgeCheck: [
      {
        id: "react-components-q1",
        question: "What are props?",
        options: [
          "Data a parent component passes into a child component",
          "Functions that only run on the server",
          "CSS classes",
          "A component's own private, changing data",
        ],
        correctOptionIndex: 0,
        explanation:
          "Props are the inputs a parent gives a component. A component's own changing data is state, which is a different tool.",
      },
      {
        id: "react-components-q2",
        question: "What happens when you call a state setter such as setLikes(likes + 1)?",
        options: [
          "Nothing until you refresh the page",
          "The variable changes but the screen stays the same",
          "React updates the state and redraws the component with the new value",
          "The component is deleted",
        ],
        correctOptionIndex: 2,
        explanation:
          "Calling the setter tells React the data changed, so it re-renders the component with the new value. No page refresh is needed, and editing a plain variable would not redraw anything.",
      },
      {
        id: "react-components-q3",
        question: "Why does each item rendered with map() need a key prop?",
        options: [
          "It sets the item's CSS class",
          "So React can tell items apart and update the list efficiently",
          "It makes the item clickable",
          "Only the first item needs one",
        ],
        correctOptionIndex: 1,
        explanation:
          "Keys give each item a stable identity, so when items are added, removed or reordered React updates the right ones. Keys have nothing to do with styling or clicking, and every item needs one.",
      },
    ],
  },

  /* ------------------------------------------------------------------ 6 */
  {
    id: "working-with-apis",
    pathId: PATH_ID,
    title: "Working with APIs",
    description: "Fetch external data and handle loading and error states.",
    estimatedMinutes: 35,
    order: 6,
    objectives: [
      "Explain what an API is",
      "Fetch JSON data with fetch and async/await",
      "Handle loading, success and error states",
      "Keep secret keys on the server",
    ],
    content: [
      {
        type: "paragraph",
        text: "An API lets one program talk to another. When an app shows weather, maps or an AI answer, it is usually asking another service for that data over HTTP, just like your browser asks for a web page.",
      },
      { type: "heading", text: "What is an API?" },
      {
        type: "paragraph",
        text: "Think of an API as a menu: it lists what you can ask for and what you will get back. Most web APIs reply with JSON, a simple text format for data.",
      },
      {
        type: "code",
        language: "json",
        code: '{\n  "id": 1,\n  "title": "Learn about APIs",\n  "completed": false\n}',
      },
      { type: "heading", text: "Fetching data" },
      {
        type: "paragraph",
        text: "The fetch function sends a request and returns a promise. With async and await the code reads top to bottom. Always check response.ok, because a failed request still returns a response.",
      },
      {
        type: "code",
        language: "javascript",
        code: 'async function loadTodos() {\n  const response = await fetch(\n    "https://jsonplaceholder.typicode.com/todos?_limit=5"\n  );\n  if (!response.ok) {\n    throw new Error("Request failed: " + response.status);\n  }\n  return response.json();\n}',
      },
      { type: "heading", text: "Loading, success and error" },
      {
        type: "paragraph",
        text: "Requests take time and can fail, so a good screen handles three situations: loading, ready and error. Never leave the user staring at a blank page.",
      },
      {
        type: "code",
        language: "tsx",
        code: 'interface Todo {\n  id: number;\n  title: string;\n}\n\nfunction Todos() {\n  const [todos, setTodos] = useState<Todo[]>([]);\n  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");\n\n  useEffect(() => {\n    loadTodos()\n      .then((data) => {\n        setTodos(data);\n        setStatus("ready");\n      })\n      .catch(() => setStatus("error"));\n  }, []);\n\n  if (status === "loading") return <p>Loading...</p>;\n  if (status === "error") return <p>Something went wrong. Please try again.</p>;\n  return (\n    <ul>\n      {todos.map((todo) => (\n        <li key={todo.id}>{todo.title}</li>\n      ))}\n    </ul>\n  );\n}',
      },
      {
        type: "callout",
        title: "Real-world example: keeping keys secret",
        text: "Usha, Shikhore's AI companion, does not call the AI provider from your browser. The browser calls Shikhore's own server endpoint, and only that server holds the secret key. Anything placed in browser code can be read by anyone, so secrets must stay on the server.",
      },
      { type: "heading", text: "Key takeaways" },
      {
        type: "bulletList",
        items: [
          "An API is a set of requests a program can make to get or send data.",
          "Use fetch with async/await and check response.ok.",
          "Handle loading, ready and error states.",
          "Never put secret keys in frontend code.",
        ],
      },
      { type: "heading", text: "Practical activity" },
      {
        type: "callout",
        title: "Put it into practice",
        text: "Fetch five items from a public API and display them with a loading message and an error message. This is a key part of the final Personal Learning Dashboard project.",
      },
    ],
    knowledgeCheck: [
      {
        id: "working-with-apis-q1",
        question: "What does response.ok tell you after calling fetch?",
        options: [
          "Whether the data is valid JSON",
          "Whether the user is signed in",
          "Whether the server is nearby",
          "Whether the response status was successful (200 to 299)",
        ],
        correctOptionIndex: 3,
        explanation:
          "response.ok is true for status codes from 200 to 299. fetch does not throw on a 404 or 500, so checking it is how you notice a failed request. It says nothing about JSON validity or the user.",
      },
      {
        id: "working-with-apis-q2",
        question: "Why should a page show a loading state while fetching?",
        options: [
          "Because fetch is instant",
          "So people know something is happening instead of seeing a blank or broken page",
          "Because the browser requires it",
          "To hide errors",
        ],
        correctOptionIndex: 1,
        explanation:
          "Network requests take time, and feedback tells people the app is working. fetch is not instant, nothing forces a loading state, and hiding errors would make problems harder to fix.",
      },
      {
        id: "working-with-apis-q3",
        question: "Where should a secret API key be kept?",
        options: [
          "In frontend JavaScript so it is easy to reach",
          "In a public GitHub file",
          "On a server, for example in an environment variable, never in browser code",
          "In an HTML comment",
        ],
        correctOptionIndex: 2,
        explanation:
          "Anything sent to the browser or committed publicly can be copied by anyone. A server-side environment variable keeps the key private, which is why Shikhore calls Usha through its own endpoint.",
      },
    ],
  },
];

export function getLessonById(lessonId: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === lessonId);
}

/** Lessons of one path, in learning order. */
export function getLessonsForPath(pathId: string): Lesson[] {
  return LESSONS.filter((lesson) => lesson.pathId === pathId).sort(
    (a, b) => a.order - b.order
  );
}

export function getAdjacentLessons(lessonId: string): {
  previous?: Lesson;
  next?: Lesson;
} {
  const lesson = getLessonById(lessonId);
  if (!lesson) return {};
  const siblings = getLessonsForPath(lesson.pathId);
  const index = siblings.findIndex((item) => item.id === lessonId);
  return { previous: siblings[index - 1], next: siblings[index + 1] };
}
