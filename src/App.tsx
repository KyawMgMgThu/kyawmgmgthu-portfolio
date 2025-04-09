import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const App = () => {
  // Section refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Active section state
  const [activeSection, setActiveSection] = useState("home");

  // Scroll observer setup
  const isAboutInView = useInView(aboutRef, { amount: 0.5 });
  const isProjectsInView = useInView(projectsRef, { amount: 0.5 });
  const isBlogInView = useInView(blogRef, { amount: 0.5 });
  const isContactInView = useInView(contactRef, { amount: 0.5 });

  useEffect(() => {
    if (isContactInView) setActiveSection("contact");
    else if (isBlogInView) setActiveSection("blog");
    else if (isProjectsInView) setActiveSection("projects");
    else if (isAboutInView) setActiveSection("about");
    else setActiveSection("home");
  }, [isAboutInView, isProjectsInView, isBlogInView, isContactInView]);

  // Smooth scroll function
  const scrollToSection = (sectionRef) => {
    setMobileMenuOpen(false);
    window.scrollTo({
      top: sectionRef.current.offsetTop - 80,
      behavior: "smooth",
    });
  };

  // Navigation items config
  const navItems = [
    { name: "Home", ref: homeRef, id: "home" },
    { name: "About", ref: aboutRef, id: "about" },
    { name: "Projects", ref: projectsRef, id: "projects" },
    { name: "Blog", ref: blogRef, id: "blog" },
    { name: "Contact", ref: contactRef, id: "contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-light-bg py-6 px-6 md:px-12 lg:px-24 border-b-2 sticky top-0 z-50">
        <div className="text-2xl font-woff italic font-medium cursor-pointer">
          <span className="text-light-font">KyawMgMgThu</span>
          <span className="text-light-teal">.dev</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-8 text-lg font-normal text-light-font font-woff">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.ref)}
                className={`link-btn ${
                  activeSection === item.id ? "text-light-teal font-medium" : ""
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
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="34" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-light-bg bg-opacity-95 z-40 pt-24 px-6">
          <ul className="flex flex-col gap-6 text-xl font-woff">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.ref)}
                  className={`w-full text-left py-3 ${
                    activeSection === item.id ? "text-light-teal font-medium" : "text-light-font"
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
      <div className="font-woff bg-light-bg">
        {/* Home Section */}
        <section
          ref={homeRef}
          className="flex flex-col lg:flex-row padding gap-8 justify-between py-16 items-center min-h-screen"
        >
          <div className="order-1 lg:order-2 w-full lg:w-[50%] flex justify-center lg:justify-end px-0 lg:px-8">
            <img
              className="w-full lg:w-[80%] max-w-md"
              src="/image.png"
              alt="Kyaw Mg Mg Thu"
            />
          </div>

          {/* Text Second on Mobile */}
          <div className="order-2 lg:order-1 w-full lg:w-[50%] leading-7 flex flex-col gap-4">
            <h5 className="text-xl text-light-teal">Hello, I'm </h5>
            <h1 className="text-4xl font-extrabold">Kyaw Mg Mg Thu</h1>
            <h1 className="text-4xl text-light-teal">
              Freelancer | Full-stack Developer
            </h1>
            <p className="italic text-xl text-light-font">
              I am a Full-Stack Developer with expertise in React and Next.js
              for the frontend, and PHP and Laravel for the backend. I
              specialize in creating dynamic, scalable web applications with a
              focus on user experience, performance, and security.
            </p>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="font-woff btn w-fit mt-4"
            >
              Contact me!
            </button>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="py-16 padding">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative text-center mb-16"
            >
              <h1 className="text-4xl font-bold text-light-font">About Me</h1>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 20"
                className="absolute left-1/2 transform -translate-x-1/2 mt-2"
                width="200"
                height="20"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <motion.path
                  d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
                  className="stroke-light-teal"
                  strokeWidth="3"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
              </motion.svg>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="w-full lg:w-[40%] flex justify-center">
                <motion.img
                  src="/me.jpg"
                  alt="Kyaw Mg Mg Thu"
                  className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>
              <div className="w-full lg:w-[60%] flex flex-col gap-6">
                <motion.h2
                  className="text-2xl font-bold text-light-font"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Full-Stack Developer with 2+ Years of Experience
                </motion.h2>
                <motion.p
                  className="text-light-font"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  I have comprehensive experience in web application
                  development, with polished skills in both frontend and backend
                  development. My education has provided a strong foundation for
                  my career in technology.
                </motion.p>

                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-light-teal mb-4">
                    Education
                  </h3>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-light-font">
                      B.Sc (Hons) in Computing
                    </h4>
                    <p className="text-light-font">
                      Computer University, Myeik | 2022 - now
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-light-font space-y-1">
                     
                    </ul>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={projectsRef}
          className="py-16 padding bg-light-bg-secondary min-h-screen"
        >
          <div className="max-w-6xl mx-auto">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative text-center mb-16"
            >
              <h1 className="text-4xl font-bold text-light-font">Featured Projects</h1>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 20"
                className="absolute left-1/2 transform -translate-x-1/2 mt-2"
                width="500"
                height="30"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <motion.path
                  d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
                  className="stroke-light-teal"
                  strokeWidth="3"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
              </motion.svg>
            </motion.div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {/* Project 1 */}
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://i.pinimg.com/236x/8a/3f/06/8a3f06bfa5a2533e54cd55b371209a6b.jpg"
                  alt="Project 1"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-light-font mb-2">
                    CourseHub - Online Learning Platform
                  </h3>
                  <p className="text-light-font text-sm mb-4">
                    A full-featured e-learning web app using React, Laravel, and
                    MySQL. Includes real-time chat, video streaming, quiz
                    modules, and instructor dashboard.
                  </p>
                  <a
                    href="https://yourprojectlink.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-teal font-medium hover:underline"
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://i.pinimg.com/236x/86/ea/35/86ea35810804925d733221695baf5177.jpg"
                  alt="Project 2"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-light-font mb-2">
                    RecyLink - Smart Waste Management
                  </h3>
                  <p className="text-light-font text-sm mb-4">
                    Developed a sustainable waste tracking dashboard using
                    Next.js and Firebase. Used for optimizing recycling
                    processes and environmental monitoring.
                  </p>
                  <a
                    href="https://yourprojectlink.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-teal font-medium hover:underline"
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>

              {/* Project 3 */}
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://i.pinimg.com/236x/c5/ea/9a/c5ea9a14d742b4197deb4a4cbc5435f5.jpg  "
                  alt="Project 3"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-light-font mb-2">
                    RealTimeChat - WebSocket Messaging App
                  </h3>
                  <p className="text-light-font text-sm mb-4">
                    A real-time chat application built with React, Node.js,
                    Socket.IO, and MongoDB. Features private messaging, online
                    status, and message history.
                  </p>
                  <a
                    href="https://yourprojectlink.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-teal font-medium hover:underline"
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section ref={blogRef} className="py-16 padding min-h-screen">
          <div className="max-w-6xl mx-auto">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative text-center mb-16"
            >
              <h1 className="text-4xl font-bold text-light-font">Blog</h1>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 20"
                className="absolute left-1/2 transform -translate-x-1/2 mt-2"
                width="150"
                height="40"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <motion.path
                  d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
                  className="stroke-light-teal"
                  strokeWidth="3"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
              </motion.svg>
            </motion.div>
            {/* Add your blog posts here */}
            <div className="text-center text-light-font">
              Blog content coming soon...
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={contactRef}
          className="py-16 padding bg-light-bg-secondary min-h-screen"
        >
          <div className="max-w-6xl mx-auto">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative text-center mb-16"
            >
              <h1 className="text-4xl font-bold text-light-font">Get In Touch</h1>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 20"
                className="absolute left-1/2 transform -translate-x-1/2 mt-2"
                width="220"
                height="25"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                <motion.path
                  d="M0 10 Q 25 0, 50 10 T 100 10 T 150 10 T 200 10"
                  className="stroke-light-teal"
                  strokeWidth="3"
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
              </motion.svg>
            </motion.div>
            <div className="max-w-md mx-auto">
              <form className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block text-light-font mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-light-teal"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block text-light-font mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-light-teal"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="message"
                    className="block text-light-font mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-light-teal"
                  ></textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  className="btn w-full mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Send Message
                </motion.button>
              </form>
            </div>
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
              <i className="fab fa-github text-2xl text-light-font hover:text-light-teal transition"></i>
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin text-2xl text-light-font hover:text-light-teal transition"></i>
            </a>
            <a
              href="https://dev.to/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-dev text-2xl text-light-font hover:text-light-teal transition"></i>
            </a>
            <a
              href="https://facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook text-2xl text-light-font hover:text-light-teal transition"></i>
            </a>
          </div>
          <p className="text-light-font text-xl">Developed by Kyaw Mg Mg Thu</p>
        </footer>
      </div>
    </>
  );
};

export default App;
