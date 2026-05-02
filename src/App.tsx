import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import ChatBot from "./components/chatbot";

type Language = "en" | "my";
type LocalizedText = Record<Language, string>;

const localized = (en: string, my: string): LocalizedText => ({ en, my });

const stats = [
  { value: "5+", label: localized("Production systems shipped", "Production system ၂ ခု တည်ဆောက်ပြီး") },
  { value: "End-to-end", label: localized("Frontend, backend, deployment", "Frontend, backend, deployment အဆုံးထိ") },
  { value: "100%", label: localized("Built independently", "အပြည့်အဝ ကိုယ်တိုင်တည်ဆောက်") },
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
      "A web-based hospital operations platform built independently to centralize patient registration, appointments, triage, consultation, pharmacy, billing, rooms, and multi-hospital administration in one secure system.",
      "လူနာမှတ်ပုံတင်ခြင်း၊ appointment, triage, consultation, pharmacy, billing, rooms နဲ့ multi-hospital administration ကို system တစ်ခုတည်းထဲမှာ စုစည်းပေးတဲ့ web-based hospital platform ကို ကိုယ်တိုင်တည်ဆောက်ထားပါတယ်။",
    ),
    highlights: [
      localized("Built complete hospital workflows across registration, appointments, nurse triage, doctor consultation, pharmacy, billing, rooms, wards, and inpatient operations", "registration ကနေ appointment, triage, doctor consultation, pharmacy, billing, rooms, wards နဲ့ inpatient workflow အထိ hospital flow အပြည့်တည်ဆောက်ထားပါတယ်"),
      localized("Implemented multi-hospital support with super admin, hospital admin, and role-based staff access", "super admin, hospital admin နဲ့ role-based staff access ပါဝင်တဲ့ multi-hospital support ကို တည်ဆောက်ထားပါတယ်"),
      localized("Designed structured data relationships for patients, visits, prescriptions, payments, rooms, and hospital branches", "patients, visits, prescriptions, payments, rooms နဲ့ branch hospitals အတွက် structured data relationships ကို design လုပ်ထားပါတယ်"),
      localized("Delivered a practical clinical and operational system intended for real hospital environments, not a demo-only build", "demo project မဟုတ်ဘဲ တကယ့် hospital environment အတွက် အသုံးချနိုင်မယ့် system အဖြစ်တည်ဆောက်ထားပါတယ်"),
    ],
    stack: ["Laravel 12", "PHP", "Blade", "Bootstrap 5", "MySQL", "Vite"],
  },
  {
    title: localized("Qwerty Ticket System", "Qwerty Ticket System"),
    domain: localized("Service Desk Operations", "Service Desk လုပ်ငန်းစဉ်"),
    description: localized(
      "A Laravel-based service desk platform built independently for managing support tickets, projects, users, public request forms, configurable workflows, and project communication from one secure workspace.",
      "support tickets, projects, users, public request forms, configurable workflows နဲ့ project communication ကို secure workspace တစ်ခုထဲမှာ စီမံခန့်ခွဲနိုင်ဖို့ Laravel-based service desk platform ကို ကိုယ်တိုင်တည်ဆောက်ထားပါတယ်။",
    ),
    highlights: [
      localized("Implemented role-based access for admins, project managers, clients, internal staff, and third-party providers", "admins, project managers, clients, internal staff နဲ့ third-party providers အတွက် role-based access ကို တည်ဆောက်ထားပါတယ်"),
      localized("Built one-time public submission links, read-only public tracking, attachments, advanced filters, and project-based ticket visibility", "one-time public submission links, read-only public tracking, attachments, advanced filters နဲ့ project-based ticket visibility ပါဝင်ပါတယ်"),
      localized("Added project chat, general chat approval flows, unread counts, read sync, and configurable ticket settings", "project chat, general chat approval flows, unread counts, read sync နဲ့ configurable ticket settings ကို ထည့်သွင်းထားပါတယ်"),
      localized("Covered core workflows with automated tests: 45 tests passed with 272 assertions", "core workflows အတွက် automated tests ထည့်ထားပြီး 45 tests passed with 272 assertions ရရှိထားပါတယ်"),
    ],
    stack: ["Laravel 12", "PHP 8.4", "Blade", "Tailwind CSS", "JavaScript", "SQLite", "PHPUnit", "Vite"],
  },
];

const earlyProjects = [
  {
    title: localized("QR Code Digital Menu System", "QR Code Digital Menu System"),
    image: "/logos/digital_menu.jpg",
    description: localized(
      "A contactless restaurant menu experiment for browsing restaurant items through QR codes, with menu management concepts and business-facing UI practice.",
      "QR code နဲ့ restaurant menu items တွေကို ကြည့်နိုင်ဖို့ contactless menu experiment တစ်ခုဖြစ်ပြီး menu management နဲ့ business-facing UI practice အတွက် တည်ဆောက်ထားပါတယ်။",
    ),
    stack: ["Laravel 10", "Filament", "Livewire", "MySQL", "AWS", "EC2"],
    link: "https://github.com/KyawMgMgThu/DIgital_menu",
  },
  {
    title: localized("Personal Portfolio", "Personal Portfolio"),
    image: "/logos/portfolio.png",
    description: localized(
      "An early portfolio build focused on responsive layouts, motion, and project presentation while practicing React and modern frontend structure.",
      "React နဲ့ modern frontend structure ကို လေ့ကျင့်စဉ် responsive layout, motion နဲ့ project presentation ကို focus လုပ်ထားတဲ့ early portfolio build ဖြစ်ပါတယ်။",
    ),
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/KyawMgMgThu/kyawmgmgthu-portfolio",
  },
  {
    title: localized("Kid's Learning Website", "Kid's Learning Website"),
    image: "/logos/kid-learning.png",
    description: localized(
      "An interactive learning website experiment for children, including drawing, speech tools, games, animations, and basic educational flows.",
      "ကလေးများအတွက် drawing, speech tools, games, animations နဲ့ basic educational flows ပါဝင်တဲ့ interactive learning website experiment ဖြစ်ပါတယ်။",
    ),
    stack: ["React", "Bootstrap", "React-Speech", "MUI", "Canvas", "React Router"],
    link: "https://github.com/KyawMgMgThu/KG_Learning_website",
  },
  {
    title: localized("Kyaw Gyi POS System", "Kyaw Gyi POS System"),
    image: "/logos/pos.jpg",
    description: localized(
      "A junior-stage POS system experiment for practicing inventory, sales reports, receipts, PDF export, and Laravel plus React integration.",
      "inventory, sales reports, receipts, PDF export နဲ့ Laravel + React integration ကို လေ့ကျင့်ဖို့ တည်ဆောက်ထားတဲ့ junior-stage POS experiment ဖြစ်ပါတယ်။",
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

const services = [
  {
    title: localized("Build Business Web Systems", "Business web systems တည်ဆောက်ခြင်း"),
    description: localized(
      "Turn business requirements into complete web systems with user journeys, admin tools, backend logic, and production release.",
      "business requirement တွေကို user journey, admin tools, backend logic နဲ့ production release ပါဝင်တဲ့ complete web system အဖြစ်ပြောင်းပေးနိုင်ပါတယ်။",
    ),
    icon: <FaRocket />,
  },
  {
    title: localized("Modernize Existing Websites", "ရှိပြီးသား website များကို ခေတ်မီအောင် ပြောင်းခြင်း"),
    description: localized(
      "Upgrade outdated websites into fast, responsive, conversion-focused products with modern UX and clean component architecture.",
      "outdated website များကို fast, responsive, conversion-focused product အဖြစ် modern UX နဲ့ clean component architecture ဖြင့် ပြန်လည်တည်ဆောက်ပေးနိုင်ပါတယ်။",
    ),
    icon: <FaReact />,
  },
  {
    title: localized("Laravel Backend Development", "Laravel backend development"),
    description: localized(
      "Design scalable Laravel backends with robust data models, API design, auth, and maintainable business workflows.",
      "robust data models, API design, auth နဲ့ maintainable business workflows ပါဝင်တဲ့ scalable Laravel backend များကို တည်ဆောက်ပေးနိုင်ပါတယ်။",
    ),
    icon: <FaLaravel />,
  },
  {
    title: localized("Deployment & Hosting", "Deployment & Hosting"),
    description: localized(
      "Move projects from local development to reliable production using AWS, Docker, domains, hosting, and stable release practices.",
      "AWS, Docker, domains, hosting နဲ့ stable release practices အသုံးပြုပြီး local development ကနေ reliable production အထိ တင်ပေးနိုင်ပါတယ်။",
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
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const savedLanguage = localStorage.getItem("portfolio-language") as Language | null;
    if (savedTheme === "dark") {
      setIsDark(true);
    } else if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }
    if (savedLanguage === "en" || savedLanguage === "my") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
  }, [language]);

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
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const section of navItems) {
        const element = section.ref.current;
        if (!element) continue;

        if (
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollToSection = (sectionRef: RefObject<HTMLElement | null>) => {
    if (!sectionRef.current) return;
    setMobileMenuOpen(false);
    window.scrollTo({
      top: sectionRef.current.offsetTop - 76,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-light-bg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-light-teal">
            Kyaw Mg Mg Thu
          </p>
          <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-light-font/10">
            <motion.div
              className="h-full bg-light-teal"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen overflow-x-hidden bg-light-bg font-woff ${isDark ? "theme-dark" : ""}`}>
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
            className="min-w-0 max-w-[9rem] truncate text-left text-base font-bold tracking-tight text-light-font sm:max-w-none"
          >
            Kyaw Mg Mg Thu
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.ref)}
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
              Hire Me
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
              aria-label="Open menu"
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
            className="fixed inset-x-0 top-[73px] z-40 border-b border-light-font/10 bg-light-bg/95 px-5 py-5 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.ref)}
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
                Full-stack developer for production business systems
              </div>
              <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-light-font md:text-5xl lg:text-6xl">
                Build production-ready web systems, end-to-end.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-light-font/70 md:text-xl">
                From React interfaces to Laravel backends and AWS/Docker deployment,
  I turn business workflows into reliable production-ready web systems.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:mthu35997@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-light-font px-6 py-3 text-sm font-bold text-light-bg transition hover:translate-y-[-1px] hover:shadow-lg"
                >
                  Discuss Your Project <FaArrowRight className="text-xs" />
                </a>
                <button
                  onClick={() => scrollToSection(projectsRef)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-light-font/15 px-6 py-3 text-sm font-bold text-light-font transition hover:border-light-teal hover:text-light-teal"
                >
                  View Case Studies
                </button>
              </div>
              <p className="mt-4 text-sm font-medium text-light-font/55">Usually replies within 24 hours.</p>
              <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <div key={`${stat.value}-${index}`} className="rounded-lg border border-light-font/10 bg-white/65 p-4 theme-surface">
                    <p className="text-xl font-extrabold text-light-font">{stat.value}</p>
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
                  <img
                    src="/me.jpg"
                    alt="Kyaw Mg Mg Thu"
                    className="h-12 w-12 rounded-full border border-light-font/10 object-cover sm:h-14 sm:w-14"
                  />
                  <div className="hidden sm:block">
                    <p className="text-sm font-extrabold leading-tight">Kyaw Mg Mg Thu</p>
                    <p className="mt-1 text-xs font-semibold text-light-font/55">Full-stack developer</p>
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
                <motion.img
                  src="/hero-meditation.png"
                  alt="Kyaw Mg Mg Thu meditating developer illustration"
                  className="hero-figure absolute left-1/2 top-1/2 z-10 w-[78%] max-w-[34rem] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_26px_50px_rgba(15,23,42,0.18)]"
                  animate={shouldReduceMotion ? undefined : { y: [0, -14, 0] }}
                  transition={shouldReduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                />
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
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-light-teal">Available</p>
                  <p className="mt-1 text-sm font-extrabold">Full product delivery</p>
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
              <p className="section-kicker">Featured Projects</p>
              <h2 className="section-title">Real systems built independently from scratch.</h2>
              <p className="section-subtitle">
                Client-facing proof of end-to-end delivery: architecture, implementation,
                deployment, and business workflow execution.
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
                  <div className="aspect-[16/9] bg-light-font p-5 text-light-bg">
                    <div className="flex h-full flex-col justify-between rounded-lg border border-light-bg/12 bg-light-bg/5 p-5">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-light-bg/55">{t(project.domain)}</p>
                        <p className="mt-3 max-w-sm text-2xl font-extrabold tracking-tight md:text-3xl">{t(project.title)}</p>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {["Frontend", "Backend", "Deploy"].map((item) => (
                          <div key={item} className="rounded-md border border-light-bg/12 bg-light-bg/8 px-3 py-2">
                            <p className="text-xs font-semibold text-light-bg/70">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                        Built independently
                      </span>
                      <span className="rounded-full bg-light-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-light-teal">
                        Production system
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold tracking-tight text-light-font">{t(project.title)}</h3>
                    <p className="mt-4 text-base leading-7 text-light-font/70">{t(project.description)}</p>

                    <div className="mt-6">
                      <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-light-font/45">Key Highlights</h4>
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
              <p className="section-kicker">Early Projects</p>
              <h3 className="mt-3 max-w-3xl text-2xl font-extrabold tracking-tight text-light-font md:text-4xl">
                Junior-stage experiments kept as growth proof.
              </h3>
              <p className="section-subtitle">
                These are earlier practice projects. I keep them below the production
                systems so clients see my current level first, while recruiters can
                still see my learning path and technical range.
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
                    <img src={project.image} alt={t(project.title)} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-3 w-fit rounded-full bg-light-teal/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-light-teal">
                      Junior Experiment
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
                      View Code <FaExternalLinkAlt className="text-xs" />
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
              <p className="section-kicker">About</p>
              <h2 className="section-title">Full-stack delivery with production responsibility.</h2>
            </motion.div>
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-xl leading-9 text-light-font/75">
                I build and own complete web products across frontend, backend,
                database, and infrastructure. My strongest work is production delivery:
                translating business goals into reliable systems, shipping them
                independently, and supporting practical operation after launch.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {["Independent ownership", "Production deployment", "Business workflow thinking"].map((item) => (
                  <div key={item} className="rounded-lg border border-light-font/10 bg-white/70 p-4 theme-surface">
                    <FaCode className="text-light-teal" />
                    <p className="mt-3 text-sm font-bold text-light-font">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section ref={stackRef} className="section-shell">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl">
              <p className="section-kicker">Tech Stack</p>
              <h2 className="section-title">A practical stack for shipping complete products.</h2>
            </motion.div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-light-teal/10 text-xl text-light-teal">
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
        </section>

        <section ref={servicesRef} className="section-shell border-y border-light-font/10 bg-white/45 theme-band">
          <div className="mx-auto max-w-7xl">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl">
              <p className="section-kicker">What I Can Do</p>
              <h2 className="section-title">Client-focused development services.</h2>
              <p className="section-subtitle">
                Services focused on business outcomes: better workflows, reliable releases,
                lower maintenance risk, and faster delivery from one accountable developer.
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
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-light-bg/55">Contact</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
              Need one developer to own the full product delivery?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-light-bg/70 md:text-lg">
              Available for freelance and full-time opportunities. Share your product
              goal, timeline, and current status, and I will respond with a clear
              implementation plan and next step.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="mailto:mthu35997@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-light-bg px-6 py-3 text-sm font-bold text-light-font transition hover:translate-y-[-1px]"
              >
                Email Me <FaArrowRight className="text-xs" />
              </a>
              <a
                href="tel:+959662988841"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-light-bg/20 px-6 py-3 text-sm font-bold text-light-bg transition hover:bg-light-bg/10"
              >
                Call Directly
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-light-font/10 bg-light-bg px-5 py-8 text-center">
        <div className="mb-4 flex justify-center gap-6">
          <a href="https://github.com/kyawmgmgthu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="text-2xl text-light-font/70 transition hover:text-light-teal" />
          </a>
          <a href="tel:+959662988841" aria-label="Phone">
            <FaPhone className="text-2xl text-light-font/70 transition hover:text-light-teal" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100057101206481&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook className="text-2xl text-light-font/70 transition hover:text-light-teal" />
          </a>
        </div>
        <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-light-font/65">
          Developed by <FaHeart className="text-light-teal" /> Kyaw Mg Mg Thu
        </p>
      </footer>

      <ChatBot isDark={isDark} language={language} />
    </div>
  );
};

export default App;
