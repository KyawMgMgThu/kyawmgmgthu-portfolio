import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaBolt,
  FaUsersCog,
  FaHeart,
  FaLightbulb,
  FaMobileAlt,
  FaGithub,
  FaFacebook,
  FaPhone,
} from "react-icons/fa";
import ChatBot from "./components/chatbot";

const App = () => {
  // Section refs
  const homeRef = useRef<any>(null);
  const aboutRef = useRef<any>(null);
  const projectsRef = useRef<any>(null);
  const ServicesRef = useRef<any>(null);
  const contactRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      id: 1,
      title: "Full Stack Web Development",
      contact:
        "I craft dynamic and interactive features for your website using modern JavaScript frameworks like React.js || Next.js and  backend technologies such as PHP/Laravel.",
      icon: <FaUsersCog />,
    },
    {
      id: 2,
      title: "Responsive",
      contact:
        "I can make a responsive website for mobile phone, tablet, laptop and other devices",
      icon: <FaMobileAlt />,
    },
    {
      id: 3,
      title: "Clean Coding",
      contact: "I can write clean code using MVC Pattern",
      icon: <FaCode />,
    },
    {
      id: 4,
      title: "Communication",
      contact: "I can communicate with senior developers",
      icon: <FaUsersCog />,
    },
    {
      id: 5,
      title: "Interactive Features",
      contact:
        "I build dynamic and engaging website features using React.js || Next.js and PHP/Laravel to enhance user experience and interactivity.",
      icon: <FaBolt />,
    },

    {
      id: 6,
      title: "Problem Solving",
      contact:
        "I approach development with strong analytical thinking, solving complex problems with efficient, scalable solutions.",
      icon: <FaLightbulb />,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active section state
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      const sections = [
        { id: "home", ref: homeRef },
        { id: "about", ref: aboutRef },
        { id: "projects", ref: projectsRef },
        { id: "services", ref: ServicesRef },
        { id: "contact", ref: contactRef },
      ];

      for (const section of sections) {
        const element = section.ref.current;
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    setMobileMenuOpen(false);
    window.scrollTo({
      top: sectionRef.current.offsetTop - 80,
      behavior: "smooth",
    });
  };

  // Navigation items config
  const navItems = [
    { name: "Home", ref: homeRef, id: "home" },
    { name: "About & Skills", ref: aboutRef, id: "about" },
    { name: "Projects", ref: projectsRef, id: "projects" },
    { name: "Services", ref: ServicesRef, id: "services" },
    { name: "Contact", ref: contactRef, id: "contact" },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-light-bg flex flex-col items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl italic font-medium mb-4">
            <span className="text-light-font">KyawMgMgThu</span>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.5, ease: "linear" }}
            className="h-1 bg-light-teal rounded-full mb-4"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-light-font"
          >
            Loading Portfolio...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-full overflow-x-hidden font-woff bg-light-bg">
        {/* Navbar */}
        <nav className="flex justify-between items-center bg-light-bg py-6 px-6 md:px-12 lg:px-24 border-b-2 w-[100%]  fixed top-0 z-50">
          <div className="text-2xl italic font-medium cursor-pointer">
            <span className="text-light-font">KyawMgMgThu</span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-8 text-lg font-normal text-light-font">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.ref)}
                  className={`link-btn transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-light-teal font-medium"
                      : "text-light-font"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-light-font"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="34"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-light-bg bg-opacity-95 z-40 pt-24 px-6 overflow-y-auto animate-fade-in">
            {/* Close Button */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-light-font text-3xl focus:outline-none"
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="flex flex-col gap-6 text-xl">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      scrollToSection(item.ref);
                      setMobileMenuOpen(false); // close menu after click
                    }}
                    className={`w-full text-left py-3 transition-all duration-200 ${
                      activeSection === item.id
                        ? "text-light-teal font-medium"
                        : "text-light-font"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Page Content */}
        <div className=" bg-light-bg">
          {/* Home Section */}
          <section
            ref={homeRef}
            className="flex flex-col lg:flex-row padding gap-8 justify-between py-16 items-center min-h-screen"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 w-full lg:w-[50%] flex justify-center lg:justify-end px-0 lg:px-8"
            >
              <img
                className="w-full lg:w-[80%] max-w-md"
                src="/image.png"
                alt="Kyaw Mg Mg Thu"
              />
            </motion.div>

            {/* Text Second on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 w-full lg:w-[50%] leading-7 flex flex-col gap-4"
            >
              <h5 className="text-xl text-light-teal">Hello, I'm </h5>
              <h1 className="text-3xl font-extrabold">Kyaw Mg Mg Thu</h1>
              <h1 className="text-3xl text-light-teal">
                Freelancer | Full-stack Developer
              </h1>
              <p className="italic text-lg text-light-font">
                I am a Full-Stack Developer with expertise in React and Next.js
                for the frontend, and PHP and Laravel for the backend. I
                specialize in creating dynamic, scalable web applications with a
                focus on user experience, performance, and security.
              </p>
              <a href="mailto:mthu35997@gmail.com" className="btn w-fit mt-4">
                Contact me!
              </a>
            </motion.div>
          </section>

          {/* About Section */}
          <section ref={aboutRef} className="py-16 padding">
            <div className="max-w-6xl mx-auto font-wo">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative text-center mb-16"
              >
                <h1 className="text-3xl font-bold text-light-font">
                  About & Skills
                </h1>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 20"
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2"
                  width="200"
                  height="40"
                >
                  <motion.path
                    d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
                    className="stroke-light-teal"
                    strokeWidth="3"
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3,
                      ease: "easeInOut",
                    }}
                  />
                </motion.svg>
              </motion.div>

              <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Improved Image Design */}
                <div className="w-full lg:w-[40%] flex justify-center relative group">
                  <motion.div
                    className="relative overflow-hidden rounded-lg shadow-xl w-full max-w-md"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <img
                      src="/me.jpg"
                      alt="Kyaw Mg Mg Thu"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-bold">Kyaw Mg Mg Thu</h3>
                        <p className="text-light-teal">Full-Stack Developer</p>
                      </div>
                    </div>
                    <div className="absolute -inset-2 border-2 border-light-teal rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </motion.div>
                </div>

                <div className="w-full lg:w-[60%] flex flex-col gap-6">
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl font-bold text-light-teal mb-4">
                      Education
                    </h3>

                    <div className="space-y-6">
                      <div className="border-l-2 border-light-teal pl-4">
                        <h4 className="text-lg font-semibold text-light-font">
                          In Matriculation
                        </h4>
                        <p className="text-light-font/80">
                          Matriculated in 2022 | Currently studying at the
                          University of Computer Studies, Myeik. | 2022-Now
                        </p>
                      </div>

                      <div className="border-l-2 border-light-teal pl-4">
                        <h4 className="text-lg font-semibold text-light-font">
                          Getting Started Web Developement
                        </h4>
                        <p className="text-light-font/80">
                          Self-taught through YouTube and online courses
                        </p>
                        <ul className="list-disc pl-5 mt-2 text-light-font/80 space-y-1">
                          <li>
                            HTML, CSS, Bootstrap, JavaScript, JQuery, PHP,
                            Laravel, Mysql at Code Lab | 2022
                          </li>
                          <li>
                            Advanced PHP Framework Thinking, Git, GitHub, Linux at
                            Creative Coder Myanmar | 2023
                          </li>
                          <li>
                            Laravel Filament, Laravel Livewire, React.js,
                            Next.js at Youtube Platform | 2023-2024
                          </li>
                          <li>Aws Cloub Ec2, Tailwind at Udemy Platform | 2024</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="mt-6">
                <motion.div
                  className="overflow-x-hidden whitespace-nowrap py-2 px-1 relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="inline-flex space-x-6"
                    animate={{
                      x: ["0%", "-100%"],
                    }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                      },
                    }}
                  >
                    {/* First set of logos */}
                    {[
                      "https://brandeps.com/logo-download/H/HTML-5-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/C/CSS-3-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/J/JavaScript-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/J/JQuery-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/P/PHP-logo-vector-01.svg",
                      "https://brandeps.com/icon-download/L/Laravel-icon-vector-04.svg",
                      "https://brandeps.com/logo-download/M/MySQL-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/G/Git-logo-vector-01.svg",
                      "https://brandeps.com/icon-download/G/Github-icon-vector-22.svg",
                      "https://brandeps.com/icon-download/R/React-icon-vector-01.svg",
                      "https://brandeps.com/icon-download/N/Next-js-icon-vector-01.svg",
                      "https://brandeps.com/icon-download/A/Amazon-aws-icon-vector-01.svg",
                      "https://brandeps.com/logo-download/N/Node-JS-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/T/Typescript-logo-vector-01.svg",
                    ].map((logo, index) => (
                      <img
                        key={`first-${index}`}
                        src={logo}
                        alt=""
                        className="h-24 w-24 object-contain"
                      />
                    ))}

                    {/* Second set (duplicate for seamless looping) */}
                    {[
                      "https://brandeps.com/logo-download/H/HTML-5-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/C/CSS-3-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/J/JavaScript-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/J/JQuery-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/P/PHP-logo-vector-01.svg",
                      "https://brandeps.com/icon-download/L/Laravel-icon-vector-04.svg",
                      "https://brandeps.com/logo-download/M/MySQL-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/G/Git-logo-vector-01.svg",
                      "https://brandeps.com/icon-download/G/Github-icon-vector-22.svg",
                      "https://brandeps.com/icon-download/R/React-icon-vector-01.svg",
                      "https://brandeps.com/icon-download/N/Next-js-icon-vector-01.svg",
                      "https://brandeps.com/icon-download/A/Amazon-aws-icon-vector-01.svg",
                      "https://brandeps.com/logo-download/N/Node-JS-logo-vector-01.svg",
                      "https://brandeps.com/logo-download/T/Typescript-logo-vector-01.svg",
                    ].map((logo, index) => (
                      <img
                        key={`second-${index}`}
                        src={logo}
                        alt=""
                        className="h-24 w-24 object-contain"
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section ref={projectsRef} className="py-16 padding  min-h-screen">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative text-center mb-16"
              >
                <h1 className="text-3xl font-bold text-light-font">
                  Featured Projects
                </h1>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 20"
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2"
                  width="300"
                  height="40"
                >
                  <motion.path
                    d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
                    className="stroke-light-teal"
                    strokeWidth="3"
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3,
                      ease: "easeInOut",
                    }}
                  />
                </motion.svg>
              </motion.div>

              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {/* Project 1 */}
                <motion.div
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img
                      src="logos/digital_menu.jpg"
                      alt="QR Code Digital Menu System"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-lg font-semibold text-white">
                        QR Code Digital Menu System
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-light-font text-sm mb-4">
                      A contactless restaurant menu solution allowing customers
                      to view menus, ingredients, and promotions by scanning QR
                      codes. Features real-time updates and analytics.
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-light-font mb-2">
                        Tech Stack:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Laravel 10
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Filament
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Livewire
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          MySQL
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          AWS
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          EC2
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <a
                        href="https://github.com/KyawMgMgThu/DIgital_menu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-teal font-medium text-sm flex items-center gap-1 hover:underline"
                      >
                        <FaGithub className="text-base" />
                        View Code
                      </a>
                      {/* <a
        href="https://demo.digitalmenu.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-light-teal px-3 py-1.5 rounded text-sm font-medium hover:bg-light-teal/90 transition"
      >
        Live Demo
      </a> */}
                    </div>
                  </div>
                </motion.div>

                {/* Project 2 */}
                <motion.div
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img
                      src="logos/portfolio.png"
                      alt="Personal Portfolio"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-lg font-semibold text-white">
                        Personal Portfolio
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-light-font text-sm mb-4">
                      A sleek and modern portfolio built to showcase my work,
                      skills, and projects. Designed with performance and
                      aesthetics in mind, this site uses motion animations and
                      responsive layouts to create an interactive user
                      experience.
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-light-font mb-2">
                        Tech Stack:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          React 19
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          TypeScript
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Vite
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Tailwind CSS 4
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Framer Motion
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          FontAwesome
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          React Icons
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <a
                        href="https://github.com/KyawMgMgThu/kyawmgmgthu-portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-teal font-medium text-sm flex items-center gap-1 hover:underline"
                      >
                        <FaGithub className="text-base" />
                        View Code
                      </a>
                      {/* <a
        href="https://yourportfolio.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-light-teal px-3 py-1.5 rounded text-sm font-medium hover:bg-light-teal/90 transition"
      >
        Live Demo
      </a> */}
                    </div>
                  </div>
                </motion.div>
                

                {/* Project 3 */}
                <motion.div
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img
                      src="logos/kid-learning.png"
                      alt="Kids Learning Website"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-lg font-semibold text-white">
                        Kid's Learning Website
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-light-font text-sm mb-4">
                      An engaging educational platform designed for kids to
                      learn through interactive activities, puzzles, drawing,
                      speech tools, and fun animations. This web app helps
                      children explore numbers, alphabets, colors, and more
                      while keeping learning fun and intuitive.
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-light-font mb-2">
                        Tech Stack:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          React
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Bootstrap
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          React-Speech
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          MUI
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Canvas
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          FontAwesome
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          React-Router-DOM
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <a
                        href="https://github.com/KyawMgMgThu/KG_Learning_website"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-teal font-medium text-sm flex items-center gap-1 hover:underline"
                      >
                        <FaGithub className="text-base" />
                        View Code
                      </a>
                      {/* <a
        href="https://kidslearningdemo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-light-teal px-3 py-1.5 rounded text-sm font-medium hover:bg-light-teal/90 transition"
      >
        Live Demo
      </a> */}
                    </div>
                  </div>
                </motion.div>

                {/* Project 4 */}
                <motion.div
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <img
                      src="logos/pos.jpg"
                      alt="Kyaw Gyi POS System"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-lg font-semibold text-white">
                        Kyaw Gyi POS System
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-light-font text-sm mb-4">
                      A powerful and responsive Point of Sale (POS) system
                      tailored for small to medium-sized businesses. Kyaw Gyi
                      POS System offers inventory tracking, receipt printing,
                      sales reporting, and PDF exports. Built with modern tools
                      to deliver performance, usability, and scalability.
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-light-font mb-2">
                        Tech Stack:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Laravel 10
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          React
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Vite
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Bootstrap 5
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          SweetAlert2
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          jsPDF
                        </span>
                        <span className="text-xs bg-light-teal/10 text-light-teal px-2 py-1 rounded">
                          Axios
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <a
                        href="https://github.com/KyawMgMgThu/pos_system"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-teal font-medium text-sm flex items-center gap-1 hover:underline"
                      >
                        <FaGithub className="text-base" />
                        View Code
                      </a>
                      {/* <a
        href="https://kyawgyiposdemo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-light-teal px-3 py-1.5 rounded text-sm font-medium hover:bg-light-teal/90 transition"
      >
        Live Demo
      </a> */}
                    </div>
                  </div>
                </motion.div>


                <div className="mt-8 text-center">
  <a
    href="https://github.com/KyawMgMgThu"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-white bg-light-teal hover:bg-light-teal-light px-4 py-2 rounded-xl text-sm font-medium transition-all"
  >
    <FaGithub className="text-base" />
    View More Projects on GitHub
  </a>
</div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section
            ref={ServicesRef}
            className="py-10 padding min-h-screen  text-white"
          >
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative text-center mb-16"
              >
                <h1 className="text-3xl font-bold text-light-font">Services</h1>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 200 20"
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2"
                  width="150"
                  height="40"
                >
                  <motion.path
                    d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
                    className="stroke-light-teal"
                    strokeWidth="3"
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3,
                      ease: "easeInOut",
                    }}
                  />
                </motion.svg>
              </motion.div>

              {/* Services Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, i) => (
                  <motion.div
                    key={service.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    variants={cardVariants}
                    viewport={{ once: true }}
                    className={`rounded-md p-8 border hover:scale-105 transition-transform duration-300 cursor-pointer 
                bg-white shadow-lg overflow-hidden border-gray-200 text-light-font`}
                  >
                    <div className="flex justify-center mb-4 text-4xl">
                      {service.icon}
                    </div>
                    <h2 className="text-lg font-semibold text-center uppercase tracking-wide mb-2.5">
                      {service.title}
                    </h2>
                    <p className="text-sm font-light text-center">
                      {service.contact}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section ref={contactRef} className="py-16 px-4 min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading with animated underline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Me</h2>

          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 20"
            className="absolute left-1/2 transform -translate-x-1/2 mt-2"
            width="180"
            height="40"
          >
            <motion.path
              d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
              className="stroke-light-teal"
              strokeWidth="3"
              fill="transparent"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: "easeInOut",
              }}
            />
          </motion.svg>
        </motion.div>

        {/* Main Message */}


        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-700 my-4"
        >
          Driven by creativity and a deep love for coding, I’m always on the lookout for innovative projects and inspiring collaborations. Got something in mind? Let’s build it together!
        </motion.p>

        <motion.a
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
          href="mailto:mthu35997@gmail.com"
          className="inline-block bg-light-teal text-white px-6 py-2 rounded-md hover:bg-light-teal-light transition"
        >
          Get in touch!
        </motion.a>
      </div>
    </section>

          {/* Footer */}
          <footer className="py-8 px-6 lg:px-24 text-center">
            <div className="flex justify-center gap-14 mb-4">
              <a
                href="https://github.com/kyawmgmgthu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="fab fa-github text-2xl text-light-font hover:text-light-teal transition" />
              </a>
              <a
                href="tel://+959662988841"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPhone className="fab fa- text-2xl text-light-font hover:text-light-teal transition" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100057101206481&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="fab fa- text-2xl text-light-font hover:text-light-teal transition" />
              </a>
            </div>
            <p className="text-light-font text-lg flex justify-center items-center gap-2 flex-wrap">
              Developed by
              <FaHeart className="text-light-teal text-xl sm:text-lg" />
              Kyaw Mg Mg Thu
            </p>
          </footer>
        </div>

        <ChatBot />
      </div>
    </>
  );
};

export default App;
