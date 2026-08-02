
import { 
  faCode, 
  faBook, 
  faBrain, 
  faShieldHalved, 
  faGaugeHigh, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';

export const brandContent = {
  name: 'CodeLens',
  tagline: 'AI-powered code analysis for cleaner, better code.',
};

export const navLinks = [
  { name: 'Home', icon: null },
  { name: 'Review Code', icon: faCode },
  { name: 'Documentation', icon: faBook },
];

export const heroContent = {
  badge: 'V2.4 ENGINE NOW LIVE',
  titlePrefix: 'Elevate Your ',
  titleHighlight: 'Code Quality ',
  titleSuffix: 'with AI',
  description:
    'Automated, intelligent code reviews that catch complex logic bugs and security leaks before they reach production. Seamlessly integrated into your CI/CD pipeline.',
  ctaText: 'Get Started Free',
  ctaIcon: faArrowRight,
  integrationsText: 'INTEGRATES WITH',
};

export const featuresContent = {
  verticalTag: 'FEATURES / 2026',
  heading: 'Beyond basic linting.\nIntelligent context awareness.',
  description:
    "Our LLM-powered engine understands your entire repository's architecture, not just the file you're working on.",
  cards: [
    {
      id: 'logic',
      icon: faBrain,
      accentColor: 'border-emerald-500',
      title: 'Deep Logic Analysis',
      description:
        'Detects race conditions, off-by-one errors, and complex state management issues that manual reviews often miss.',
      badgeText: 'AI-INSIGHT ENGINE',
    },
    {
      id: 'vulnerability',
      icon: faShieldHalved,
      accentColor: 'border-rose-400',
      title: 'Vulnerability Detection',
      description:
        'Identifies OWASP Top 10 vulnerabilities including SQLi, XSS, and hardcoded secrets in real-time as you code.',
      badgeText: 'SECURITY GUARD',
    },
    {
      id: 'performance',
      icon: faGaugeHigh,
      accentColor: 'border-indigo-400',
      title: 'Performance Optimization',
      description:
        'Suggests efficient algorithms and identifies redundant computations to keep your production environment lean.',
      badgeText: 'RUNTIME EFFICIENCY',
    },
  ],
};

export const reviewCodeContent = {
  header: {
    title: "Code",
    titleHighlight: "Lens",
    subtitle: "AI-Powered Code Intelligence & Review",
  },
  buttons: {
    reviewCode: "Review Code",
  },
};

export const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'Review Code' },
      { name: 'History' },
      { name: 'Features' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation' },
      { name: 'About' },
      { name: 'FAQ' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'GitHub' },
      { name: 'LinkedIn' },
      { name: 'Contact' },
    ],
  },
];

export const docSections = [
  {
    category: "Introduction",
    items: [
      {
        id: "overview",
        title: "Overview",
        content:
          "Code Lens is an intelligent tool designed to analyze your source code, identify potential bugs, suggest performance optimizations, and ensure best practices across multiple programming languages.",
        cards: [
          {
            title: "Automated Analysis",
            desc: "Get instant feedback on code quality without waiting for manual peer reviews.",
          },
          {
            title: "Multi-Language",
            desc: "Full support for Python, JavaScript, C/C++, Java, Go, and more.",
          },
        ],
      },
    ],
  },
  {
    category: "Getting Started",
    items: [
      {
        id: "how-to-start",
        title: "How to Start",
        content:
          "Getting started is simple. Open the code reviewer interface, paste your snippet or write code directly into the editor, select your programming language, and click 'Review Code'.",
        codeSnippet: `// Step 1: Write or paste your function\nfunction calculateTotal(items) {\n  return items.reduce((acc, item) => acc + item.price, 0);\n}`,
      },
      {
        id: "select-language",
        title: "Select Language",
        content:
          "Selecting the correct language allows the AI model to apply specific syntax, framework conventions, and linting rules suited for your codebase.",
      },
    ],
  },
  {
    category: "Using Code Reviewer",
    items: [
      {
        id: "write-paste-code",
        title: "Write / Paste Code",
        content:
          "Use the left editor pane to enter your code. You can directly type inside the editor or paste existing scripts from your IDE.",
      },
      {
        id: "review-your-code",
        title: "Review Your Code",
        content:
          "Click the blue 'Review Code' button. The AI engine will parse your abstract syntax tree (AST) and generate structured feedback within seconds.",
      },
      {
        id: "clear-code",
        title: "Clear Code",
        content:
          "Use the 'Clear' button at the top right of the editor to quickly erase all text and reset the interface for a new review session.",
      },
    ],
  },
  {
    category: "Understanding Results",
    items: [
      {
        id: "review-summary",
        title: "Review Summary",
        content:
          "A high-level score and overview of your code's overall health, readability, and security posture.",
      },
      {
        id: "issues",
        title: "Issues",
        content:
          "Highlights potential bugs, security vulnerabilities, edge-case failures, and unhandled errors found in your code.",
      },
      {
        id: "suggestions",
        title: "Suggestions",
        content:
          "Actionable suggestions to improve code structure, clean code practices, modern ES features, and modularization.",
      },
      {
        id: "complexity",
        title: "Complexity",
        content:
          "Provides Time and Space complexity estimations (e.g., O(n log n)) along with suggestions for optimization where applicable.",
      },
    ],
  },
  {
    category: "Tips",
    items: [
      {
        id: "getting-better-reviews",
        title: "Getting Better Reviews",
        content:
          "Provide complete code snippets rather than isolated fragments when possible. Including variable definitions and helper functions gives the AI better context to spot logical bugs.",
      },
      {
        id: "supported-languages",
        title: "Supported Languages",
        content:
          "We currently support C/C++, Java, Python, Javascript, Go, Rust.",
      },
    ],
  },
];

export const faqData = [
  {
    id: "faq-1",
    question: "Is my code stored or used for training AI models?",
    answer:
      "No. Your code is processed in real-time during your session and is neither saved to a database nor used to train public models.",
  },
  {
    id: "faq-2",
    question: "How long does a code review take?",
    answer:
      "Most reviews complete in under 3-5 seconds depending on the length of the code provided.",
  },
  {
    id: "faq-3",
    question: "What is the maximum line limit per review?",
    answer:
      "Currently, you can submit up to 500 lines of code per review request.",
  },
  {
    id: "faq-4",
    question: "Can I use AI Code Reviewer for production code?",
    answer:
      "Yes! While the AI provides comprehensive feedback, we recommend treating it as an automated initial line of defense alongside human peer reviews.",
  },
];

export const loginContent = {
  header: {
    title: "CodeLens AI",
    subtitle: "Intelligent Analysis. Absolute Precision.",
  },
  form: {
    emailLabel: "Identifier / Email",
    emailTag: "REQUIRED",
    emailPlaceholder: "dev@codelens.ai",
    passwordLabel: "Security Key / Password",
    forgotText: "Forgot?",
    passwordPlaceholder: "••••••••",
    submitButtonText: "Sign In",
  },
  dividerText: "Secondary Auth",
  oauth: [
    { id: "github", label: "GitHub" },
    { id: "google", label: "Google" },
  ],
  footerLink: {
    prompt: "New to the environment?",
    text: "Create Account",
    // href: "/signup",
  },
  systemStatus: {
    deployment: "DEPLOYMENT: V4.2.0-STABLE | NODE: US-EAST-INT-01",
    security: "SECURITY PROTOCOL: AES-256 ENABLED",
  },
};

// Existing documentation, FAQ, and login exports remain in this file...

export const signupContent = {
  brand: {
    name: "CodeLens AI",
    tagline: "INTELLIGENCE REFINED",
  },
  testimonial: {
    quote:
      '"The depth of analysis provided by CodeLens is unmatched. It\'s like having a senior architect peering over your shoulder, but without the ego."',
    author: "Marcus Thorne",
    role: "LEAD ENGINEER @ NEXUSFLOW",
    environmentTag: "main/production",
  },
  form: {
    title: "Initiate Environment",
    subtitle: "Configure your identity to access the neural engine.",
    fields: {
      fullName: {
        label: "FULL IDENTITY",
        placeholder: "e.g. Alan Turing",
      },
      email: {
        label: "SECURE EMAIL",
        placeholder: "dev@codelens.ai",
      },
      password: {
        label: "ACCESS KEY",
        placeholder: "••••••••••••",
      },
    },
    terms: {
      prefix: "I acknowledge the",
      serviceLinkText: "Service Protocols",
      middle: "and",
      privacyLinkText: "Data Privacy",
      suffix: "standards.",
    },
    submitButtonText: "Create Account",
    loginLinkText: "Already have an account? Log in",
  },
  footer: {
    systemStatus: "SYSTEM STATUS: NOMINAL",
    links: [
      { label: "Documentation" },
      { label: "API Status" },
    ],
  },
};

export const staticReviewContent = {
  header: {
    title: "CodeLens AI",
    subtitle: "AI-driven comprehensive code review results."
  },
  loadingState: {
    title: "Submit your code to get an AI review.",
    subtitle: "Bugs, security risks, complexity analysis, and improvements will be displayed here."
  },
  sectionTitles: {
    codeLens: "CodeLens AI Overview",
    assessment: "Overall Assessment",
    bugs: "Bugs & Issues",
    complexity: "Complexity Analysis",
    codeQuality: "Code Quality",
    security: "Security Concerns",
    suggestions: "Suggestions for Improvement",
    improvedCode: "Improved Code"
  },
  // Default/Fallback review data if no dynamic review prop is passed
  defaultReview: {
    codeLens: "CodeLens AI scanned the provided snippet across performance, security, and maintainability metrics.",
    assessment: "The code functional flow is straightforward, but it lacks defensive programming patterns, proper error boundaries, and input validation.",
    bugs: [
      "Potential Null Pointer / Undefined reference when handling optional dynamic payloads.",
      "Uncaught promise rejections in async network execution paths."
    ],
    complexity: "Time Complexity: O(N) — Linear traversal.\nSpace Complexity: O(1) — Constant memory allocation.",
    codeQuality: "Naming conventions follow standard JavaScript practices. However, function modularity can be enhanced by extracting nested utility callbacks.",
    security: "Potential sanitization vulnerability: Ensure user inputs are validated before passing them into downstream evaluators or state mutations.",
    suggestions: [
      "Implement structured try/catch handling for all asynchronous operations.",
      "Add strict type checks or JSDoc annotations to increase runtime reliability.",
      "Extract helper logic into isolated pure functions."
    ],
    improvedCode: `// Optimized implementation
const processData = async (input) => {
  if (!input) {
    throw new Error("Invalid input context provided.");
  }

  try {
    const sanitized = String(input).trim();
    return { success: true, data: sanitized };
  } catch (error) {
    console.error("Error processing payload:", error);
    return { success: false, error: error.message };
  }
};`
  }
};
