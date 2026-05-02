import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaDatabase, FaLaravel, FaPaperPlane, FaReact, FaRobot, FaTimes } from "react-icons/fa";

type Language = "en" | "my";
type ProjectCard = { title: string; description: string; tech: string[]; level: string };
type ExperienceCard = { icon: ReactNode; title: string; description: string };
type CardItem = ProjectCard | ExperienceCard;
type CardData = CardItem[];
type BotResponse = { response: string | string[]; isCard?: boolean; cardData?: CardData };

const getProjectCards = (language: Language) => [
  {
    title: "Hospital Information Management System (HIMS)",
    description: language === "en"
      ? "A production hospital operations platform covering registration, appointments, triage, consultation, pharmacy, billing, and multi-hospital management."
      : "registration, appointments, triage, consultation, pharmacy, billing နဲ့ multi-hospital management ကို စီမံနိုင်တဲ့ production hospital operations platform ဖြစ်ပါတယ်။",
    tech: ["Laravel", "PHP", "Blade", "Bootstrap", "MySQL", "Vite"],
    level: language === "en" ? "Production System" : "Production System",
  },
  {
    title: "Qwerty Ticket System",
    description: language === "en"
      ? "A service desk platform for tickets, projects, public request forms, chat, settings, and role-based workflows."
      : "tickets, projects, public request forms, chat, settings နဲ့ role-based workflows ပါဝင်တဲ့ service desk platform ဖြစ်ပါတယ်။",
    tech: ["Laravel", "PHP", "Blade", "Tailwind CSS", "SQLite", "PHPUnit"],
    level: language === "en" ? "Production System" : "Production System",
  },
  {
    title: "QR Code Digital Menu System",
    description: language === "en"
      ? "A junior-stage restaurant menu experiment for QR browsing and menu management practice."
      : "QR browsing နဲ့ menu management practice အတွက် junior-stage restaurant menu experiment ဖြစ်ပါတယ်။",
    tech: ["Laravel", "Filament", "Livewire", "MySQL"],
    level: language === "en" ? "Junior Experiment" : "Junior Experiment",
  },
];

const getExperienceCards = (language: Language) => [
  {
    icon: <FaReact className="text-2xl" />,
    title: language === "en" ? "Frontend" : "Frontend",
    description: language === "en" ? "React and Tailwind interfaces focused on clean responsive UX." : "clean responsive UX အတွက် React နဲ့ Tailwind interfaces များကို တည်ဆောက်ပေးနိုင်ပါတယ်။",
  },
  {
    icon: <FaLaravel className="text-2xl" />,
    title: language === "en" ? "Backend" : "Backend",
    description: language === "en" ? "Laravel systems, APIs, authentication, admin flows, and business logic." : "Laravel systems, APIs, authentication, admin flows နဲ့ business logic များကို တည်ဆောက်ပေးနိုင်ပါတယ်။",
  },
  {
    icon: <FaDatabase className="text-2xl" />,
    title: language === "en" ? "Production Delivery" : "Production Delivery",
    description: language === "en" ? "Database structure, AWS, Docker, hosting, and launch support." : "database structure, AWS, Docker, hosting နဲ့ launch support အထိ လုပ်ပေးနိုင်ပါတယ်။",
  },
];

const getKnowledgeBase = (language: Language): Record<string, BotResponse> => {
  const projectCards = getProjectCards(language);
  const experienceCards = getExperienceCards(language);

  return {
    hello: {
      response: language === "en"
        ? "Hello. I can summarize Kyaw's services, real production projects, tech stack, or contact details."
        : "မင်္ဂလာပါ။ Kyaw ရဲ့ services, production projects, tech stack နဲ့ contact details တွေကို အကျဉ်းချုပ်ပြောပြနိုင်ပါတယ်။",
    },
    skill: {
      response: language === "en"
        ? [
            "Kyaw's core stack:",
            "Frontend: React, Tailwind CSS, TypeScript, responsive UI",
            "Backend: PHP, Laravel, REST APIs, MySQL",
            "DevOps: AWS, Docker, Kubernetes, CI/CD",
            "Tools: Git, GitHub, Vite, NPM",
          ]
        : [
            "Kyaw ရဲ့ အဓိက tech stack:",
            "Frontend: React, Tailwind CSS, TypeScript, responsive UI",
            "Backend: PHP, Laravel, REST APIs, MySQL",
            "DevOps: AWS, Docker, Kubernetes, CI/CD",
            "Tools: Git, GitHub, Vite, NPM",
          ],
    },
    project: {
      response: language === "en"
        ? "Projects include current production systems first, then selected early experiments:"
        : "လက်ရှိ production systems များကို အရင်ပြသပြီး selected early experiments များကိုနောက်တွင် ဖော်ပြထားပါတယ်။",
      isCard: true,
      cardData: projectCards,
    },
    service: {
      response: language === "en"
        ? [
            "What Kyaw can do:",
            "Build complete business web systems",
            "Modernize existing websites into clean responsive interfaces",
            "Develop Laravel backends, APIs, dashboards, and admin workflows",
            "Deploy projects with AWS, Docker, Kubernetes, and hosting",
          ]
        : [
            "Kyaw လုပ်ပေးနိုင်တာ:",
            "complete business web systems တည်ဆောက်ခြင်း",
            "ရှိပြီးသား websites များကို clean responsive interfaces အဖြစ်ပြန်လည်တည်ဆောက်ခြင်း",
            "Laravel backends, APIs, dashboards, admin workflows တည်ဆောက်ခြင်း",
            "AWS, Docker, Kubernetes, hosting တို့ဖြင့် deployment လုပ်ခြင်း",
          ],
    },
    experience: {
      response: language === "en" ? "Practical experience areas:" : "အတွေ့အကြုံရှိသော အဓိကပိုင်းများ:",
      isCard: true,
      cardData: experienceCards,
    },
    contact: {
      response: language === "en"
        ? ["Contact Kyaw:", "Email: mthu35997@gmail.com", "Phone: +959662988841", "GitHub: github.com/kyawmgmgthu"]
        : ["Kyaw ကို ဆက်သွယ်ရန်:", "Email: mthu35997@gmail.com", "Phone: +959662988841", "GitHub: github.com/kyawmgmgthu"],
    },
    default: {
      response: language === "en"
        ? "Ask me about projects, services, tech stack, experience, or how to contact Kyaw."
        : "projects, services, tech stack, experience သို့မဟုတ် Kyaw ကို ဘယ်လိုဆက်သွယ်ရမလဲ ဆိုတာ မေးနိုင်ပါတယ်။",
    },
  };
};

type SmartChatBotProps = {
  isDark?: boolean;
  language?: Language;
};

const SmartChatBot = ({ isDark = false, language = "en" }: SmartChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "user" | "bot"; isCard?: boolean; cardData?: CardData }>
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const knowledgeBase = getKnowledgeBase(language);

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    if (input.includes("project") || input.includes("work")) return knowledgeBase.project;
    if (input.includes("skill") || input.includes("technology") || input.includes("stack")) return knowledgeBase.skill;
    if (input.includes("service") || input.includes("offer") || input.includes("do")) return knowledgeBase.service;
    if (input.includes("contact") || input.includes("email") || input.includes("phone")) return knowledgeBase.contact;
    if (input.includes("experience") || input.includes("background")) return knowledgeBase.experience;
    if (input.includes("hello") || input.includes("hi")) return knowledgeBase.hello;
    return knowledgeBase.default;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage = { text: inputValue, sender: "user" as const };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(currentInput);

      if (botResponse.isCard && botResponse.cardData) {
        setMessages((prev) => [
          ...prev,
          { text: botResponse.response as string, sender: "bot" },
          { text: "", sender: "bot", isCard: true, cardData: botResponse.cardData },
        ]);
      } else if (Array.isArray(botResponse.response)) {
        const botMessages = botResponse.response.map((text) => ({
          text,
          sender: "bot" as const,
        }));
        setMessages((prev) => [...prev, ...botMessages]);
      } else {
        setMessages((prev) => [...prev, { text: botResponse.response, sender: "bot" }]);
      }

      setIsTyping(false);
    }, 500);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleSendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 18 }}
            transition={{ duration: 0.18 }}
            className={`flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-xl border shadow-2xl ${
              isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between bg-light-font p-4 text-light-bg">
              <div className="flex items-center gap-2">
                <FaRobot />
                <h3 className="font-bold">{language === "en" ? "Portfolio Assistant" : "Portfolio Assistant"}</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-light-bg/80 hover:text-light-bg" aria-label={language === "en" ? "Close chat" : "chat ပိတ်ရန်"}>
                <FaTimes />
              </button>
            </div>

            <div className={`flex-1 overflow-y-auto p-4 ${isDark ? "bg-slate-950/60" : "bg-slate-50"}`}>
              {messages.length === 0 ? (
                <div className={`flex h-full flex-col justify-center text-center ${isDark ? "text-slate-300" : "text-slate-500"}`}>
                  <p className="mb-3 text-sm font-bold">{language === "en" ? "Try asking:" : "ဒီလိုမေးကြည့်ပါ:"}</p>
                  <p className="text-sm">{language === "en" ? "What real projects has he built?" : "ဘယ်လို real projects တွေတည်ဆောက်ထားသလဲ?"}</p>
                  <p className="text-sm">{language === "en" ? "What services do you offer?" : "ဘယ်လို services တွေပေးနိုင်သလဲ?"}</p>
                  <p className="text-sm">{language === "en" ? "What is the tech stack?" : "tech stack ကဘာတွေလဲ?"}</p>
                  <p className="text-sm">{language === "en" ? "How can I contact him?" : "ဘယ်လိုဆက်သွယ်နိုင်သလဲ?"}</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                    {message.isCard ? (
                      <div className="mb-3 space-y-3">
                        {(message.cardData || []).map((card, i) => (
                          <div key={i} className={`rounded-lg border p-3 ${isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>
                            <div className="flex items-start gap-3">
                              {"icon" in card ? <div className="text-light-teal">{card.icon}</div> : null}
                              <div>
                                <h4 className={`font-bold ${isDark ? "text-slate-100" : "text-slate-900"}`}>{card.title}</h4>
                                {"level" in card ? (
                                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-light-teal">{card.level}</p>
                                ) : null}
                                <p className={`mt-1 text-sm leading-5 ${isDark ? "text-slate-300" : "text-slate-600"}`}>{card.description}</p>
                              </div>
                            </div>
                            {"tech" in card ? (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {card.tech.map((tech) => (
                                  <span key={tech} className={`rounded px-2 py-1 text-xs font-semibold ${isDark ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-700"}`}>
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[85%] rounded-lg p-3 text-sm leading-5 ${
                            message.sender === "user"
                              ? "rounded-br-none bg-light-teal text-white"
                              : `${isDark ? "bg-slate-800 text-slate-100" : "bg-white text-slate-800"} rounded-bl-none border border-slate-200/80`
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              )}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-3 flex justify-start">
                  <div className={`${isDark ? "bg-slate-800 text-slate-200" : "bg-white text-slate-700"} rounded-lg rounded-bl-none border border-slate-200/80 px-3 py-2 text-sm`}>
                    {language === "en" ? "Typing..." : "ရိုက်နေသည်..."}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={`border-t p-3 ${isDark ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={language === "en" ? "Ask about the portfolio..." : "portfolio အကြောင်းမေးပါ..."}
                  className={`min-w-0 flex-1 rounded-l-lg border px-3 py-2 text-sm outline-none focus:border-light-teal ${
                    isDark
                      ? "border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-400"
                      : "border-slate-300 bg-white text-slate-900"
                  }`}
                />
                <button
                  onClick={handleSendMessage}
                  className="flex items-center justify-center rounded-r-lg bg-light-font px-4 py-2 text-light-bg transition hover:bg-light-teal"
                  aria-label={language === "en" ? "Send message" : "စာပို့ရန်"}
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="chat-open-button"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-light-font text-light-bg shadow-xl transition hover:bg-light-teal"
            aria-label={language === "en" ? "Open chat" : "chat ဖွင့်ရန်"}
          >
            <FaRobot className="text-2xl" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartChatBot;
