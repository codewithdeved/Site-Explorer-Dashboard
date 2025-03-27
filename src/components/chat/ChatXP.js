import React from 'react'

const ChatXP = () => {
  return (
    <div>
      
    </div>
  )
}

export default ChatXP


// import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
//   MoreVertical,
//   Settings,
//   User,
//   Check,
//   LogOut,
//   Camera,
//   Save,
//   MessageSquare,
// } from "lucide-react";
// import jsPDF from "jspdf";
// import { debounce } from "lodash";
// import Webcam from "react-webcam";
// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
// import Confetti from "react-confetti";
// import "./chatxp.css";

// // Lazy-load Webcam component
// const LazyWebcam = React.lazy(() => import("react-webcam"));

// // Main ChatXP Component
// const ChatXP = () => {
//   // State Management
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [isUserTyping, setIsUserTyping] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [settingsTab, setSettingsTab] = useState("Appearance");
//   const [activeTab, setActiveTab] = useState("ChatXP");
//   const [messageHistory, setMessageHistory] = useState([]);
//   const [currentConversationId, setCurrentConversationId] = useState(null);
//   const [conversationContext, setConversationContext] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [isListening, setIsListening] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(null);
//   const [copiedMessage, setCopiedMessage] = useState(false);
//   const [copiedConversation, setCopiedConversation] = useState(false);
//   const [downloading, setDownloading] = useState(false);
//   const [showMoreMenu, setShowMoreMenu] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showUserDropdown, setShowUserDropdown] = useState(false);
//   const [showClearChatModal, setShowClearChatModal] = useState(false);
//   const [userMood, setUserMood] = useState("neutral");
//   const [showWebcamModal, setShowWebcamModal] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [crop, setCrop] = useState({ unit: "%", width: 50, aspect: 1 });
//   const [completedCrop, setCompletedCrop] = useState(null);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [webcamError, setWebcamError] = useState(null);
//   const [brightness, setBrightness] = useState(100);
//   const [savedChats, setSavedChats] = useState([]);
//   const [showSavedChatsModal, setShowSavedChatsModal] = useState(false);
//   const [savedChatsSearch, setSavedChatsSearch] = useState("");
//   const [isChatbotOpen, setIsChatbotOpen] = useState(false); // For 768px toggle

//   // Refs
//   const messagesEndRef = useRef(null);
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const recognitionRef = useRef(null);
//   const moreMenuRef = useRef(null);
//   const userMenuRef = useRef(null);

//   // Constants
//   const userName = "Tayyab";
//   const moodOptions = [
//     { name: "Happy", emoji: "😊", value: "happy" },
//     { name: "Curious", emoji: "🤔", value: "curious" },
//     { name: "Excited", emoji: "🎉", value: "excited" },
//   ];
//   const options = useMemo(
//     () => [
//       { name: "Referring Domains", query: "Tell me about the Referring Domains component", icon: <Send size={16} /> },
//       { name: "Referring IPs", query: "Tell me about the Referring IPs component", icon: <Send size={16} /> },
//       { name: "Organic Keywords", query: "Tell me about the Organic Keywords component", icon: <Send size={16} /> },
//       { name: "Top Pages", query: "Tell me about the Top Pages component", icon: <Send size={16} /> },
//       { name: "Backlink Profile", query: "Tell me about the Backlink Profile Dashboard", icon: <Send size={16} /> },
//       { name: "Traffic & Domains", query: "Tell me about the Traffic and Domains Dashboard", icon: <Send size={16} /> },
//       { name: "Traffic Chart", query: "Tell me about the Traffic Chart component", icon: <Send size={16} /> },
//       { name: "Ads Performance", query: "Tell me about the Ads Performance Platform", icon: <Send size={16} /> },
//       { name: "Best by Links", query: "Tell me about the BestByLinks component", icon: <Send size={16} /> },
//       { name: "SEO Audit", query: "Tell me about the SEO Audit tool", icon: <Send size={16} /> },
//       { name: "Competitor Analysis", query: "Tell me about the Competitor Analysis feature", icon: <Send size={16} /> },
//       { name: "Keyword Research", query: "Tell me about the Keyword Research tool", icon: <Send size={16} /> },
//     ],
//     []
//   );

//   // Effects
//   useEffect(() => {
//     document.body.className = isDarkMode ? "dark-mode" : "";
//   }, [isDarkMode]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Close Dropdowns on Outside Click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
//         setShowMoreMenu(false);
//       }
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setShowUserDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Debounced Suggestions
//   const updateSuggestions = useCallback(
//     debounce((inputValue) => {
//       if (isUserTyping && inputValue.trim()) {
//         const relatedSuggestions = options
//           .filter((option) => option.query.toLowerCase().includes(inputValue.toLowerCase()))
//           .map((option) => option.query);
//         setSuggestions(relatedSuggestions);
//       } else {
//         setSuggestions([]);
//       }
//     }, 300),
//     [isUserTyping, options]
//   );

//   useEffect(() => {
//     updateSuggestions(input);
//     return () => updateSuggestions.cancel();
//   }, [input, updateSuggestions]);

//   // Voice Recognition Setup
//   useEffect(() => {
//     if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
//         console.error("Speech recognition error:", event.error);
//         setIsListening(false);
//         let errorMessage = "Voice recognition failed. Please try again or check your microphone permissions.";
//         if (event.error === "no-speech") {
//           errorMessage = "No speech detected. Please speak clearly and try again.";
//         } else if (event.error === "not-allowed") {
//           errorMessage = "Microphone access denied. Please allow microphone permissions in your browser settings.";
//         } else if (event.error === "network") {
//           errorMessage = "Network error. Please check your internet connection and try again.";
//         }
//         alert(errorMessage);
//       };

//       recognitionRef.current.onend = () => {
//         setIsListening(false);
//       };
//     } else {
//       console.warn("Speech Recognition API not supported in this browser.");
//       alert("Voice recognition is not supported in this browser. Please use a modern browser like Chrome or Edge.");
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, []);

//   // Load Saved Chats from Local Storage
//   useEffect(() => {
//     const saved = localStorage.getItem("savedChats");
//     if (saved) {
//       setSavedChats(JSON.parse(saved));
//     }
//   }, []);

//   // Check Webcam Permissions on Mount
//   useEffect(() => {
//     const checkWebcamPermissions = async () => {
//       try {
//         const permissionStatus = await navigator.permissions.query({ name: "camera" });
//         if (permissionStatus.state === "denied") {
//           setWebcamError("Camera access denied. Please allow camera permissions in your browser settings.");
//         }
//       } catch (error) {
//         console.error("Error checking webcam permissions:", error);
//         setWebcamError("Unable to check camera permissions. Please ensure your browser supports this feature.");
//       }
//     };
//     checkWebcamPermissions();
//   }, []);

//   // Helper Functions
//   const extractKeyPhrase = useCallback((text) => {
//     const words = text.split(" ");
//     return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : text;
//   }, []);

//   const generateResponse = useCallback((query) => {
//     let baseResponse = "";
//     if (query.toLowerCase().includes("referring domains")) {
//       baseResponse = "The Referring Domains component shows the number of unique domains linking to your site.";
//     } else if (query.toLowerCase().includes("referring ips")) {
//       baseResponse = "The Referring IPs component lists the IP addresses that are linking to your site.";
//     } else if (query.toLowerCase().includes("organic keywords")) {
//       baseResponse = "The Organic Keywords component displays the keywords driving traffic to your site.";
//     } else if (query.toLowerCase().includes("top pages")) {
//       baseResponse = "The Top Pages component highlights the pages on your site with the most backlinks.";
//     } else if (query.toLowerCase().includes("backlink profile")) {
//       baseResponse = "The Backlink Profile Dashboard provides an overview of all backlinks to your site.";
//     } else if (query.toLowerCase().includes("traffic and domains")) {
//       baseResponse = "The Traffic and Domains Dashboard shows traffic sources and referring domains.";
//     } else if (query.toLowerCase().includes("traffic chart")) {
//       baseResponse = "The Traffic Chart component visualizes your site's traffic trends over time.";
//     } else if (query.toLowerCase().includes("ads performance")) {
//       baseResponse = "The Ads Performance Platform tracks the performance of your advertising campaigns.";
//     } else if (query.toLowerCase().includes("bestbylinks")) {
//       baseResponse = "The BestByLinks component identifies top pages by the number of backlinks.";
//     } else if (query.toLowerCase().includes("seo audit")) {
//       baseResponse = "The SEO Audit tool analyzes your site for SEO issues and provides actionable recommendations.";
//     } else if (query.toLowerCase().includes("competitor analysis")) {
//       baseResponse = "The Competitor Analysis feature helps you compare your site's performance with competitors.";
//     } else if (query.toLowerCase().includes("keyword research")) {
//       baseResponse = "The Keyword Research tool helps you find high-potential keywords for your SEO strategy.";
//     } else {
//       baseResponse = "I'm not sure about that. Can you provide more details?";
//     }

//     if (userMood === "happy") {
//       return `Great to hear you're feeling happy! 😊 Here's your answer: ${baseResponse}`;
//     } else if (userMood === "curious") {
//       return `I love your curiosity! 🤔 Let's dive in: ${baseResponse}`;
//     } else if (userMood === "excited") {
//       return `Wow, you're excited! 🎉 Here's something to keep the energy up: ${baseResponse}`;
//     }
//     return baseResponse;
//   }, [userMood]);

//   const handleBotResponse = useCallback(async (query) => {
//     try {
//       setIsTyping(true);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       const botMessage = {
//         sender: "bot",
//         text: generateResponse(query),
//         timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//         pinned: false,
//         reactions: [],
//       };
//       setMessages((prev) => [...prev, botMessage]);
//       setConversationContext((prev) => [...prev, botMessage.text]);
//       if (currentConversationId) {
//         setMessageHistory((prev) =>
//           prev.map((conv) =>
//             conv.id === currentConversationId
//               ? { ...conv, messages: [...conv.messages, botMessage] }
//               : conv
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error generating bot response:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "Sorry, I encountered an error. Please try again.",
//           timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//           pinned: false,
//           reactions: [],
//         },
//       ]);
//     } finally {
//       setIsTyping(false);
//     }
//   }, [currentConversationId, generateResponse]);

//   const handleSubmit = useCallback(
//     async (e) => {
//       if (e) e.preventDefault();
//       if (!input.trim() || isSubmitting) return;
//       setIsSubmitting(true);
//       try {
//         const userMessage = {
//           sender: "user",
//           text: input,
//           timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//           pinned: false,
//           reactions: [],
//         };
//         setMessages((prev) => [...prev, userMessage]);
//         setConversationContext((prev) => [...prev, input]);
//         const conversationTitle = extractKeyPhrase(input);
//         if (currentConversationId) {
//           setMessageHistory((prev) =>
//             prev.map((conv) =>
//               conv.id === currentConversationId
//                 ? { ...conv, messages: [...conv.messages, userMessage] }
//                 : conv
//             )
//           );
//         } else {
//           const newConversation = {
//             id: Date.now(),
//             title: conversationTitle,
//             date: new Date().toLocaleDateString(),
//             messages: [userMessage],
//           };
//           setMessageHistory((prev) => [...prev, newConversation]);
//           setCurrentConversationId(newConversation.id);
//         }
//         await handleBotResponse(input);
//       } catch (error) {
//         console.error("Error handling submit:", error);
//         setMessages((prev) => [
//           ...prev,
//           {
//             sender: "bot",
//             text: "An error occurred while processing your request. Please try again.",
//             timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//             pinned: false,
//             reactions: [],
//           },
//         ]);
//       } finally {
//         setInput("");
//         setIsUserTyping(false);
//         setSuggestions([]);
//         setIsSubmitting(false);
//       }
//     },
//     [input, isSubmitting, currentConversationId, extractKeyPhrase, handleBotResponse]
//   );

//   const handleTabClick = useCallback(
//     async (tab, query) => {
//       setActiveTab(tab);
//       if (query && !isSubmitting) {
//         setInput(query);
//         await handleSubmit();
//       }
//       if (tab === "Clear Chat") {
//         setMessages([]);
//         setConversationContext([]);
//         setCurrentConversationId(null);
//         setMessageHistory([]);
//       }
//     },
//     [isSubmitting, handleSubmit]
//   );

//   const handleVoiceInput = useCallback(() => {
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//     } else {
//       try {
//         navigator.mediaDevices
//           .getUserMedia({ audio: true })
//           .then(() => {
//             recognitionRef.current.start();
//             setIsListening(true);
//           })
//           .catch((error) => {
//             console.error("Microphone permission error:", error);
//             let errorMessage = "Microphone access denied. Please allow microphone permissions in your browser settings.";
//             if (error.name === "NotAllowedError") {
//               errorMessage = "Microphone access was denied. Please enable it in your browser settings.";
//             } else if (error.name === "NotFoundError") {
//               errorMessage = "No microphone found. Please connect a microphone and try again.";
//             }
//             alert(errorMessage);
//             setIsListening(false);
//           });
//       } catch (error) {
//         console.error("Error starting voice recognition:", error);
//         alert("Failed to start voice recognition. Please check your microphone permissions.");
//         setIsListening(false);
//       }
//     }
//   }, [isListening]);

//   const handlePinMessage = useCallback((index) => {
//     setMessages((prev) =>
//       prev.map((msg, i) =>
//         i === index ? { ...msg, pinned: !msg.pinned } : msg
//       )
//     );
//     if (currentConversationId) {
//       setMessageHistory((prev) =>
//         prev.map((conv) =>
//           conv.id === currentConversationId
//             ? {
//                 ...conv,
//                 messages: conv.messages.map((msg, i) =>
//                   i === index ? { ...msg, pinned: !msg.pinned } : msg
//                 ),
//               }
//             : conv
//         )
//       );
//     }
//   }, [currentConversationId]);

//   const handleAddReaction = useCallback((index, emoji) => {
//     setMessages((prev) =>
//       prev.map((msg, i) =>
//         i === index
//           ? {
//               ...msg,
//               reactions: msg.reactions.includes(emoji)
//                 ? msg.reactions.filter((r) => r !== emoji)
//                 : [...msg.reactions, emoji],
//             }
//           : msg
//       )
//     );
//     if (currentConversationId) {
//       setMessageHistory((prev) =>
//         prev.map((conv) =>
//           conv.id === currentConversationId
//             ? {
//                 ...conv,
//                 messages: conv.messages.map((msg, i) =>
//                   i === index
//                     ? {
//                         ...msg,
//                         reactions: msg.reactions.includes(emoji)
//                           ? msg.reactions.filter((r) => r !== emoji)
//                           : [...msg.reactions, emoji],
//                       }
//                     : msg
//                 ),
//               }
//             : conv
//         )
//       );
//     }
//   }, [currentConversationId]);

//   const handleCopyMessage = useCallback((text) => {
//     navigator.clipboard.writeText(text);
//     setCopiedMessage(true);
//     setTimeout(() => setCopiedMessage(false), 2000);
//   }, []);

//   const handleShareConversation = useCallback(() => {
//     const conversationText = messages
//       .map((msg) => `${msg.sender === "user" ? "You" : "ChatXP"}: ${msg.text}`)
//       .join("\n");
//     navigator.clipboard.writeText(conversationText);
//     setCopiedConversation(true);
//     setShowConfetti(true);
//     setTimeout(() => {
//       setCopiedConversation(false);
//       setShowConfetti(false);
//     }, 3000);
//   }, [messages]);

//   const handleExportPDF = useCallback(() => {
//     setDownloading(true);
//     const doc = new jsPDF();
//     let yOffset = 10;
//     messages.forEach((msg, index) => {
//       const text = `${msg.sender === "user" ? "You" : "ChatXP"} (${msg.timestamp}): ${msg.text}`;
//       const splitText = doc.splitTextToSize(text, 180);
//       doc.text(splitText, 10, yOffset);
//       yOffset += splitText.length * 10;
//       if (yOffset > 280) {
//         doc.addPage();
//         yOffset = 10;
//       }
//     });
//     doc.save("conversation.pdf");
//     setDownloading(false);
//   }, [messages]);

//   const captureImage = useCallback(() => {
//     try {
//       const imageSrc = webcamRef.current?.getScreenshot();
//       if (imageSrc) {
//         setCapturedImage(imageSrc);
//         setWebcamError(null);
//       } else {
//         setWebcamError("Failed to capture image. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error capturing image:", error);
//       setWebcamError("An error occurred while capturing the image. Please ensure your camera is working.");
//     }
//   }, []);

//   const getCroppedImage = useCallback(() => {
//     const canvas = canvasRef.current;
//     const image = new Image();
//     image.src = capturedImage;
//     const scaleX = image.naturalWidth / image.width;
//     const scaleY = image.naturalHeight / image.height;
//     canvas.width = completedCrop.width * scaleX;
//     canvas.height = completedCrop.height * scaleY;
//     const ctx = canvas.getContext("2d");

//     ctx.filter = `brightness(${brightness}%)`;
//     ctx.drawImage(
//       image,
//       completedCrop.x * scaleX,
//       completedCrop.y * scaleY,
//       completedCrop.width * scaleX,
//       completedCrop.height * scaleY,
//       0,
//       0,
//       completedCrop.width * scaleX,
//       completedCrop.height * scaleY
//     );
//     return canvas.toDataURL("image/jpeg");
//   }, [capturedImage, completedCrop, brightness]);

//   const saveImage = useCallback(() => {
//     try {
//       const croppedImage = getCroppedImage();
//       const link = document.createElement("a");
//       link.download = `ChatXP-Selfie-${new Date().toISOString()}.jpg`;
//       link.href = croppedImage;
//       link.click();
//       setShowWebcamModal(false);
//       setCapturedImage(null);
//       setBrightness(100);
//     } catch (error) {
//       console.error("Error saving image:", error);
//       alert("Failed to save the image. Please ensure your browser supports file downloads and try again.");
//     }
//   }, [getCroppedImage]);

//   const handleSaveChat = useCallback(() => {
//     if (messages.length === 0) {
//       alert("No messages to save.");
//       return;
//     }
//     const chatTitle = prompt("Enter a title for this chat:");
//     if (chatTitle) {
//       const savedChat = {
//         id: Date.now(),
//         title: chatTitle,
//         messages: messages,
//         date: new Date().toLocaleDateString(),
//       };
//       const updatedSavedChats = [...savedChats, savedChat];
//       setSavedChats(updatedSavedChats);
//       localStorage.setItem("savedChats", JSON.stringify(updatedSavedChats));
//       alert("Chat saved successfully!");
//     }
//   }, [messages, savedChats]);

//   const handleLoadChat = useCallback((chat) => {
//     setMessages(chat.messages);
//     setCurrentConversationId(chat.id);
//     setShowSavedChatsModal(false);
//   }, []);

//   const handleDeleteChat = useCallback((chatId) => {
//     const updatedSavedChats = savedChats.filter((chat) => chat.id !== chatId);
//     setSavedChats(updatedSavedChats);
//     localStorage.setItem("savedChats", JSON.stringify(updatedSavedChats));
//     if (currentConversationId === chatId) {
//       setMessages([]);
//       setCurrentConversationId(null);
//     }
//   }, [savedChats, currentConversationId]);

//   const filteredSavedChats = useMemo(() => {
//     return savedChats.filter((chat) =>
//       chat.title.toLowerCase().includes(savedChatsSearch.toLowerCase())
//     );
//   }, [savedChats, savedChatsSearch]);

//   // Render
//   return (
//     <div className={`chatxp-container ${isDarkMode ? "dark-mode" : ""}`}>
//       {/* Chat Toggle Button for 768px */}
//       <motion.button
//         className="chatxp-toggle-button"
//         onClick={() => setIsChatbotOpen(!isChatbotOpen)}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         aria-label={isChatbotOpen ? "Close chatbot" : "Open chatbot"}
//       >
//         <MessageSquare size={24} />
//       </motion.button>

//       {/* Main Chatbot Content */}
//       <div className={`chatxp-content ${isChatbotOpen ? "open" : ""}`}>
//         {/* Sidebar */}
//         <aside className="chatxp-sidebar">
//           <motion.button
//             className="chatxp-new-chat"
//             onClick={() => handleTabClick("ChatXP", "")}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             New Chat
//           </motion.button>
//           <motion.button
//             className="chatxp-saved-chats"
//             onClick={() => setShowSavedChatsModal(true)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Saved Chats
//           </motion.button>
//           {options.map((option, index) => (
//             <motion.div
//               key={index}
//               className={`chatxp-tab ${activeTab === option.name ? "active" : ""}`}
//               onClick={() => handleTabClick(option.name, option.query)}
//               whileHover={{ x: 5 }}
//             >
//               {option.icon}
//               {option.name}
//             </motion.div>
//           ))}
//         </aside>

//         {/* Main Chat Area */}
//         <div className="chatxp-main">
//           <header className="chatxp-header">
//             <h1>ChatXP</h1>
//             <div className="chatxp-header-actions">
//               <motion.button
//                 onClick={() => setShowWebcamModal(true)}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="chatxp-webcam-button"
//                 aria-label="Take a selfie"
//               >
//                 <Camera size={20} />
//               </motion.button>
//               <motion.button
//                 onClick={() => setShowSettings(true)}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="chatxp-settings-button"
//                 aria-label="Open settings"
//               >
//                 <Settings size={20} />
//               </motion.button>
//               <div className="chatxp-user-menu" ref={userMenuRef}>
//                 <motion.button
//                   onClick={() => setShowUserDropdown(!showUserDropdown)}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="chatxp-user-button"
//                   aria-label="User profile"
//                 >
//                   <User size={20} />
//                 </motion.button>
//                 <AnimatePresence>
//                   {showUserDropdown && (
//                     <motion.div
//                       className="chatxp-user-dropdown"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <button onClick={() => setShowUserDropdown(false)}>
//                         <User size={16} /> Profile
//                       </button>
//                       <button onClick={() => setShowSettings(true)}>
//                         <Settings size={16} /> Settings
//                       </button>
//                       <button onClick={() => setShowUserDropdown(false)}>
//                         <LogOut size={16} /> Logout
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//               <div className="chatxp-more-menu" ref={moreMenuRef}>
//                 {showConfetti && <Confetti />}
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="chatxp-more-button"
//                   aria-label="More options"
//                   onClick={() => setShowMoreMenu(!showMoreMenu)}
//                 >
//                   <MoreVertical size={20} />
//                 </motion.button>
//                 <AnimatePresence>
//                   {showMoreMenu && (
//                     <motion.div
//                       className="chatxp-more-menu-dropdown"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <button onClick={handleShareConversation}>
//                         <Download size={16} /> Share Conversation
//                       </button>
//                       <button onClick={handleExportPDF} disabled={downloading}>
//                         <FileText size={16} /> {downloading ? "Exporting..." : "Export as PDF"}
//                       </button>
//                       <button onClick={handleSaveChat}>
//                         <Save size={16} /> Save Chat
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </header>

//           {/* Chat Messages */}
//           {messages.length === 0 ? (
//             <div className="chatxp-welcome-screen">
//               <motion.h2
//                 className="chatxp-welcome-greeting"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 Good evening, {userName}.<br />How can I help you today?
//               </motion.h2>
//               <motion.div
//                 className="chatxp-quick-suggestions"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3, duration: 0.5 }}
//               >
//                 {options.slice(0, 3).map((option, index) => (
//                   <motion.button
//                     key={index}
//                     onClick={() => {
//                       setInput(option.query);
//                       handleSubmit();
//                     }}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="chatxp-suggestion-button"
//                   >
//                     {option.name}
//                   </motion.button>
//                 ))}
//               </motion.div>
//               <div className="chatxp-mood-selector">
//                 <span>How are you feeling?</span>
//                 {moodOptions.map((mood) => (
//                   <motion.button
//                     key={mood.value}
//                     onClick={() => setUserMood(mood.value)}
//                     className={userMood === mood.value ? "active" : ""}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     {mood.emoji} {mood.name}
//                   </motion.button>
//                 ))}
//               </div>
//               <form onSubmit={handleSubmit} className="chatxp-welcome-input-form">
//   <div className="chatxp-welcome-input-wrapper">
//     <input
//       type="text"
//       value={input}
//       onChange={(e) => {
//         setInput(e.target.value);
//         setIsUserTyping(true);
//       }}
//       onBlur={() => setIsUserTyping(false)}
//       placeholder="What do you want to know?"
//       aria-label="Chat input"
//       className="chatxp-input-minimal chatxp-input-welcome"
//     />
//     {suggestions.length > 0 && (
//       <div className="chatxp-suggestions">
//         {suggestions.map((suggestion, i) => (
//           <div
//             key={i}
//             className="chatxp-suggestion"
//             onClick={() => {
//               setInput(suggestion);
//               setSuggestions([]);
//               handleSubmit();
//             }}
//             tabIndex={0}
//             role="button"
//             aria-label={`Select suggestion: ${suggestion}`}
//             onKeyPress={(e) =>
//               e.key === "Enter" && (setInput(suggestion), setSuggestions([]), handleSubmit())
//             }
//           >
//             {suggestion}
//           </div>
//         ))}
//       </div>
//     )}
//     <motion.button
//       type="button"
//       onClick={handleVoiceInput}
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       className={`chatxp-voice-button ${isListening ? "chatxp-voice-active" : ""}`}
//       aria-label={isListening ? "Stop voice input" : "Start voice input"}
//       title={isListening ? "Stop voice input" : "Start voice input"}
//     >
//       <Mic size={20} />
//     </motion.button>
//     <motion.button
//       type="submit"
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       disabled={isTyping || isSubmitting}
//       aria-label="Send message"
//       className="chatxp-submit-button"
//     >
//       <Send size={20} />
//     </motion.button>
//   </div>
// </form>
//             </div>
//           ) : (
//             <>
//               <div className="chatxp-messages">
//                 {messages.map((msg, index) => (
//                   <motion.div
//                     key={index}
//                     className={`chatxp-message ${msg.sender} ${msg.pinned ? "pinned" : ""}`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="chatxp-message-header">
//                       <span className="chatxp-message-sender">
//                         {msg.sender === "user" ? "You" : "ChatXP"}
//                       </span>
//                       <span className="chatxp-message-timestamp">{msg.timestamp}</span>
//                     </div>
//                     <div className="chatxp-message-content">
//                       <p>{msg.text}</p>
//                       {msg.reactions.length > 0 && (
//                         <div className="chatxp-message-reactions">
//                           {msg.reactions.map((reaction, i) => (
//                             <span key={i}>{reaction}</span>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     <div className="chatxp-message-actions">
//                       <motion.button
//                         onClick={() => handlePinMessage(index)}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         aria-label={msg.pinned ? "Unpin message" : "Pin message"}
//                       >
//                         <Pin size={16} />
//                       </motion.button>
//                       <motion.button
//                         onClick={() => handleCopyMessage(msg.text)}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         aria-label="Copy message"
//                       >
//                         {copiedMessage ? <Check size={16} /> : <Copy size={16} />}
//                       </motion.button>
//                       <motion.button
//                         onClick={() => setShowEmojiPicker(index)}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         className="chatxp-emoji-toggle"
//                         aria-label="Add reaction"
//                         title="Add a reaction"
//                       >
//                         <motion.span
//                           whileHover={{ rotate: 15 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <Smile size={16} />
//                         </motion.span>
//                         <span className="chatxp-emoji-tooltip">React</span>
//                       </motion.button>
//                       {showEmojiPicker === index && (
//                         <div className="chatxp-emoji-picker">
//                           {["😊", "😂", "👍", "❤️", "🤔"].map((emoji) => (
//                             <motion.button
//                               key={emoji}
//                               onClick={() => {
//                                 handleAddReaction(index, emoji);
//                                 setShowEmojiPicker(null);
//                               }}
//                               whileHover={{ scale: 1.2 }}
//                               whileTap={{ scale: 0.9 }}
//                               aria-label={`Add ${emoji} reaction`}
//                             >
//                               {emoji}
//                             </motion.button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </motion.div>
//                 ))}
//                 {isTyping && (
//                   <motion.div
//                     className="chatxp-message bot typing"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                   >
//                     <div className="chatxp-message-content">
//                       <div className="chatxp-typing-indicator">
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>
//               <div className="chatxp-mood-selector">
//                 <span>How are you feeling?</span>
//                 {moodOptions.map((mood) => (
//                   <motion.button
//                     key={mood.value}
//                     onClick={() => setUserMood(mood.value)}
//                     className={userMood === mood.value ? "active" : ""}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     {mood.emoji} {mood.name}
//                   </motion.button>
//                 ))}
//               </div>
//               <form onSubmit={handleSubmit} className="chatxp-input-form">
//                 <div className="chatxp-input-wrapper">
//                   <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => {
//                       setInput(e.target.value);
//                       setIsUserTyping(true);
//                     }}
//                     onBlur={() => setIsUserTyping(false)}
//                     placeholder="What do you want to know?"
//                     aria-label="Chat input"
//                     className="chatxp-input-minimal"
//                   />
//                   {suggestions.length > 0 && (
//                     <div className="chatxp-suggestions">
//                       {suggestions.map((suggestion, i) => (
//                         <div
//                           key={i}
//                           className="chatxp-suggestion"
//                           onClick={() => {
//                             setInput(suggestion);
//                             setSuggestions([]);
//                             handleSubmit();
//                           }}
//                           tabIndex={0}
//                           role="button"
//                           aria-label={`Select suggestion: ${suggestion}`}
//                           onKeyPress={(e) =>
//                             e.key === "Enter" && (setInput(suggestion), setSuggestions([]), handleSubmit())
//                           }
//                         >
//                           {suggestion}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                   <motion.button
//                     type="button"
//                     onClick={handleVoiceInput}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className={`chatxp-voice-button ${isListening ? "chatxp-voice-active" : ""}`}
//                     aria-label={isListening ? "Stop voice input" : "Start voice input"}
//                     title={isListening ? "Stop voice input" : "Start voice input"}
//                   >
//                     <Mic size={20} />
//                   </motion.button>
//                   <motion.button
//                     type="submit"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     disabled={isTyping || isSubmitting}
//                     aria-label="Send message"
//                     className="chatxp-submit-button"
//                   >
//                     <Send size={20} />
//                   </motion.button>
//                 </div>
//               </form>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Saved Chats Modal */}
//       {showSavedChatsModal && (
//         <motion.div
//           className="chatxp-saved-chats-modal"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <div className="chatxp-saved-chats-modal-content">
//             <div className="chatxp-saved-chats-modal-header">
//               <h2>Saved Chats</h2>
//               <motion.button
//                 onClick={() => setShowSavedChatsModal(false)}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 aria-label="Close saved chats modal"
//               >
//                 <X size={20} />
//               </motion.button>
//             </div>
//             <div className="chatxp-saved-chats-search">
//               <Search size={16} />
//               <input
//                 type="text"
//                 value={savedChatsSearch}
//                 onChange={(e) => setSavedChatsSearch(e.target.value)}
//                 placeholder="Search saved chats..."
//                 aria-label="Search saved chats"
//               />
//             </div>
//             <div className="chatxp-saved-chats-list">
//               {filteredSavedChats.length > 0 ? (
//                 filteredSavedChats.map((chat) => (
//                   <motion.div
//                     key={chat.id}
//                     className="chatxp-saved-chat-item"
//                     whileHover={{ scale: 1.02 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <div className="chatxp-saved-chat-info">
//                       <span className="chatxp-saved-chat-title">{chat.title}</span>
//                       <span className="chatxp-saved-chat-date">{chat.date}</span>
//                     </div>
//                     <div className="chatxp-saved-chat-actions">
//                       <motion.button
//                         onClick={() => handleLoadChat(chat)}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         className="chatxp-load-chat"
//                       >
//                         Load
//                       </motion.button>
//                       <motion.button
//                         onClick={() => handleDeleteChat(chat.id)}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         className="chatxp-delete-chat"
//                       >
//                         <Trash2 size={16} />
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 ))
//               ) : (
//                 <p className="chatxp-no-chats">No saved chats found.</p>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Settings Modal */}
//       {showSettings && (
//         <motion.div
//           className="chatxp-settings-modal"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <div className="chatxp-settings-header">
//             <h2>Settings</h2>
//             <motion.button
//               onClick={() => setShowSettings(false)}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               aria-label="Close settings"
//             >
//               <X size={20} />
//             </motion.button>
//           </div>
//           <div className="chatxp-settings-tabs">
//             <button
//               className={settingsTab === "Appearance" ? "active" : ""}
//               onClick={() => setSettingsTab("Appearance")}
//             >
//               Appearance
//             </button>
//             <button
//               className={settingsTab === "Chat" ? "active" : ""}
//               onClick={() => setSettingsTab("Chat")}
//             >
//               Chat
//             </button>
//           </div>
//           {settingsTab === "Appearance" && (
//             <div className="chatxp-settings-content">
//               <label>Theme</label>
//               <div className="chatxp-theme-toggle">
//                 <motion.div
//                   className={`chatxp-theme-switch ${isDarkMode ? "dark" : "light"}`}
//                   onClick={() => setIsDarkMode(!isDarkMode)}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <motion.div
//                     className="chatxp-theme-switch-handle"
//                     layout
//                     transition={{ type: "spring", stiffness: 700, damping: 30 }}
//                   />
//                   <Sun size={20} className="chatxp-theme-icon light" />
//                   <Moon size={20} className="chatxp-theme-icon dark" />
//                 </motion.div>
//               </div>
//             </div>
//           )}
//           {settingsTab === "Chat" && (
//             <div className="chatxp-settings-content">
//               <button onClick={() => setShowClearChatModal(true)}>
//                 <Trash2 size={16} /> Clear Chat
//               </button>
//               {showClearChatModal && (
//                 <motion.div
//                   className="chatxp-clear-chat-modal"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                 >
//                   <h3>Clear Chat</h3>
//                   <p>Are you sure you want to clear the chat? This action cannot be undone.</p>
//                   <div className="chatxp-clear-chat-actions">
//                     <button onClick={() => setShowClearChatModal(false)}>Cancel</button>
//                     <button
//                       onClick={() => {
//                         handleTabClick("Clear Chat", "");
//                         setShowClearChatModal(false);
//                       }}
//                     >
//                       Clear
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </div>
//           )}
//         </motion.div>
//       )}

//       {/* Webcam Modal */}
//       {showWebcamModal && (
//         <motion.div
//           className="chatxp-webcam-modal"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <div className="chatxp-webcam-header">
//             <h3>Take a Selfie</h3>
//             <button onClick={() => setShowWebcamModal(false)}>
//               <X size={20} />
//             </button>
//           </div>
//           {!capturedImage ? (
//             <div className="chatxp-webcam-capture">
//               {webcamError && <p className="chatxp-webcam-error">{webcamError}</p>}
//               <React.Suspense fallback={<div>Loading webcam...</div>}>
//                 <LazyWebcam
//                   audio={false}
//                   ref={webcamRef}
//                   screenshotFormat="image/jpeg"
//                   width="100%"
//                   videoConstraints={{
//                     width: 1280,
//                     height: 720,
//                     facingMode: "user",
//                   }}
//                   onUserMediaError={(error) => {
//                     console.error("Webcam error:", error);
//                     let errorMessage = "Unable to access webcam. Please check permissions and try again.";
//                     if (error.name === "NotAllowedError") {
//                       errorMessage = "Camera access denied. Please allow camera permissions in your browser settings.";
//                     } else if (error.name === "NotFoundError") {
//                       errorMessage = "No camera found. Please connect a camera and try again.";
//                     }
//                     setWebcamError(errorMessage);
//                   }}
//                 />
//               </React.Suspense>
//               <motion.button
//                 onClick={captureImage}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="chatxp-capture-button"
//               >
//                 Capture
//               </motion.button>
//             </div>
//           ) : (
//             <div className="chatxp-webcam-edit">
//               <ReactCrop
//                 src={capturedImage}
//                 crop={crop}
//                 onChange={(newCrop) => setCrop(newCrop)}
//                 onComplete={(c) => setCompletedCrop(c)}
//               >
//                 <img
//                   src={capturedImage}
//                   alt="Captured selfie"
//                   style={{ filter: `brightness(${brightness}%)` }}
//                 />
//               </ReactCrop>
//               <div className="chatxp-webcam-controls">
//                 <label>Brightness: {brightness}%</label>
//                 <input
//                   type="range"
//                   min="50"
//                   max="150"
//                   value={brightness}
//                   onChange={(e) => setBrightness(e.target.value)}
//                 />
//               </div>
//               <canvas ref={canvasRef} style={{ display: "none" }} />
//               <div className="chatxp-webcam-actions">
//                 <motion.button
//                   onClick={() => {
//                     setCapturedImage(null);
//                     setBrightness(100);
//                   }}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="chatxp-retake-button"
//                 >
//                   Retake
//                 </motion.button>
//                 <motion.button
//                   onClick={saveImage}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="chatxp-save-button"
//                 >
//                   Save to Gallery
//                 </motion.button>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ChatXP;