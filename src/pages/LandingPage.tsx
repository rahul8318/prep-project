import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Code2,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui";

const features = [
  {
    icon: BrainCircuit,
    title: "Adaptive Practice",
    description:
      "Prepare for real interviews with topic-based drills and guided recommendations.",
  },
  {
    icon: Code2,
    title: "Coding & CS Topics",
    description:
      "Cover DSA, OS, DBMS, networking, and frontend domain-specific problem solving.",
  },
  {
    icon: Trophy,
    title: "Mock Interviews",
    description:
      "Simulate recruiter and technical rounds with live scoring and feedback.",
  },
  {
    icon: ShieldCheck,
    title: "Weakness Insights",
    description:
      "Identify your weak areas and follow targeted improvement plans every week.",
  },
];

const stats = [
  { label: "Active learners", value: "24k+" },
  { label: "Interview scores", value: "4.9/5" },
  { label: "Questions solved", value: "180k+" },
  { label: "Success rate", value: "92%" },
];

const technologies = [
  "JavaScript",
  "React",
  "TypeScript",
  "Node.js",
  "DSA",
  "System Design",
  "DBMS",
  "HTML/CSS",
];

const faqs = [
  {
    q: "Does InterviewHub help with both coding and HR prep?",
    a: "Yes. The platform combines technical question banks, quizzes, mock interviews, coding practice, and HR round preparation.",
  },
  {
    q: "Can I track my progress?",
    a: "Absolutely. We record solved questions, quiz scores, streaks, weak topics, and daily challenges in the dashboard.",
  },
  {
    q: "Is it suitable for beginners?",
    a: "Yes. The question bank includes difficulty filters and adaptive recommendations for all levels.",
  },
  {
    q: "Are the answers and explanations included?",
    a: "Each question includes a structured answer and explanation to help users learn from each attempt.",
  },
];

const testimonials = [
  {
    name: "Aisha Khan",
    role: "Frontend Engineer",
    quote:
      "The practice questions and mock interviews gave me the confidence to clear my round at a top startup.",
  },
  {
    name: "Rohit Verma",
    role: "SDE Intern",
    quote:
      "The dashboard and recommendations were incredibly helpful. I knew exactly what to practice next.",
  },
  {
    name: "Priya Nair",
    role: "Full Stack Developer",
    quote:
      "The platform feels premium, and the daily challenge mode kept me consistent for weeks.",
  },
];

export function HomePage({
  theme,
  toggleTheme,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 text-lg font-bold text-white shadow-lg shadow-sky-500/20">
              I
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">InterviewHub</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
            <a
              href="#home"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Home
            </a>
            <a
              href="#features"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#practice"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Practice
            </a>
            <a
              href="#mock"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Mock Interview
            </a>
            <a
              href="#pricing"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium dark:border-slate-700 dark:bg-slate-900"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link
              to="/auth"
              className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:border-sky-300 sm:inline-flex"
            >
              Login
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-500"
            >
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-300">
                  <Sparkles size={16} /> Interview prep for the next big step
                </div>
                <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                  Prepare Smarter. Interview Better.
                </h1>
                <p className="mt-6 max-w-xl text-lg text-slate-600 dark:text-slate-300">
                  InterviewHub helps students and developers sharpen technical
                  and HR interview skills with personalized practice, real-world
                  questions, mock interviews, and progress analytics.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/dashboard">
                    <Button className="gap-2">
                      Start practicing <ArrowRight size={16} />
                    </Button>
                  </Link>
                  <a href="#features">
                    <Button variant="secondary">Explore features</Button>
                  </a>
                </div>
                <div className="mt-10 flex flex-wrap gap-8">
                  {stats.map((item) => (
                    <div key={item.label}>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {item.value}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-8 top-6 h-24 w-24 rounded-full bg-sky-400/20 blur-3xl" />
                <div className="absolute -right-6 bottom-10 h-24 w-24 rounded-full bg-violet-500/20 blur-3xl" />
                <div className="relative rounded-[28px] border border-slate-200 bg-slate-900 p-4 shadow-2xl shadow-slate-900/10 dark:border-slate-700">
                  <div className="rounded-[20px] bg-slate-950 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="h-3 w-3 rounded-full bg-rose-400" />
                        <span className="h-3 w-3 rounded-full bg-amber-400" />
                        <span className="h-3 w-3 rounded-full bg-emerald-400" />
                      </div>
                      <span className="rounded-full bg-sky-500/10 px-2 py-1 text-xs text-sky-300">
                        Live Prep
                      </span>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl bg-slate-800 p-4">
                        <div className="text-sm text-slate-300">
                          Preparation
                        </div>
                        <div className="mt-3 text-3xl font-bold text-white">
                          82%
                        </div>
                        <div className="mt-4 h-2 rounded-full bg-slate-700">
                          <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-sky-500 to-violet-500" />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                          <span>JavaScript</span>
                          <span>85%</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                          <span>React</span>
                          <span>72%</span>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 p-4 text-white">
                        <div className="text-sm text-sky-100">Daily streak</div>
                        <div className="mt-3 text-3xl font-bold">12 days</div>
                        <div className="mt-6 flex items-center gap-2 text-sm">
                          <CheckCircle2 size={16} /> Consistent practice
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl bg-slate-800 p-4">
                      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                        <span>Weak topics</span>
                        <span>Needs Review</span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex items-center justify-between">
                          <span>TypeScript</span>
                          <span>55%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>DSA</span>
                          <span>48%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>React Hooks</span>
                          <span>68%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                Features
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Everything you need to ace your next interview
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-sky-100 p-3 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="practice"
          className="bg-slate-900 px-4 py-20 text-white sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                  How it works
                </p>
                <h2 className="mt-4 text-3xl font-bold">
                  Build your interview confidence in 3 steps
                </h2>
                <div className="mt-8 space-y-6">
                  {[
                    [
                      "01",
                      "Choose your focus area",
                      "Pick React, JavaScript, DSA, DBMS, or HR interview preparation based on your current needs.",
                    ],
                    [
                      "02",
                      "Practice and test yourself",
                      "Answer questions, attempt timed quizzes, and solve coding problems with guided explanations.",
                    ],
                    [
                      "03",
                      "Track improvement",
                      "Review analytics, weak topics, and streak performance to refine your study plan.",
                    ],
                  ].map(([step, title, desc]) => (
                    <div
                      key={step}
                      className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-800/50 p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 font-bold text-sky-300">
                        {step}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="mt-1 text-sm text-slate-300">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] border border-slate-800 bg-slate-800/50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">
                      Technology categories
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">
                      Practice by stack
                    </h3>
                  </div>
                  <div className="rounded-full bg-sky-500/10 px-3 py-1 text-sm text-sky-300">
                    12 tracks
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-900 p-4">
                    <p className="text-sm text-slate-400">Current goal</p>
                    <p className="mt-2 text-xl font-bold">
                      React interview prep
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
                      <CheckCircle2 size={16} /> 7/10 tasks completed
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-900 p-4">
                    <p className="text-sm text-slate-400">Next milestone</p>
                    <p className="mt-2 text-xl font-bold">Mock interview</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-violet-400">
                      <PlayCircle size={16} /> Ready to start
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mock" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                Testimonials
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Learners who got hired with InterviewHub
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((story) => (
                <div
                  key={story.name}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-4 flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-base text-slate-700 dark:text-slate-200">
                    “{story.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-violet-500 text-sm font-bold text-white">
                      {story.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-semibold">{story.name}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {story.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-20 dark:bg-slate-950 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map(({ q, a }, index) => (
                <div
                  key={`${q}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">
                        {q}
                      </p>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                        {a}
                      </p>
                    </div>
                    <ChevronDown className="mt-1 text-slate-400" size={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-gradient-to-r from-sky-600 to-violet-600 p-8 text-white shadow-xl shadow-sky-500/20">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100">
                  Free plan
                </p>
                <h2 className="mt-4 text-3xl font-bold">
                  Start for free. Upgrade when you are ready.
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                  Free forever
                </div>
                <Link to="/auth">
                  <Button
                    variant="secondary"
                    className="bg-white text-slate-900 hover:bg-slate-100"
                  >
                    Try now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-10 dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-violet-500 text-sm font-bold text-white">
                I
              </div>
              <div className="font-bold">InterviewHub</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-300">
            <a href="#features">Features</a>
            <a href="#practice">Practice</a>
            <a href="#mock">Mock Interview</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Users size={16} /> 24k+ users
          </div>
        </div>
      </footer>
    </div>
  );
}
