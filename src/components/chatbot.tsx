import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane, FaCode, FaLaravel, FaDatabase } from "react-icons/fa";

const projectCards = [
  {
    title: "QR Code Digital Menu System",
    description:
      "A contactless restaurant menu solution allowing customers to view menus, ingredients, and promotions by scanning QR codes. Features real-time updates and analytics.",
    tech: ["Laravel 10", "Filament", "Livewire", "MySQL", "AWS", "EC2"],
    link: "https://github.com/KyawMgMgThu/DIgital_menu"
  },
  {
    title: "Personal Portfolio",
    description:
      "A sleek and modern portfolio built to showcase my work, skills, and projects. Designed with performance and aesthetics in mind using animations and responsive layouts.",
    tech: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS 4",
      "Framer Motion",
      "FontAwesome",
      "React Icons"
    ],
    link: "https://github.com/KyawMgMgThu/kyawmgmgthu-portfolio"
  },
  {
    title: "Kid's Learning Website",
    description:
      "An interactive educational platform for kids featuring games, drawing, speech tools, and animations. Helps children learn numbers, alphabets, colors, and more.",
    tech: [
      "React",
      "Bootstrap",
      "React-Speech",
      "MUI",
      "Canvas",
      "FontAwesome",
      "React-Router-DOM"
    ],
    link: "https://github.com/KyawMgMgThu/KG_Learning_website"
  },
  {
    title: "Kyaw Gyi POS System",
    description:
      "A modern POS system for small businesses featuring inventory management, receipt printing, sales reports, and PDF export. Built for performance and scalability.",
    tech: [
      "Laravel 10",
      "React",
      "Vite",
      "Bootstrap 5",
      "SweetAlert2",
      "jsPDF",
      "Axios"
    ],
    link: "https://github.com/KyawMgMgThu/pos_system"
  }
];

const experienceCards = [
  {
    icon: <FaCode className="text-2xl" />,
    title: "Frontend Development",
    description: "Building responsive UIs with React, Next.js, Bootstrap and tailwind"
  },
  {
    icon: <FaLaravel className="text-2xl" />,
    title: "Backend Development",
    description: "Creating robust APIs with PHP/Laravel"
  },
  {
    icon: <FaDatabase className="text-2xl" />,
    title: "Database Design",
    description: "Structuring efficient data models with MySQL"
  }
];

// Now the knowledgeBase can use those variables
const knowledgeBase: Record<string, { response: string | string[], isCard?: boolean, cardData?: typeof projectCards | typeof experienceCards }> = {
  "hello": {
    response: "Hello! I'm here to help you learn about Kyaw Mg Mg Thu's portfolio. Ask me about his skills, projects, education, or how to contact him!"
  },
  "hi": {
    response: "Hi there! I can tell you about Kyaw's full-stack development skills, recent projects, or background. What would you like to know?"
  },
  "skill": {
    response: [
      "Kyaw specializes in:",
      "• Frontend: React.js, Next.js, JavaScript, TypeScript, Tailwind, Bootstrap",
      "• Backend: PHP, Laravel",
      "• Databases: MySQL, MongoDB",
      "• DevOps: AWS, Git, GitHub",
      "• Other: Responsive Design, Clean Code Architecture"
    ]
  },
  "project": {
    response: "Featured projects include:",
    isCard: true,
    cardData: projectCards
  },
  "experience": {
    response: "Kyaw has practical experience with:",
    isCard: true,
    cardData: experienceCards
  },
  "education": {
    response: [
      "• Currently studying at University of Computer Studies, Myeik (2022-Present)",
      "• HTML, CSS, Bootstrap, JavaScript, JQuery, PHP, Laravel, Mysql at Code Lab | 2022",
      "• Advanced PHP Framework Thinking, Git, GitHub at Creative Coder Myanmar | 2023",
      "• Laravel Filament, Laravel Livewire, React.js, Next.js at Youtube Platform | 2023-2024",
      "• Aws Cloub Ec2 at Udemy Platform | 2024",
      "• Specialized in web development technologies"
    ]
  },
  "contact": {
    response: [
      "You can reach Kyaw through:",
      "• Email: mthu35997@gmail.com",
      "• Phone: +959662988841",
      "• GitHub: github.com/kyawmgmgthu",
      "• Facebook: facebook.com/profile.php?id=100057101206481"
    ]
  },
  "default": {
    response: "I'm not sure I understand. Try asking about Kyaw's: skills, projects, education, or contact information."
  }
};

const SmartChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot"; isCard?: boolean; cardData?: typeof projectCards | typeof experienceCards }>>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    if (input.includes("project") || input.includes("work")) return knowledgeBase["project"];
    if (input.includes("skill") || input.includes("technology")) return knowledgeBase["skill"];
    if (input.includes("education") || input.includes("study") || input.includes("school")) return knowledgeBase["education"];
    if (input.includes("contact") || input.includes("email") || input.includes("phone")) return knowledgeBase["contact"];
    if (input.includes("experience") || input.includes("background")) return knowledgeBase["experience"];
    if (input.includes("hello") || input.includes("hi")) return knowledgeBase["hello"];
    return knowledgeBase["default"];
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = { text: inputValue, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    setTimeout(() => {
      const botResponse = getBotResponse(currentInput);

      if (botResponse.isCard && botResponse.cardData) {
        setMessages(prev => [
          ...prev,
          { text: botResponse.response as string, sender: 'bot' },
          {
            text: "",
            sender: 'bot',
            isCard: true,
            cardData: botResponse.cardData
          }
        ]);
      } else {
        if (Array.isArray(botResponse.response)) {
          const botMessages = botResponse.response.map(text => ({
            text,
            sender: 'bot' as const
          }));
          setMessages(prev => [...prev, ...botMessages]);
        } else {
          setMessages(prev => [...prev, { text: botResponse.response as string, sender: 'bot' }]);
        }
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white shadow-xl rounded-t-lg rounded-bl-lg w-80 h-96 flex flex-col border border-gray-200"
        >
          
          {/* Header */}
          <div className="bg-gradient-to-r bg-light-teal text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <FaRobot className="mr-2" />
              <h3 className="font-semibold">Portfolio Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 h-full flex flex-col justify-center">
                <p className="font-medium mb-2">Ask me about:</p>
                <p className="text-sm">• Kyaw's skills</p>
                <p className="text-sm">• Recent projects</p>
                <p className="text-sm">• Education background</p>
                <p className="text-sm">• How to contact</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div key={index}>
                  {message.isCard ? (
                    <div className="mb-3">
                      {message.cardData === projectCards ? (
                        <div className="space-y-3">
                          {projectCards.map((project, i) => (
                            <div key={i} className="border rounded-lg p-3 bg-white shadow-sm">
                              <h4 className="font-semibold text-teal-600">{project.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {project.tech.map((t, j) => (
                                  <span key={j} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-3">
                          {experienceCards.map((exp, i) => (
                            <div key={i} className="border rounded-lg p-3 bg-white shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="text-teal-500">{exp.icon}</div>
                                <div>
                                  <h4 className="font-semibold">{exp.title}</h4>
                                  <p className="text-sm text-gray-600">{exp.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-xs p-3 rounded-lg ${message.sender === 'user'
                          ? 'bg-gradient-to-r bg-light-teal text-white rounded-br-none'
                          : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
                      >
                        {message.text}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about the portfolio..."
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r bg-light-teal text-white px-4 py-2 rounded-r-lg hover:opacity-90 transition"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r bg-light-teal text-white p-4 rounded-full shadow-lg hover:shadow-xl transition"
          aria-label="Open chat"
        >
          <FaRobot className="text-2xl" />
        </motion.button>
      )}
    </div>
  );
};

export default SmartChatBot;
