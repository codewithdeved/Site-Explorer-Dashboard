// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Send,
//   Mic,
//   X,
//   Download,
//   ThumbsUp,
//   ThumbsDown,
//   ChevronLeft,
//   ChevronRight,
//   Trash2,
//   Copy,
//   Pin,
//   Search,
//   Sun,
//   Moon,
//   FileText,
//   Smile,
// } from "lucide-react";
// import { jsPDF } from "jspdf";
// import "./chatxp.css";

// const ChatXP = ({ onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [isUserTyping, setIsUserTyping] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [conversationContext, setConversationContext] = useState([]);
//   const [activeTab, setActiveTab] = useState("Options");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [messageHistory, setMessageHistory] = useState([]);
//   const [currentConversationId, setCurrentConversationId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(null);
//   const [copiedMessageIndex, setCopiedMessageIndex] = useState(null);
//   const [copiedConversation, setCopiedConversation] = useState(false);
//   const [downloading, setDownloading] = useState(false);
//   const chatContainerRef = useRef(null);
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (messages.length === 0) {
//       const welcomeMessage = {
//         sender: "bot",
//         text: "Hello! How can I assist you today?",
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         feedback: null,
//         pinned: false,
//         reactions: [],
//       };
//       setMessages([welcomeMessage]);
//       setConversationContext([welcomeMessage.text]);
//     }
//   }, []);

//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = false;
//       recognitionRef.current.interimResults = false;
//       recognitionRef.current.lang = "en-US";

//       recognitionRef.current.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setInput(transcript);
//         setIsListening(false);
//         handleSubmit(new Event("submit"));
//       };

//       recognitionRef.current.onerror = (event) => {
//         setIsListening(false);
//         setMessages((prev) => [
//           ...prev,
//           {
//             sender: "bot",
//             text: "Oops, I couldn’t catch that! Could you try speaking again or typing your query?",
//             timestamp: new Date().toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//             feedback: null,
//             pinned: false,
//             reactions: [],
//           },
//         ]);
//       };

//       recognitionRef.current.onend = () => setIsListening(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (input.trim()) {
//       const filteredSuggestions = messageHistory
//         .flatMap((conv) => conv.messages)
//         .filter(
//           (msg) =>
//             msg.sender === "user" &&
//             msg.text.toLowerCase().includes(input.toLowerCase())
//         )
//         .map((msg) => msg.text)
//         .slice(0, 3);
//       setSuggestions(filteredSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   }, [input, messageHistory]);

//   const handleVoiceInput = () => {
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     } else if (recognitionRef.current) {
//       setIsListening(true);
//       recognitionRef.current.start();
//     } else {
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "Sorry, voice input isn’t supported on this browser. Try typing your query instead!",
//           timestamp: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//           feedback: null,
//           pinned: false,
//           reactions: [],
//         },
//       ]);
//     }
//   };

//   const handleTabClick = (tab, query) => {
//     setActiveTab(tab);
//     if (tab === "Saved Chats") {
//       setMessages([]);
//       setConversationContext([]);
//     } else if (tab === "Clear Chat") {
//       setMessages([
//         {
//           sender: "bot",
//           text: "Hello! How can I assist you today?",
//           timestamp: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//           feedback: null,
//           pinned: false,
//           reactions: [],
//         },
//       ]);
//       setConversationContext(["Hello! How can I assist you today?"]);
//       setCurrentConversationId(null);
//     } else if (tab !== "Options") {
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "user",
//           text: query,
//           timestamp: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//           pinned: false,
//           reactions: [],
//         },
//       ]);
//       setConversationContext((prev) => [...prev, query]);
//       handleBotResponse(query);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     const userMessage = {
//       sender: "user",
//       text: input,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       pinned: false,
//       reactions: [],
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setConversationContext((prev) => [...prev, input]);

//     if (currentConversationId) {
//       setMessageHistory((prev) =>
//         prev.map((conv) =>
//           conv.id === currentConversationId
//             ? { ...conv, messages: [...conv.messages, userMessage] }
//             : conv
//         )
//       );
//     } else {
//       const newConversation = {
//         id: Date.now(),
//         messages: [userMessage],
//       };
//       setMessageHistory((prev) => [...prev, newConversation]);
//       setCurrentConversationId(newConversation.id);
//     }

//     handleBotResponse(input);
//     setInput("");
//     setIsUserTyping(false);
//     setSuggestions([]);
//   };

//   const simulateTyping = () => {
//     setIsTyping(true);
//     return new Promise((resolve) => setTimeout(resolve, 800));
//   };

//   const handleBotResponse = async (query) => {
//     await simulateTyping();
//     const responseText = generateResponse(query.toLowerCase());
//     const response = {
//       sender: "bot",
//       text: responseText,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       feedback: null,
//       quickReplies: query.includes("component")
//         ? ["Tell me more", "Export this data"]
//         : [],
//       links: query.includes("top pages")
//         ? [
//             {
//               url: "https://ahrefs.com/backlink-checker",
//               text: "Visit Backlink Checker",
//             },
//           ]
//         : [],
//       pinned: false,
//       reactions: [],
//     };
//     setMessages((prev) => [...prev, response]);
//     setConversationContext((prev) => [...prev, responseText]);

//     if (currentConversationId) {
//       setMessageHistory((prev) =>
//         prev.map((conv) =>
//           conv.id === currentConversationId
//             ? { ...conv, messages: [...conv.messages, response] }
//             : conv
//         )
//       );
//     } else {
//       const newConversation = {
//         id: Date.now(),
//         messages: [response],
//       };
//       setMessageHistory((prev) => [...prev, newConversation]);
//       setCurrentConversationId(newConversation.id);
//     }

//     setIsTyping(false);
//   };

//   const handleQuickReply = (reply) => {
//     setMessages((prev) => [
//       ...prev,
//       {
//         sender: "user",
//         text: reply,
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         pinned: false,
//         reactions: [],
//       },
//     ]);
//     setConversationContext((prev) => [...prev, reply]);
//     handleBotResponse(reply);
//   };

//   const handleFeedback = (index, feedback) => {
//     setMessages((prev) =>
//       prev.map((msg, i) => (i === index ? { ...msg, feedback } : msg))
//     );
//   };

//   const handleShareConversation = () => {
//     const conversationText = messages
//       .map(
//         (msg) =>
//           `${msg.timestamp} ${msg.sender === "user" ? "You" : "ChatXP"}: ${
//             msg.text
//           }`
//       )
//       .join("\n");
//     navigator.clipboard
//       .writeText(conversationText)
//       .then(() => {
//         setCopiedConversation(true);
//         setTimeout(() => setCopiedConversation(false), 2000);
//       })
//       .catch(() => {
//         alert("Failed to copy conversation. Please try again.");
//       });
//   };

//   const handleExportPDF = () => {
//     setDownloading(true);
//     try {
//       const doc = new jsPDF();
//       let yOffset = 10;
//       doc.setFontSize(12);
//       doc.text("ChatXP Conversation", 10, yOffset);
//       yOffset += 10;

//       messages.forEach((msg) => {
//         const sender = msg.sender === "user" ? "You" : "ChatXP";
//         const text = `${msg.timestamp} ${sender}: ${msg.text}`;
//         const splitText = doc.splitTextToSize(text, 180);
//         doc.text(splitText, 10, yOffset);
//         yOffset += splitText.length * 7 + 5;
//       });

//       doc.save("ChatXP_Conversation.pdf");
//     } catch (error) {
//       alert("Failed to export PDF. Please try again.");
//     } finally {
//       setDownloading(false);
//     }
//   };

//   const handleLoadConversation = (conversation) => {
//     setMessages(conversation.messages);
//     setConversationContext(conversation.messages.map((msg) => msg.text));
//     setCurrentConversationId(conversation.id);
//     setActiveTab("Options");
//   };

//   const handleCopyMessage = (index, text) => {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         setCopiedMessageIndex(index);
//         setTimeout(() => setCopiedMessageIndex(null), 2000);
//       })
//       .catch(() => {
//         alert("Failed to copy message. Please try again.");
//       });
//   };

//   const handlePinMessage = (index) => {
//     setMessages((prev) =>
//       prev.map((msg, i) => ({
//         ...msg,
//         pinned: i === index ? !msg.pinned : msg.pinned,
//       }))
//     );
//   };

//   const handleAddReaction = (index, emoji) => {
//     setMessages((prev) =>
//       prev.map((msg, i) =>
//         i === index ? { ...msg, reactions: [...msg.reactions, emoji] } : msg
//       )
//     );
//     setShowEmojiPicker(null);
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode((prev) => !prev);
//   };

//   const generateResponse = (query) => {
//     const lastBotMessage =
//       conversationContext[conversationContext.length - 1] || "";
//     const lastUserMessage =
//       conversationContext[conversationContext.length - 2] || "";

//     if (
//       query.includes("more") &&
//       lastBotMessage.includes("Want to know more")
//     ) {
//       if (lastUserMessage.includes("referring domains")) {
//         return "Let’s dive deeper into Referring Domains! You can sort the table by DR to find high-authority domains—'example.com' with a DR of 92 is a great start. Or, expand a row to see anchor text details. There’s also a search feature to find specific domains or anchors. What else would you like to know about it?";
//       }
//       if (lastUserMessage.includes("organic keywords")) {
//         return "More on Organic Keywords? Sure thing! The KD badge is color-coded to show difficulty—green means it’s easier to rank, like 'seo basics' with a KD of 10. You can also check historical data by picking a date, or export the list to analyze in Excel. Want to explore a specific keyword or feature?";
//       }
//       if (lastUserMessage.includes("top pages")) {
//         return "Let’s explore Top Pages further! The line chart shows traffic trends over time, like 'https://ahrefs.com/backlink-checker' peaking at 218,643 visits. You can switch tabs to 'Avg. organic traffic' for a different view, or use the period selector (e.g., 6M, 1Y) to zoom in. Want to compare specific dates or check a page’s details?";
//       }
//       if (lastUserMessage.includes("traffic chart")) {
//         return "Diving deeper into the Traffic Chart! You can hover over the line chart to see exact traffic numbers for any month—like 1.5M in Jan 2022. The filter options let you compare traffic from specific regions, like the US vs. UK, or even add competitor data for a side-by-side view. Want to explore a specific metric or time range?";
//       }
//     }

//     if (
//       query.includes("hi") ||
//       query.includes("hello") ||
//       query.includes("hey")
//     ) {
//       return "Hello! How can I assist you today?";
//     }

//     if (query.includes("how are you")) {
//       return "I’m doing great, thanks for asking! I’m a digital assistant, so I’m always ready to help. How about you—how’s your day going?";
//     }

//     if (query.includes("sad") || query.includes("down")) {
//       return "I’m really sorry you’re feeling down! Let’s brighten your day—how about we check out the Top Pages component to see what’s driving traffic? Or, I can tell you a joke to make you smile—just say the word!";
//     }

//     if (query.includes("happy") || query.includes("great")) {
//       return "I love hearing that you’re happy! Let’s keep the good vibes going. Want to dive into the Ads Performance Platform to see how your campaigns are doing?";
//     }

//     if (query.includes("tired") || query.includes("exhausted")) {
//       return "I get that—long days can be exhausting! Let’s take it easy. How about we look at the Traffic Chart? It’s got a nice visual of organic traffic trends from Nov 2021 to Aug 2023.";
//     }

//     if (query.includes("angry") || query.includes("frustrated")) {
//       return "I’m sorry to hear you’re feeling frustrated! Let’s take a breather. How about we explore the Backlink Profile Dashboard? It shows your DR (91) and UR (54)—a nice overview to refocus.";
//     }

//     if (
//       query.includes("referring domains") ||
//       query.includes("referringdomains")
//     ) {
//       return "The Referring Domains component is a goldmine for backlink analysis! It shows you a table of domains linking to your site, with details like Domain Rating (DR), dofollow links, linked pages, and when they were first seen. You can expand rows for more details, sort the table, and even export the data. For example, 'example.com' has a DR of 92 and 1,234 dofollow links! Want to know more about a specific domain or feature?";
//     }

//     if (query.includes("referring ips") || query.includes("referringips")) {
//       return "The Referring IPs component gives you a detailed look at IP addresses linking to your site. It includes metrics like DR, UR, domain traffic, referring domains, and more. You can sort by any column, filter by tabs like 'All,' 'New,' or 'Lost,' and search for specific IPs or anchor text. For example, the IP '157.240.22.35' in the data has a DR of 96 and 8.4M domain traffic! Want to dive deeper into a specific IP or feature?";
//     }

//     if (
//       query.includes("organic keywords") ||
//       query.includes("organickeywords")
//     ) {
//       return "The Organic Keywords component is perfect for SEO enthusiasts! It lists keywords with metrics like search volume, keyword difficulty (KD), CPC, traffic, and position. You can pick a date to see historical data, and export the list in formats like CSV or Excel. For instance, the keyword 'ahrefs' has a volume of 45K and ranks at position 1. The KD is color-coded—green for easy, red for tough. Want to know more about a specific keyword or feature?";
//     }

//     if (query.includes("top pages") || query.includes("toppages")) {
//       return "The Top Pages component is a dashboard for tracking your best-performing pages. It includes a line chart showing traffic trends over time (e.g., 'https://ahrefs.com/backlink-checker' has 218,643 visits), with tabs like 'Performance' and 'Compare pages.' The TableOfPages subcomponent lets you compare traffic between two dates—like 29 Aug 2023 vs. 28 Feb 2023. You can also export the data! Want to know more about a specific page or the chart?";
//     }

//     if (
//       query.includes("backlink profile") ||
//       query.includes("backlinkprofiledashboard")
//     ) {
//       return "The Backlink Profile Dashboard gives you a snapshot of your site’s backlink health. It shows your Domain Rating (DR: 91), URL Rating (UR: 54), total backlinks (4.4M), and referring domains (83.6K). It also covers organic search (230K keywords, 2.6M traffic) and paid search (24 keywords, 104 traffic). The donut charts for DR and UR are a nice touch! Want to dive into a specific metric or section?";
//     }

//     if (
//       query.includes("general backlink organic buttons") ||
//       query.includes("generalbacklinkorganicbuttons")
//     ) {
//       return "The GeneralBacklinkOrganicButtons component is a simple tab navigation system with three buttons: 'General,' 'Backlink profile,' and 'Organic search.' Only one tab can be active at a time, and it defaults to 'General.' It’s a great way to switch between different views on the dashboard. Want to know how it integrates with other components?";
//     }

//     if (
//       query.includes("traffic and domains") ||
//       query.includes("trafficanddomainsdashboard")
//     ) {
//       return "The TrafficAndDomainsDashboard component breaks down traffic by location and referring domains. For example, the US drives 764.7K traffic (29.8% share), while followed domains make up 80.4% of referring domains (67,217). It includes a table for traffic by location and another for referring domains, with options to compare the top 5 on a chart. Want to explore a specific location or metric?";
//     }

//     if (query.includes("traffic chart") || query.includes("trafficchart")) {
//       return "The Traffic Chart component visualizes organic traffic trends over time using an SVG line chart. It shows traffic from Nov 2021 (1.3M) to Aug 2023 (2.6M). You can toggle metrics like Referring Domains or Avg. Organic Traffic, and filter by competitors, locations, or time durations (e.g., 2Y). It also integrates the TrafficAndDomainsDashboard at the bottom. Want to know more about the chart or a specific metric?";
//     }

//     if (
//       query.includes("ads performance") ||
//       query.includes("adsperformanceplatform")
//     ) {
//       return "The Ads Performance Platform is a powerhouse for ad analysis! It has three views: Keywords, Competitive Insights, and A/B Testing. You can see metrics like CTR (e.g., 5.15% for 'enterprise seo platform'), forecast trends, and get bid optimization suggestions. It uses recharts for visualizations and supports exporting data as CSV. Want to explore a specific view or feature, like keyword suggestions?";
//     }

//     if (query.includes("best by links") || query.includes("bestbylinks")) {
//       return "The BestByLinks component ranks pages by backlinks, with features like sorting, filtering, and pinning. For example, 'ahrefs.com/blog/seo-tips' has 15,000 backlinks and 450,000 traffic. It includes a bar chart for trends, a share modal with QR code, and AI insights suggesting link-building strategies. You can export data to CSV and toggle dark mode. Want to dive into a specific page or feature?";
//     }

//     if (
//       query.includes("fun fact") ||
//       query.includes("tell me something interesting")
//     ) {
//       return "Here’s a fun fact: Did you know that the term 'SEO' was first coined in 1997 by a company called Multimedia Marketing Group? It’s come a long way since then! Speaking of SEO, want to check out the Organic Keywords component or maybe the Backlink Profile Dashboard for some real data?";
//     }

//     if (query.includes("joke")) {
//       return "Here’s a little SEO joke for you: Why did the keyword go to therapy? It had an identity crisis after ranking for the wrong intent! Want to see some real keyword data? I can pull up the Organic Keywords or Ads Performance Platform for you!";
//     }

//     if (query.includes("surprise me")) {
//       return (
//         "Let’s have some fun! Here’s a quick tip: the top page in BestByLinks, 'ahrefs.com/blog/seo-tips,' has a growth rate of " +
//         (((15000 - 12000) / 12000) * 100).toFixed(2) +
//         "%. Pretty impressive, right? Want to explore that component more?"
//       );
//     }

//     return "Hmm, I’m not quite sure what you’re asking, but I’m happy to help! Could you rephrase your query, or would you like to explore one of the Site.XP Dashboard components? I can tell you about Referring Domains, Organic Keywords, Top Pages, or even the Ads Performance Platform. Or, if you’re in the mood for fun, I can tell a joke or share a fun fact! What’s on your mind?";
//   };

//   const options = [
//     {
//       name: "Referring Domains",
//       query: "Tell me about the Referring Domains component",
//       icon: <Send size={16} />,
//     },
//     {
//       name: "Referring IPs",
//       query: "Tell me about the Referring IPs component",
//       icon: <Send size={16} />,
//     },
//     {
//       name: "Organic Keywords",
//       query: "Tell me about the Organic Keywords component",
//       icon: <Send size={16} />,
//     },
//     {
//       name: "Top Pages",
//       query: "Tell me about the Top Pages component",
//       icon: <Send size={16} />,
//     },
//     {
//       name: "Backlink Profile",
//       query: "Tell me about the Backlink Profile Dashboard",
//       icon: <Send size={16} />,
//     },
//     {
//       name: "Traffic & Domains",
//       query: "Tell me about the Traffic and Domains Dashboard",
//       icon: <Send size={16} />,
//     },
//     {
//       name: "Traffic Chart",
//       query: "Tell me about the Traffic Chart component",
//       icon: <Send size={16} />,
//     },
//     {
//       name: "Ads Performance",
//       query: "Tell me about the Ads Performance Platform",
//       icon: <Send size={16} />,
//     },
//     {
//       name: "Best by Links",
//       query: "Tell me about the BestByLinks component",
//       icon: <Send size={16} />,
//     },
//     { name: "Clear Chat", query: "", icon: <Trash2 size={16} /> },
//   ];

//   const pinnedMessages = messages.filter((msg) => msg.pinned);
//   const unpinnedMessages = messages.filter((msg) => !msg.pinned);

//   const filteredChats = messageHistory.filter((conv) =>
//     conv.messages.some((msg) =>
//       msg.text.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   return (
//     <div className={`chatxp-container ${isDarkMode ? "dark-mode" : ""}`}>
//       <motion.div
//         className="chatxp-window"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//       >
//         <div className="chatxp-header">
//           <button
//             className="chatxp-menu-button"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
//           >
//             {isSidebarOpen ? (
//               <ChevronLeft size={20} />
//             ) : (
//               <ChevronRight size={20} />
//             )}
//           </button>
//           <div className="chatxp-header-actions">
//             <motion.button
//               onClick={toggleDarkMode}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="chatxp-dark-mode-button"
//               aria-label="Toggle dark mode"
//             >
//               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </motion.button>
//             <motion.button
//               onClick={handleShareConversation}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="chatxp-share-button"
//               aria-label="Share conversation"
//             >
//               {copiedConversation ? (
//                 <span className="chatxp-tooltip">Copied!</span>
//               ) : (
//                 <Download size={20} />
//               )}
//             </motion.button>
//             <motion.button
//               onClick={handleExportPDF}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="chatxp-export-pdf-button"
//               aria-label="Export as PDF"
//               disabled={downloading}
//             >
//               {downloading ? (
//                 <span className="chatxp-loading">Exporting...</span>
//               ) : (
//                 <FileText size={20} />
//               )}
//             </motion.button>
//             <motion.button
//               onClick={onClose}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               className="chatxp-close-button"
//               aria-label="Close chat"
//             >
//               <X size={20} />
//             </motion.button>
//           </div>
//         </div>

//         <div className="chatxp-content">
//           <motion.div
//             className={`chatxp-sidebar ${isSidebarOpen ? "open" : ""}`}
//             initial={{ x: -250 }}
//             animate={{ x: isSidebarOpen ? 0 : -250 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//           >
//             <div className="chatxp-sidebar-tabs">
//               {["Options", "Saved Chats"].map((tab) => (
//                 <motion.button
//                   key={tab}
//                   className={`chatxp-sidebar-tab ${
//                     activeTab === tab ? "active" : ""
//                   }`}
//                   onClick={() => handleTabClick(tab, "")}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   transition={{ duration: 0.2 }}
//                   aria-label={`Switch to ${tab} tab`}
//                 >
//                   {tab}
//                   {activeTab === tab && (
//                     <motion.div
//                       className="chatxp-tab-underline"
//                       layoutId="tab-underline"
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                     />
//                   )}
//                 </motion.button>
//               ))}
//             </div>

//             {activeTab === "Options" ? (
//               <div className="chatxp-sidebar-options">
//                 {options.map((option) => (
//                   <motion.div
//                     key={option.name}
//                     className="chatxp-sidebar-item"
//                     onClick={() => handleTabClick(option.name, option.query)}
//                     whileHover={{
//                       backgroundColor: isDarkMode ? "#374151" : "#e5e7eb",
//                       x: 5,
//                     }}
//                     transition={{ duration: 0.2 }}
//                     tabIndex={0}
//                     role="button"
//                     aria-label={`Select ${option.name} option`}
//                     onKeyPress={(e) =>
//                       e.key === "Enter" &&
//                       handleTabClick(option.name, option.query)
//                     }
//                   >
//                     <span className="chatxp-sidebar-icon">{option.icon}</span>
//                     {option.name}
//                   </motion.div>
//                 ))}
//               </div>
//             ) : (
//               <div className="chatxp-sidebar-saved-chats">
//                 <div className="chatxp-search-bar">
//                   <Search size={16} />
//                   <input
//                     type="text"
//                     placeholder="Search chats..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     aria-label="Search saved chats"
//                   />
//                 </div>
//                 {filteredChats.length === 0 ? (
//                   <p>No saved chats available.</p>
//                 ) : (
//                   filteredChats.map((conversation) => (
//                     <div
//                       key={conversation.id}
//                       className="chatxp-history-item"
//                       onClick={() => handleLoadConversation(conversation)}
//                       tabIndex={0}
//                       role="button"
//                       aria-label={`Load conversation starting with ${conversation.messages[0]?.text.slice(
//                         0,
//                         30
//                       )}`}
//                       onKeyPress={(e) =>
//                         e.key === "Enter" &&
//                         handleLoadConversation(conversation)
//                       }
//                     >
//                       <div className="chatxp-history-preview">
//                         {conversation.messages[0]?.text.slice(0, 30)}...
//                       </div>
//                       <div className="chatxp-history-timestamp">
//                         {conversation.messages[0]?.timestamp}
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </motion.div>

//           <div className="chatxp-chat-area">
//             <div className="chatxp-messages" ref={chatContainerRef}>
//               {pinnedMessages.length > 0 && (
//                 <div className="chatxp-pinned-messages">
//                   <div className="chatxp-pinned-header">Pinned Messages</div>
//                   {pinnedMessages.map((msg, index) => (
//                     <motion.div
//                       key={index}
//                       className={`chatxp-message ${msg.sender} pinned`}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       {msg.sender === "user" && (
//                         <div className="chatxp-message-avatar">
//                           {msg.text.charAt(0).toUpperCase()}
//                         </div>
//                       )}
//                       <div className="chatxp-message-content">
//                         <div className="chatxp-message-text">
//                           {msg.text}
//                           {msg.links?.map((link, i) => (
//                             <div key={i}>
//                               <a
//                                 href={link.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 {link.text}
//                               </a>
//                             </div>
//                           ))}
//                         </div>
//                         <div className="chatxp-message-meta">
//                           <span className="chatxp-message-timestamp">
//                             {msg.timestamp}
//                           </span>
//                           <div className="chatxp-message-actions">
//                             <motion.button
//                               onClick={() =>
//                                 handleCopyMessage(
//                                   messages.indexOf(msg),
//                                   msg.text
//                                 )
//                               }
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               className="chatxp-action-button"
//                               aria-label="Copy message"
//                             >
//                               {copiedMessageIndex === messages.indexOf(msg) ? (
//                                 <span className="chatxp-tooltip">Copied!</span>
//                               ) : (
//                                 <Copy size={16} />
//                               )}
//                             </motion.button>
//                             <motion.button
//                               onClick={() =>
//                                 handlePinMessage(messages.indexOf(msg))
//                               }
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               className="chatxp-action-button"
//                               aria-label={
//                                 msg.pinned ? "Unpin message" : "Pin message"
//                               }
//                             >
//                               <Pin
//                                 size={16}
//                                 className={msg.pinned ? "pinned" : ""}
//                               />
//                             </motion.button>
//                             <motion.button
//                               onClick={() =>
//                                 setShowEmojiPicker(messages.indexOf(msg))
//                               }
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               className="chatxp-action-button"
//                               aria-label="Add reaction"
//                             >
//                               <Smile size={16} />
//                             </motion.button>
//                             {msg.sender === "bot" && (
//                               <div className="chatxp-message-feedback">
//                                 <motion.button
//                                   onClick={() =>
//                                     handleFeedback(messages.indexOf(msg), "up")
//                                   }
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   className={`chatxp-action-button ${
//                                     msg.feedback === "up" ? "active" : ""
//                                   }`}
//                                   aria-label="Like message"
//                                 >
//                                   <ThumbsUp size={16} />
//                                 </motion.button>
//                                 <motion.button
//                                   onClick={() =>
//                                     handleFeedback(
//                                       messages.indexOf(msg),
//                                       "down"
//                                     )
//                                   }
//                                   whileHover={{ scale: 1.1 }}
//                                   whileTap={{ scale: 0.9 }}
//                                   className={`chatxp-action-button ${
//                                     msg.feedback === "down" ? "active" : ""
//                                   }`}
//                                   aria-label="Dislike message"
//                                 >
//                                   <ThumbsDown size={16} />
//                                 </motion.button>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                         {msg.reactions.length > 0 && (
//                           <div className="chatxp-message-reactions">
//                             {msg.reactions.map((reaction, i) => (
//                               <span key={i} className="chatxp-reaction">
//                                 {reaction}
//                               </span>
//                             ))}
//                           </div>
//                         )}
//                         {showEmojiPicker === messages.indexOf(msg) && (
//                           <div className="chatxp-emoji-picker">
//                             {["😊", "👍", "❤️", "😂", "🤓"].map((emoji) => (
//                               <button
//                                 key={emoji}
//                                 onClick={() =>
//                                   handleAddReaction(
//                                     messages.indexOf(msg),
//                                     emoji
//                                   )
//                                 }
//                                 aria-label={`Add ${emoji} reaction`}
//                               >
//                                 {emoji}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}

//               {unpinnedMessages.map((msg, index) => (
//                 <motion.div
//                   key={index}
//                   className={`chatxp-message ${msg.sender}`}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {msg.sender === "user" && (
//                     <div className="chatxp-message-avatar">
//                       {msg.text.charAt(0).toUpperCase()}
//                     </div>
//                   )}
//                   <div className="chatxp-message-content">
//                     <div className="chatxp-message-text">
//                       {msg.text}
//                       {msg.links?.map((link, i) => (
//                         <div key={i}>
//                           <a
//                             href={link.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             {link.text}
//                           </a>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="chatxp-message-meta">
//                       <span className="chatxp-message-timestamp">
//                         {msg.timestamp}
//                       </span>
//                       <div className="chatxp-message-actions">
//                         <motion.button
//                           onClick={() =>
//                             handleCopyMessage(messages.indexOf(msg), msg.text)
//                           }
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           className="chatxp-action-button"
//                           aria-label="Copy message"
//                         >
//                           {copiedMessageIndex === messages.indexOf(msg) ? (
//                             <span className="chatxp-tooltip">Copied!</span>
//                           ) : (
//                             <Copy size={16} />
//                           )}
//                         </motion.button>
//                         <motion.button
//                           onClick={() =>
//                             handlePinMessage(messages.indexOf(msg))
//                           }
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           className="chatxp-action-button"
//                           aria-label={
//                             msg.pinned ? "Unpin message" : "Pin message"
//                           }
//                         >
//                           <Pin
//                             size={16}
//                             className={msg.pinned ? "pinned" : ""}
//                           />
//                         </motion.button>
//                         <motion.button
//                           onClick={() =>
//                             setShowEmojiPicker(messages.indexOf(msg))
//                           }
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           className="chatxp-action-button"
//                           aria-label="Add reaction"
//                         >
//                           <Smile size={16} />
//                         </motion.button>
//                         {msg.sender === "bot" && (
//                           <div className="chatxp-message-feedback">
//                             <motion.button
//                               onClick={() =>
//                                 handleFeedback(messages.indexOf(msg), "up")
//                               }
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               className={`chatxp-action-button ${
//                                 msg.feedback === "up" ? "active" : ""
//                               }`}
//                               aria-label="Like message"
//                             >
//                               <ThumbsUp size={16} />
//                             </motion.button>
//                             <motion.button
//                               onClick={() =>
//                                 handleFeedback(messages.indexOf(msg), "down")
//                               }
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               className={`chatxp-action-button ${
//                                 msg.feedback === "down" ? "active" : ""
//                               }`}
//                               aria-label="Dislike message"
//                             >
//                               <ThumbsDown size={16} />
//                             </motion.button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     {msg.reactions.length > 0 && (
//                       <div className="chatxp-message-reactions">
//                         {msg.reactions.map((reaction, i) => (
//                           <span key={i} className="chatxp-reaction">
//                             {reaction}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                     {showEmojiPicker === messages.indexOf(msg) && (
//                       <div className="chatxp-emoji-picker">
//                         {["😊", "👍", "❤️", "😂", "🤓"].map((emoji) => (
//                           <button
//                             key={emoji}
//                             onClick={() =>
//                               handleAddReaction(messages.indexOf(msg), emoji)
//                             }
//                             aria-label={`Add ${emoji} reaction`}
//                           >
//                             {emoji}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                     {msg.quickReplies?.length > 0 && (
//                       <div className="chatxp-quick-replies">
//                         {msg.quickReplies.map((reply, i) => (
//                           <motion.button
//                             key={i}
//                             onClick={() => handleQuickReply(reply)}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             aria-label={`Quick reply: ${reply}`}
//                           >
//                             {reply}
//                           </motion.button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}
//               {isUserTyping && (
//                 <motion.div
//                   className="chatxp-typing user"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <span>You are typing...</span>
//                 </motion.div>
//               )}
//               {isTyping && (
//                 <motion.div
//                   className="chatxp-typing bot"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <div className="chatxp-typing-dots">
//                     <span></span>
//                     <span></span>
//                     <span></span>
//                   </div>
//                 </motion.div>
//               )}
//             </div>

//             <form onSubmit={handleSubmit} className="chatxp-input-form">
//               <div className="chatxp-input-wrapper">
//                 <input
//                   type="text"
//                   value={input}
//                   onChange={(e) => {
//                     setInput(e.target.value);
//                     setIsUserTyping(true);
//                   }}
//                   onBlur={() => setIsUserTyping(false)}
//                   placeholder="What do you want to know?"
//                   aria-label="Chat input"
//                 />
//                 {suggestions.length > 0 && (
//                   <div className="chatxp-suggestions">
//                     {suggestions.map((suggestion, i) => (
//                       <div
//                         key={i}
//                         className="chatxp-suggestion"
//                         onClick={() => {
//                           setInput(suggestion);
//                           setSuggestions([]);
//                         }}
//                         tabIndex={0}
//                         role="button"
//                         aria-label={`Select suggestion: ${suggestion}`}
//                         onKeyPress={(e) =>
//                           e.key === "Enter" &&
//                           (setInput(suggestion), setSuggestions([]))
//                         }
//                       >
//                         {suggestion}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <motion.button
//                 type="button"
//                 onClick={handleVoiceInput}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className={isListening ? "chatxp-voice-active" : ""}
//                 aria-label={
//                   isListening ? "Stop voice input" : "Start voice input"
//                 }
//               >
//                 <Mic size={20} />
//               </motion.button>
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 disabled={isTyping}
//                 aria-label="Send message"
//               >
//                 <Send size={20} />
//               </motion.button>
//             </form>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ChatXP;

import React from 'react'

const ChatXP = () => {
  return (
    <div>
      
    </div>
  )
}

export default ChatXP
