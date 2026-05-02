import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  FaArrowRight,
  FaAws,
  FaCode,
  FaCubes,
  FaDatabase,
  FaDocker,
  FaExternalLinkAlt,
  FaFacebook,
  FaGithub,
  FaHeart,
  FaLaravel,
  FaMoon,
  FaPhone,
  FaReact,
  FaRocket,
  FaServer,
  FaSun,
  FaTools,
} from "react-icons/fa";

const ChatBot = lazy(() => import("./components/chatbot"));

type Language = "en" | "my";
type LocalizedText = Record<Language, string>;

const localized = (en: string, my: string): LocalizedText => ({ en, my });

const readPreference = (key: string) => {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writePreference = (key: string, value: string) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, value);
  } catch {
    return;
  }
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return false;

  const savedTheme = readPreference("portfolio-theme");
  if (savedTheme === "dark") return true;
  if (savedTheme === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";

  const savedLanguage = readPreference("portfolio-language");
  return savedLanguage === "my" ? "my" : "en";
};

const stats = [
  { value: "2", label: localized("Independent production systems shipped", "ကိုယ်တိုင်တည်ဆောက်ထားသော production systems ၂ ခု") },
  { value: "3+", label: localized("Other production workflows delivered", "အခြား production workflows ၃ ခုအထက်") },
  { value: "4+", label: localized("Software products maintained", "Maintenance လုပ်ထားသော software ၄ ခုအထက်") },
];

const heroVisualTags = [
  {
    label: localized("React UI", "React UI"),
    icon: <FaReact />,
    orbitSize: "86%",
    mobileVisible: true,
    duration: 18,
    delay: "-2s",
  },
  {
    label: localized("Laravel API", "Laravel API"),
    icon: <FaLaravel />,
    orbitSize: "86%",
    mobileVisible: true,
    duration: 18,
    delay: "-8s",
  },
  {
    label: localized("AWS Deploy", "AWS Deploy"),
    icon: <FaAws />,
    orbitSize: "86%",
    mobileVisible: true,
    duration: 18,
    delay: "-14s",
  },
  {
    label: localized("Docker", "Docker"),
    icon: <FaDocker />,
    orbitSize: "86%",
    mobileVisible: true,
    duration: 18,
    delay: "-20s",
  },
  {
    label: localized("Kubernetes", "Kubernetes"),
    icon: <FaCubes />,
    orbitSize: "64%",
    mobileVisible: true,
    duration: 13,
    delay: "-4s",
  },
  {
    label: localized("CI/CD Pipeline", "CI/CD Pipeline"),
    icon: <FaServer />,
    orbitSize: "64%",
    mobileVisible: true,
    duration: 13,
    delay: "-10s",
  },
];

const projects = [
  {
    title: localized("Hospital Information Management System (HIMS)", "Hospital Information Management System (HIMS)"),
    domain: localized("Healthcare Operations", "ကျန်းမာရေး လုပ်ငန်းစဉ်"),
    description: localized(
      "A web-based hospital operations platform that brings patient registration, appointments, triage, consultation, pharmacy, billing, rooms, and multi-hospital administration into one secure workflow.",
      "လူနာမှတ်ပုံတင်ခြင်း၊ appointment, triage, consultation, pharmacy, billing, room management နဲ့ multi-hospital administration ကို secure workflow တစ်ခုထဲမှာ စုစည်းပေးတဲ့ web-based hospital operations platform ဖြစ်ပါတယ်။",
    ),
    highlights: [
      localized("Built the core hospital journey from registration and appointments to nurse triage, doctor consultation, pharmacy, billing, rooms, wards, and inpatient operations", "registration, appointment, nurse triage, doctor consultation, pharmacy, billing, rooms, wards နဲ့ inpatient operations အထိ hospital workflow အဓိကပိုင်းတွေကို တည်ဆောက်ထားပါတယ်"),
      localized("Added multi-hospital support with super admin, hospital admin, and role-based access for staff", "super admin, hospital admin နဲ့ staff role-based access ပါဝင်တဲ့ multi-hospital support ကို ထည့်သွင်းထားပါတယ်"),
      localized("Designed database relationships for patients, visits, prescriptions, payments, rooms, wards, and hospital branches", "patients, visits, prescriptions, payments, rooms, wards နဲ့ hospital branches အတွက် database relationships ကို စနစ်တကျ design လုပ်ထားပါတယ်"),
      localized("Focused on practical clinical and operational use cases instead of a demo-only feature set", "demo feature တွေတင်မဟုတ်ဘဲ တကယ့် clinical နဲ့ operational use case တွေအတွက် အသုံးချနိုင်အောင် focus လုပ်ထားပါတယ်"),
    ],
    stack: ["Laravel 12", "PHP", "Blade", "Bootstrap 5", "MySQL", "Vite"],
  },
  {
    title: localized("Service Desk Ticket System", "Service Desk Ticket System"),
    domain: localized("Service Desk Operations", "Service Desk လုပ်ငန်းစဉ်"),
    description: localized(
      "A Laravel-based service desk platform for handling support tickets, projects, users, public request forms, configurable workflows, and client communication from one secure workspace.",
      "support tickets, projects, users, public request forms, configurable workflows နဲ့ client communication ကို secure workspace တစ်ခုထဲမှာ စီမံနိုင်တဲ့ Laravel-based service desk platform ဖြစ်ပါတယ်။",
    ),
    highlights: [
      localized("Implemented role-based access for admins, project managers, clients, internal staff, and third-party providers", "admins, project managers, clients, internal staff နဲ့ third-party providers အတွက် role-based access ကို တည်ဆောက်ထားပါတယ်"),
      localized("Built one-time public submission links, read-only public tracking, attachments, advanced filters, and project-based ticket visibility", "one-time public submission links, read-only public tracking, attachments, advanced filters နဲ့ project-based ticket visibility ကို ထည့်သွင်းထားပါတယ်"),
      localized("Added project chat, general chat approval, unread counts, read sync, and configurable ticket settings", "project chat, general chat approval, unread counts, read sync နဲ့ configurable ticket settings ကို ထည့်သွင်းထားပါတယ်"),
      localized("Covered important workflows with automated tests: 45 tests passed with 272 assertions", "အရေးကြီး workflow များအတွက် automated tests ထည့်ထားပြီး 45 tests passed, 272 assertions ရရှိထားပါတယ်"),
    ],
    stack: ["Laravel 12", "PHP 8.4", "Blade", "Tailwind CSS", "JavaScript", "SQLite", "PHPUnit", "Vite"],
  },
];

const earlyProjects = [
  {
    title: localized("QR Code Digital Menu System", "QR Code Digital Menu System"),
    image: "/logos/digital_menu.jpg",
    imageWebp: "/logos/digital_menu.webp",
    imageWidth: 900,
    imageHeight: 571,
    description: localized(
      "A contactless restaurant menu project for browsing items through QR codes and practicing menu management workflows.",
      "QR code ဖြင့် restaurant menu items များကို ကြည့်နိုင်အောင် တည်ဆောက်ထားတဲ့ contactless menu project ဖြစ်ပြီး menu management workflow ကို လေ့ကျင့်ထားပါတယ်။",
    ),
    stack: ["Laravel 10", "Filament", "Livewire", "MySQL", "AWS", "EC2"],
    link: "https://github.com/KyawMgMgThu/DIgital_menu",
  },
  {
    title: localized("Personal Portfolio", "Personal Portfolio"),
    image: "/logos/portfolio.png",
    imageWebp: "/logos/portfolio.webp",
    imageWidth: 900,
    imageHeight: 429,
    description: localized(
      "An early portfolio build focused on responsive layout, motion, and clear project presentation while practicing React.",
      "React ကို လေ့ကျင့်စဉ် responsive layout, motion နဲ့ project presentation ကို focus လုပ်ထားတဲ့ early portfolio build ဖြစ်ပါတယ်။",
    ),
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/KyawMgMgThu/kyawmgmgthu-portfolio",
  },
  {
    title: localized("Kid's Learning Website", "Kid's Learning Website"),
    image: "/logos/kid-learning.png",
    imageWebp: "/logos/kid-learning.webp",
    imageWidth: 900,
    imageHeight: 428,
    description: localized(
      "An interactive learning website for children with drawing, speech tools, games, animations, and simple learning flows.",
      "ကလေးများအတွက် drawing, speech tools, games, animations နဲ့ simple learning flows ပါဝင်တဲ့ interactive learning website ဖြစ်ပါတယ်။",
    ),
    stack: ["React", "Bootstrap", "React-Speech", "MUI", "Canvas", "React Router"],
    link: "https://github.com/KyawMgMgThu/KG_Learning_website",
  },
  {
    title: localized("Kyaw Gyi POS System", "Kyaw Gyi POS System"),
    image: "/logos/pos.jpg",
    imageWebp: "/logos/pos.webp",
    imageWidth: 900,
    imageHeight: 418,
    description: localized(
      "A junior-stage POS system for practicing inventory, sales reports, receipts, PDF export, and Laravel plus React integration.",
      "inventory, sales reports, receipts, PDF export နဲ့ Laravel + React integration ကို လေ့ကျင့်ဖို့ တည်ဆောက်ထားတဲ့ junior-stage POS system ဖြစ်ပါတယ်။",
    ),
    stack: ["Laravel 10", "React", "Vite", "Bootstrap 5", "SweetAlert2", "Axios"],
    link: "https://github.com/KyawMgMgThu/pos_system",
  },
];

const techStack = [
  {
    category: localized("Frontend", "Frontend"),
    icon: <FaReact />,
    items: [localized("React", "React"), localized("Tailwind CSS", "Tailwind CSS"), localized("TypeScript", "TypeScript"), localized("Responsive UI", "Responsive UI"), localized("Framer Motion", "Framer Motion")],
  },
  {
    category: localized("Backend", "Backend"),
    icon: <FaLaravel />,
    items: [localized("Laravel", "Laravel"), localized("PHP", "PHP"), localized("REST APIs", "REST APIs"), localized("MySQL", "MySQL"), localized("Authentication", "Authentication")],
  },
  {
    category: localized("DevOps", "DevOps"),
    icon: <FaServer />,
    items: [localized("AWS", "AWS"), localized("Docker", "Docker"), localized("EC2", "EC2"), localized("Domain & Hosting", "Domain & Hosting"), localized("Production Deployments", "Production Deployments")],
  },
  {
    category: localized("Tools", "Tools"),
    icon: <FaTools />,
    items: [localized("Git", "Git"), localized("GitHub", "GitHub"), localized("Vite", "Vite"), localized("NPM", "NPM"), localized("Linux Basics", "Linux Basics")],
  },
];

const stackOrbitItems = [
  { label: "React", icon: <FaReact />, angle: -90 },
  { label: "TypeScript", icon: <FaCode />, angle: -30 },
  { label: "Laravel", icon: <FaLaravel />, angle: 30 },
  { label: "MySQL", icon: <FaDatabase />, angle: 90 },
  { label: "Docker", icon: <FaDocker />, angle: 150 },
  { label: "AWS", icon: <FaAws />, angle: 210 },
];

const services = [
  {
    title: localized("Build Business Web Systems", "Business web systems တည်ဆောက်ခြင်း"),
    description: localized(
      "Turn business requirements into usable web systems with user flows, admin tools, backend logic, and production release support.",
      "business requirements များကို user flows, admin tools, backend logic နဲ့ production release support ပါဝင်တဲ့ အသုံးပြုနိုင်သော web system အဖြစ် တည်ဆောက်ပေးနိုင်ပါတယ်။",
    ),
    icon: <FaRocket />,
  },
  {
    title: localized("Modernize Existing Websites", "ရှိပြီးသား website များကို ခေတ်မီအောင် ပြောင်းခြင်း"),
    description: localized(
      "Improve existing websites with faster pages, responsive layouts, clearer UI, and maintainable component structure.",
      "ရှိပြီးသား website များကို ပိုမြန်သော pages, responsive layouts, ပိုရှင်းလင်းသော UI နဲ့ maintainable component structure ဖြင့် ပြန်လည်ပြင်ဆင်ပေးနိုင်ပါတယ်။",
    ),
    icon: <FaReact />,
  },
  {
    title: localized("Laravel Backend Development", "Laravel backend development"),
    description: localized(
      "Build Laravel backends with clear data models, API design, authentication, admin workflows, and business rules.",
      "clear data models, API design, authentication, admin workflows နဲ့ business rules ပါဝင်တဲ့ Laravel backend များကို တည်ဆောက်ပေးနိုင်ပါတယ်။",
    ),
    icon: <FaLaravel />,
  },
  {
    title: localized("Deployment & Hosting", "Deployment & Hosting"),
    description: localized(
      "Move projects from local development to production with AWS, Docker, domains, hosting, and release support.",
      "AWS, Docker, domains, hosting နဲ့ release support အသုံးပြုပြီး local development ကနေ production အထိ တင်ပေးနိုင်ပါတယ်။",
    ),
    icon: <FaAws />,
  },
];

const App = () => {
  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const stackRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [chatBotReady, setChatBotReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.lang = language === "my" ? "my" : "en";
  }, [language]);

  useEffect(() => {
    writePreference("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    writePreference("portfolio-language", language);
  }, [language]);

  useEffect(() => {
    const timer = window.setTimeout(() => setChatBotReady(true), 800);
    return () => window.clearTimeout(timer);
  }, []);

  const t = useCallback((value: LocalizedText) => value[language], [language]);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
    }),
  };

  const navItems = useMemo(
    () => [
      { name: t(localized("Home", "မူလ")), ref: homeRef, id: "home" },
      { name: t(localized("Projects", "Project များ")), ref: projectsRef, id: "projects" },
      { name: t(localized("About", "အကြောင်းအရာ")), ref: aboutRef, id: "about" },
      { name: t(localized("Stack", "နည်းပညာများ")), ref: stackRef, id: "stack" },
      { name: t(localized("Services", "ဝန်ဆောင်မှုများ")), ref: servicesRef, id: "services" },
      { name: t(localized("Contact", "ဆက်သွယ်ရန်")), ref: contactRef, id: "contact" },
    ],
    [t],
  );

  useEffect(() => {
    const sections = navItems.flatMap((item) => {
      const element = item.ref.current;
      return element ? [{ ...item, element }] : [];
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const section = sections.find((item) => item.element === visibleEntry?.target);
        if (section) setActiveSection(section.id);
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section.element));
    return () => observer.disconnect();
  }, [navItems]);

  const scrollToSection = useCallback((sectionRef: RefObject<HTMLElement | null>) => {
    if (!sectionRef.current) return;
    setMobileMenuOpen(false);
    window.scrollTo({
      top: sectionRef.current.offsetTop - 76,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }, [shouldReduceMotion]);

  return (
    <div lang={language === "my" ? "my" : "en"} className={`min-h-screen overflow-x-hidden bg-light-bg ${language === "my" ? "font-mm" : "font-woff"} ${isDark ? "theme-dark" : ""}`}>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        aria-label="Main navigation"
        className="fixed inset-x-0 top-0 z-50 border-b border-light-font/10 bg-light-bg/90 px-4 py-4 backdrop-blur-xl sm:px-5 md:px-10 lg:px-16"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <button
            onClick={() => scrollToSection(homeRef)}
            aria-label="Go to home section"
            className="min-w-0 max-w-[9rem] truncate text-left text-base font-bold tracking-tight text-light-font sm:max-w-none"
          >
            Kyaw Mg Mg Thu
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.ref)}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeSection === item.id
                      ? "bg-light-font text-light-bg"
                      : "text-light-font/70 hover:bg-light-font/5 hover:text-light-font"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="mailto:mthu35997@gmail.com"
              className="hidden rounded-full bg-light-teal px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-light-teal/20 transition hover:bg-light-teal-light md:inline-flex"
            >
              {t(localized("Hire Me", "အလုပ်အပ်ရန်"))}
            </a>
            <button
              onClick={() => setLanguage((prev) => (prev === "en" ? "my" : "en"))}
              className="inline-flex h-10 min-w-12 items-center justify-center rounded-full border border-light-font/10 px-3 text-xs font-bold text-light-font transition hover:border-light-teal hover:text-light-teal"
              aria-label={language === "en" ? "Switch to Myanmar language" : "Switch to English language"}
            >
              <span className="hidden sm:inline">{language === "en" ? "EN / မြန်မာ" : "မြန်မာ / EN"}</span>
              <span className="sm:hidden">{language === "en" ? "MY" : "EN"}</span>
            </button>
            <button
              onClick={() => setIsDark((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-light-font/10 text-light-font transition hover:border-light-teal hover:text-light-teal"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-light-font/10 text-light-font lg:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-controls="mobile-navigation"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="h-0.5 w-5 bg-current shadow-[0_6px_0_current,0_-6px_0_current]" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            id="mobile-navigation"
            className="fixed inset-x-0 top-[73px] z-40 border-b border-light-font/10 bg-light-bg/95 px-5 py-5 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.ref)}
                    aria-current={activeSection === item.id ? "page" : undefined}
                    className={`w-full rounded-lg px-4 py-3 text-left text-base font-medium transition ${
                      activeSection === item.id
                        ? "bg-light-font text-light-bg"
                        : "text-light-font/75 hover:bg-light-font/5"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section ref={homeRef} className="section-shell pt-28 md:pt-40">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="order-2 max-w-2xl lg:order-1"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-light-font/10 bg-white/70 px-4 py-2 text-sm font-semibold text-light-font/75 shadow-sm theme-surface">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {t(localized("Independent full-stack developer for production systems", "Production systems များအတွက် independent full-stack developer"))}
              </div>
              <h1
                className={`max-w-3xl font-extrabold tracking-tight text-light-font ${
                  language === "my"
                    ? "text-[1.75rem] leading-[1.38] sm:text-[2.05rem] md:text-[2.45rem] lg:text-[2.85rem]"
                    : "text-3xl leading-tight md:text-4xl lg:text-5xl"
                }`}
              >
                {t(localized("Build production-ready web systems, end to end.", "Production-ready web systems ကို အစအဆုံး တည်ဆောက်ပေးပါတယ်။"))}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-light-font/70 md:text-lg">
                {t(localized(
                  "From React interfaces to Laravel backends and AWS/Docker deployment, I turn business workflows into reliable systems that can run in production.",
                  "React interface, Laravel backend, AWS/Docker deployment အထိ business workflows များကို production တွင် အသုံးပြုနိုင်သော reliable systems အဖြစ် ပြောင်းပေးနိုင်ပါတယ်။",
                ))}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:mthu35997@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-light-font px-6 py-3 text-sm font-bold text-light-bg transition hover:translate-y-[-1px] hover:shadow-lg"
                >
                  {t(localized("Discuss Your Project", "Project အကြောင်း ဆွေးနွေးရန်"))} <FaArrowRight className="text-xs" />
                </a>
                <button
                  onClick={() => scrollToSection(projectsRef)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-light-font/15 px-6 py-3 text-sm font-bold text-light-font transition hover:border-light-teal hover:text-light-teal"
                >
                  {t(localized("View Case Studies", "Case studies ကြည့်ရန်"))}
                </button>
              </div>
              <p className="mt-4 text-sm font-medium text-light-font/55">
                {t(localized("Usually replies within 24 hours.", "ပုံမှန်အားဖြင့် ၂၄ နာရီအတွင်း ပြန်ကြားပေးပါတယ်။"))}
              </p>
              <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <div key={`${stat.value}-${index}`} className="rounded-lg border border-light-font/10 bg-white/65 p-4 theme-surface">
                    <p className="text-lg font-extrabold text-light-font">{stat.value}</p>
                    <p className="mt-1 text-sm leading-5 text-light-font/60">{t(stat.label)}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="order-1 relative mx-auto w-full max-w-xl lg:order-2 lg:max-w-none"
            >
              <div className="hero-visual relative min-h-[390px] overflow-hidden rounded-[1.75rem] border border-light-font/10 bg-white/75 p-4 shadow-2xl shadow-slate-950/10 theme-surface sm:min-h-[500px] md:p-6">
                <div className="hero-grid absolute inset-0" />
                <div className="hero-photo-badge absolute left-4 top-4 z-30 flex items-center gap-3 rounded-xl border border-light-font/10 bg-light-bg/90 p-2 pr-3 text-light-font shadow-lg shadow-slate-950/10 backdrop-blur-md sm:left-5 sm:top-5">
                  <picture className="shrink-0">
                    <source srcSet="/me.webp" type="image/webp" />
                    <img
                      src="/me.jpg"
                      alt="Kyaw Mg Mg Thu"
                      width="320"
                      height="320"
                      decoding="async"
                      className="h-12 w-12 rounded-full border border-light-font/10 object-cover sm:h-14 sm:w-14"
                    />
                  </picture>
                  <div className="hidden sm:block">
                    <p className="text-sm font-extrabold leading-tight">Kyaw Mg Mg Thu</p>
                    <p className="mt-1 text-xs font-semibold text-light-font/55">{t(localized("Full-stack developer", "Full-stack developer"))}</p>
                  </div>
                </div>
                <motion.div
                  className="hero-aura absolute left-1/2 top-1/2 h-[62%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1], opacity: [0.65, 0.9, 0.65] }}
                  transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="hero-ring absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                  transition={shouldReduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
                />
                <motion.picture
                  className="hero-figure absolute left-1/2 top-1/2 z-10 block w-[78%] max-w-[34rem] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_26px_50px_rgba(15,23,42,0.18)]"
                  animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
                  transition={shouldReduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <source srcSet="/hero-meditation-muscle.webp" type="image/webp" />
                  <img
                    src="/hero-meditation-muscle.png"
                    alt="Kyaw Mg Mg Thu meditating developer illustration"
                    width="1100"
                    height="825"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="block w-full object-contain"
                  />
                </motion.picture>
                {heroVisualTags.map((tag) => (
                  <div
                    key={t(tag.label)}
                    className={`hero-orbit pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 ${
                      tag.mobileVisible ? "block" : "hidden sm:block"
                    }`}
                    style={
                      {
                        "--orbit-size": tag.orbitSize,
                        "--orbit-duration": `${tag.duration}s`,
                        "--orbit-delay": tag.delay,
                      } as CSSProperties
                    }
                  >
                    <div className="hero-orbit-rail" />
                    <div className={`hero-orbit-spin ${shouldReduceMotion ? "" : "is-animated"}`}>
                      <div className={`hero-orbit-badge-wrap ${shouldReduceMotion ? "" : "is-animated"}`}>
                        <div className="hero-tech-tag inline-flex items-center gap-2 rounded-full border border-light-font/10 bg-light-bg/88 px-3 py-2 text-xs font-bold text-light-font shadow-lg shadow-slate-950/10 backdrop-blur-md">
                          <span className="text-light-teal">{tag.icon}</span>
                          <span className="hero-tech-label">{t(tag.label)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <motion.div
                  className="absolute bottom-5 left-5 z-20 rounded-xl border border-light-font/10 bg-light-bg/86 p-4 text-light-font shadow-lg shadow-slate-950/10 backdrop-blur-md"
                  animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
                  transition={shouldReduceMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-light-teal">{t(localized("Available", "လက်ခံနေသည်"))}</p>
                  <p className="mt-1 text-sm font-extrabold">{t(localized("Full product delivery", "Product တစ်ခုလုံး တည်ဆောက်ပေးနိုင်"))}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-light-font/55">
                    <FaDatabase className="text-amber-500" />
                    UI + API + DevOps
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={projectsRef} className="section-shell border-y border-light-font/10 bg-white/45 theme-band">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <p className="section-kicker">{t(localized("Featured Projects", "အဓိက Projects"))}</p>
              <h2 className="section-title">{t(localized("Selected systems shipped for real workflows.", "တကယ့် workflow များအတွက် တည်ဆောက်ပြီးသော selected systems များ"))}</h2>
              <p className="section-subtitle">
                {t(localized(
                  "Client-facing proof of end-to-end delivery: planning, implementation, deployment, and ongoing operational support.",
                  "Client များမြင်သာအောင် planning, implementation, deployment နဲ့ ongoing operational support အထိ end-to-end delivery ကို ဖော်ပြထားပါတယ်။",
                ))}
              </p>
            </motion.div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={`${index}-${t(project.title)}`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="overflow-hidden rounded-xl border border-light-font/10 bg-light-bg shadow-sm transition theme-surface"
                >
                  <div className="min-h-[14.5rem] bg-light-font p-4 text-light-bg sm:aspect-[16/9] sm:p-5">
                    <div className="flex h-full min-h-[12.5rem] flex-col justify-between gap-4 rounded-lg border border-light-bg/12 bg-light-bg/5 p-4 sm:min-h-0 sm:p-5">
                      <div>
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-light-bg/55 sm:text-xs">{t(project.domain)}</p>
                        <p className="mt-3 max-w-sm text-lg font-extrabold tracking-tight sm:text-xl md:text-2xl">{t(project.title)}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {[localized("Frontend", "Frontend"), localized("Backend", "Backend"), localized("Deploy", "Deploy")].map((item) => (
                          <div key={item.en} className="min-w-0 rounded-md border border-light-bg/12 bg-light-bg/8 px-2 py-2 sm:px-3">
                            <p className="truncate text-[0.68rem] font-semibold text-light-bg/70 sm:text-xs">{t(item)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 md:p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                        {t(localized("Built independently", "ကိုယ်တိုင်တည်ဆောက်ထားသည်"))}
                      </span>
                      <span className="rounded-full bg-light-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-light-teal">
                        {t(localized("Production system", "Production system"))}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight text-light-font">{t(project.title)}</h3>
                    <p className="mt-4 text-base leading-7 text-light-font/70">{t(project.description)}</p>

                    <div className="mt-6">
                      <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-light-font/45">{t(localized("Key Highlights", "အဓိကအချက်များ"))}</h4>
                      <ul className="mt-3 space-y-3">
                        {project.highlights.map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="flex gap-3 text-sm leading-6 text-light-font/75">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-light-teal" />
                            <span>{t(highlight)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-md border border-light-font/10 px-3 py-1.5 text-xs font-semibold text-light-font/70">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-20 border-t border-light-font/10 pt-12"
            >
              <p className="section-kicker">{t(localized("Early Projects", "အစောပိုင်း Projects"))}</p>
              <h3 className="mt-3 max-w-3xl text-xl font-extrabold tracking-tight text-light-font md:text-3xl">
                {t(localized("Earlier practice projects kept as growth proof.", "ကြီးထွားလာမှုကို မြင်နိုင်စေရန် သိမ်းထားသော အစောပိုင်း practice projects များ"))}
              </h3>
              <p className="section-subtitle">
                {t(localized(
                  "These projects show my learning path and technical range. Current production systems are shown first so clients and teams can quickly understand my present level.",
                  "ဒီ projects များက learning path နဲ့ technical range ကို ပြသပါတယ်။ Clients နဲ့ teams များအတွက် လက်ရှိအဆင့်ကို အမြန်နားလည်စေရန် production systems များကို အရင်ဖော်ပြထားပါတယ်။",
                ))}
              </p>
            </motion.div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {earlyProjects.map((project, index) => (
                <motion.article
                  key={t(project.title)}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-light-font/10 bg-light-bg shadow-sm theme-surface"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-light-font/5">
                    <picture className="block h-full w-full">
                      <source srcSet={project.imageWebp} type="image/webp" />
                      <img
                        src={project.image}
                        alt={t(project.title)}
                        width={project.imageWidth}
                        height={project.imageHeight}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </picture>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-3 w-fit rounded-full bg-light-teal/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-light-teal">
                      {t(localized("Practice Project", "Practice Project"))}
                    </span>
                    <h4 className="text-lg font-extrabold tracking-tight text-light-font">{t(project.title)}</h4>
                    <p className="mt-3 text-sm leading-6 text-light-font/70">{t(project.description)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span key={item} className="rounded-md border border-light-font/10 px-2.5 py-1 text-[0.7rem] font-semibold text-light-font/65">
                          {item}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-light-teal hover:text-light-teal-light"
                    >
                      {t(localized("View Code", "Code ကြည့်ရန်"))} <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section ref={aboutRef} className="section-shell">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="section-kicker">{t(localized("About", "အကြောင်း"))}</p>
              <h2 className="section-title">{t(localized("Full-stack delivery with production responsibility.", "Production responsibility ပါဝင်တဲ့ full-stack delivery"))}</h2>
            </motion.div>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-base leading-8 text-light-font/75 md:text-lg">
                {t(localized(
                  "I independently build and support complete web products across frontend, backend, database, and infrastructure. My current proof includes 2 independent production systems shipped, 3+ other production workflows delivered, and 4+ software products maintained.",
                  "Frontend, backend, database နဲ့ infrastructure အထိ complete web products များကို ကိုယ်တိုင်တည်ဆောက်ပြီး support လုပ်နိုင်ပါတယ်။ လက်ရှိ proof အဖြစ် production systems ၂ ခုကို ကိုယ်တိုင် ship လုပ်ထားပြီး အခြား production workflows ၃ ခုအထက် deliver လုပ်ထားကာ software ၄ ခုအထက် maintenance လုပ်ထားပါတယ်။",
                ))}
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  localized("2 production systems shipped independently", "Production systems ၂ ခုကို ကိုယ်တိုင် shipped"),
                  localized("3+ other production workflows delivered", "အခြား production workflows ၃ ခုအထက် delivered"),
                  localized("4+ software products maintained", "Software ၄ ခုအထက် maintenance"),
                ].map((item) => (
                  <div key={item.en} className="rounded-lg border border-light-font/10 bg-white/70 p-4 theme-surface">
                    <FaCode className="text-light-teal" />
                    <p className="mt-3 text-sm font-bold text-light-font">{t(item)}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={stackRef} className="section-shell">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl">
              <p className="section-kicker">{t(localized("Tech Stack", "နည်းပညာများ"))}</p>
              <h2 className="section-title">{t(localized("A practical stack for shipping and maintaining products.", "Products များကို ship လုပ်ပြီး maintain လုပ်ရန် အသုံးပြုသော practical stack"))}</h2>
            </motion.div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="tech-stack-orbit relative mx-auto flex aspect-square w-full max-w-[25rem] items-center justify-center rounded-full border border-light-font/10 bg-white/70 shadow-2xl shadow-slate-950/5 theme-surface"
              >
                <div className="tech-stack-ring absolute inset-6 rounded-full border border-dashed border-light-teal/30" />
                <div className="tech-stack-ring absolute inset-16 rounded-full border border-light-font/10" />
                <div className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-light-font text-center text-light-bg shadow-xl shadow-slate-950/15">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-light-bg/55">{t(localized("Core", "Core"))}</span>
                  <span className="mt-1 text-lg font-extrabold">{t(localized("Full Stack", "Full Stack"))}</span>
                </div>
                {stackOrbitItems.map((item) => (
                  <div
                    key={item.label}
                    className="tech-stack-orbit-item absolute left-1/2 top-1/2"
                    style={{ "--stack-angle": `${item.angle}deg` } as CSSProperties}
                  >
                    <div className="flex min-w-24 items-center justify-center gap-2 rounded-full border border-light-font/10 bg-light-bg/95 px-3 py-2 text-sm font-extrabold text-light-font shadow-lg shadow-slate-950/10 backdrop-blur-md">
                      <span className="text-light-teal">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  </div>
                ))}
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-2">
                {techStack.map((group, index) => (
                  <motion.div
                    key={`${index}-${t(group.category)}`}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="rounded-xl border border-light-font/10 bg-white/70 p-6 theme-surface"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-light-teal/10 text-lg text-light-teal">
                      {group.icon}
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold text-light-font">{t(group.category)}</h3>
                    <ul className="mt-4 space-y-2">
                      {group.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm font-medium text-light-font/70">{t(item)}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={servicesRef} className="section-shell border-y border-light-font/10 bg-white/45 theme-band">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl">
              <p className="section-kicker">{t(localized("What I Can Do", "လုပ်ပေးနိုင်သောအရာများ"))}</p>
              <h2 className="section-title">{t(localized("Client-focused development services.", "Client အတွက် focus ထားသော development services"))}</h2>
              <p className="section-subtitle">
                {t(localized(
                  "Services focused on real business outcomes: better workflows, reliable releases, lower maintenance risk, and faster delivery from one accountable developer.",
                  "တကယ့် business outcome ကို focus ထားသော services ဖြစ်ပြီး workflow ပိုကောင်းစေခြင်း၊ reliable release, maintenance risk လျှော့ချခြင်းနဲ့ faster delivery ကို တာဝန်ယူလုပ်ဆောင်ပေးနိုင်ပါတယ်။",
                ))}
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {services.map((service, index) => (
                <motion.div
                  key={`${index}-${t(service.title)}`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-xl border border-light-font/10 bg-light-bg p-6 theme-surface"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-light-font text-light-bg">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-light-font">{t(service.title)}</h3>
                      <p className="mt-2 text-sm leading-6 text-light-font/70">{t(service.description)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <section ref={contactRef} className="section-shell bg-light-font text-light-bg">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-light-bg/55">{t(localized("Contact", "ဆက်သွယ်ရန်"))}</p>
            <h2 className="mt-4 text-2xl font-extrabold tracking-tight md:text-4xl">
              {t(localized("Need one developer to own the full product delivery?", "Product delivery တစ်ခုလုံးကို တာဝန်ယူနိုင်မယ့် developer လိုအပ်ပါသလား?"))}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-light-bg/70 md:text-lg">
              {t(localized(
                "Available for freelance and full-time opportunities. Share your product goal, timeline, and current status, and I will respond with a clear implementation plan and next step.",
                "Freelance နဲ့ full-time opportunities များအတွက် ဆက်သွယ်နိုင်ပါတယ်။ Product goal, timeline နဲ့ current status ကို ပို့ပေးပါ။ Clear implementation plan နဲ့ next step ကို ပြန်ကြားပေးပါမယ်။",
              ))}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="mailto:mthu35997@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-light-bg px-6 py-3 text-sm font-bold text-light-font transition hover:translate-y-[-1px]"
              >
                {t(localized("Email Me", "Email ပို့ရန်"))} <FaArrowRight className="text-xs" />
              </a>
              <a
                href="tel:+959662988841"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-light-bg/20 px-6 py-3 text-sm font-bold text-light-bg transition hover:bg-light-bg/10"
              >
                {t(localized("Call Directly", "ဖုန်းခေါ်ရန်"))}
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-light-font/10 bg-light-bg px-5 py-8 text-center">
        <div className="mb-4 flex justify-center gap-6">
          <a href="https://github.com/kyawmgmgthu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="text-xl text-light-font/70 transition hover:text-light-teal" />
          </a>
          <a href="tel:+959662988841" aria-label="Phone">
            <FaPhone className="text-xl text-light-font/70 transition hover:text-light-teal" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100057101206481&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook className="text-xl text-light-font/70 transition hover:text-light-teal" />
          </a>
        </div>
        <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-light-font/65">
          {t(localized("Developed by", "တည်ဆောက်သူ"))} <FaHeart className="text-light-teal" /> Kyaw Mg Mg Thu
        </p>
      </footer>

      {chatBotReady ? (
        <Suspense fallback={null}>
          <ChatBot isDark={isDark} language={language} />
        </Suspense>
      ) : null}
    </div>
  );
};

export default App;
