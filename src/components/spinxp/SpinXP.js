import React from 'react'

const SpinXP = () => {
  return (
    <div>
      
    </div>
  )
}

export default SpinXP


// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import Confetti from "react-confetti"; // Add this for celebratory effects
// import "./spinxp.css";

// const useLocalStorage = (key, initialValue) => {
//   const [value, setValue] = useState(() => {
//     try {
//       const item = localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.error(`Error reading ${key} from localStorage:`, error);
//       return initialValue;
//     }
//   });

//   const setStoredValue = useCallback(
//     (newValue) => {
//       try {
//         setValue(newValue);
//         localStorage.setItem(key, JSON.stringify(newValue));
//       } catch (error) {
//         console.error(`Error writing ${key} to localStorage:`, error);
//       }
//     },
//     [key]
//   );

//   return [value, setStoredValue];
// };

// const SpinXPComponent = () => {
//   const [rotation, setRotation] = useState(0);
//   const [isSpinning, setIsSpinning] = useState(false);
//   const [xp, setXp] = useLocalStorage("xp", 0);
//   const [level, setLevel] = useLocalStorage("level", 1);
//   const [spinsLeft, setSpinsLeft] = useLocalStorage("spinsLeft", 3);
//   const [spinCount, setSpinCount] = useLocalStorage("spinCount", 0);
//   const [cards, setCards] = useLocalStorage("cards", []);
//   const [result, setResult] = useState("");
//   const [unlockedFeatures, setUnlockedFeatures] = useLocalStorage(
//     "unlockedFeatures",
//     ["Dashboard"]
//   );
//   const [activeTab, setActiveTab] = useState("Dashboard");
//   const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
//   const [streak, setStreak] = useLocalStorage("streak", 0);
//   const [lastPlay, setLastPlay] = useLocalStorage("lastPlay", null);
//   const [username, setUsername] = useLocalStorage("username", "Player");
//   const [customKeywords, setCustomKeywords] = useLocalStorage(
//     "customKeywords",
//     ["SEO", "Rank", "Traffic"]
//   );
//   const [showTutorial, setShowTutorial] = useLocalStorage("showTutorial", true);
//   const [powerUps, setPowerUps] = useLocalStorage("powerUps", {
//     doubleXP: 0,
//     extraSpin: 0,
//   });
//   const [quests, setQuests] = useLocalStorage("quests", []);
//   const [spinStreak, setSpinStreak] = useState(0);
//   const [lastSpinTime, setLastSpinTime] = useState(null);
//   const [wheelLevel, setWheelLevel] = useLocalStorage("wheelLevel", 1);
//   const [seasonProgress, setSeasonProgress] = useLocalStorage(
//     "seasonProgress",
//     0
//   );
//   const [backgroundTheme, setBackgroundTheme] = useLocalStorage(
//     "backgroundTheme",
//     "default"
//   );
//   const [eventActive, setEventActive] = useLocalStorage("eventActive", false);
//   const [seoNotebook, setSeoNotebook] = useLocalStorage("seoNotebook", []); // New feature

//   const baseSegments = [
//     { label: "50 XP", value: 50 * wheelLevel },
//     { label: "SEO Card", value: 0 },
//     { label: "Power-Up", value: 0 },
//     {
//       label: "SEO Tip",
//       value: 0,
//       tip: "Use long-tail keywords to target niche audiences.",
//     },
//     {
//       label: "Keyword Research",
//       value: 75 * wheelLevel,
//       lesson: "Find keywords with high search volume and low competition.",
//     },
//     ...(eventActive ? [{ label: "Event Bonus", value: 200 }] : []),
//   ];

//   const wheelSegments = useMemo(() => {
//     return [
//       ...baseSegments,
//       ...customKeywords.map((k) => ({ label: k, value: 75 * wheelLevel })),
//     ];
//   }, [customKeywords, wheelLevel, eventActive]);

//   const seoCardTemplates = [
//     {
//       id: "seo1",
//       keyword: "SEO",
//       rank: 85,
//       searchVolume: 15000,
//       competition: 0.65,
//       trend: [50, 60, 70, 85],
//       tip: "Optimize meta tags to boost this keyword’s rank.",
//     },
//     {
//       id: "rank1",
//       keyword: "Rank",
//       rank: 92,
//       searchVolume: 8000,
//       competition: 0.45,
//       trend: [80, 85, 90, 92],
//       tip: "Build backlinks to improve ranking stability.",
//     },
//     {
//       id: "traffic1",
//       keyword: "Traffic",
//       rank: 78,
//       searchVolume: 20000,
//       competition: 0.75,
//       trend: [60, 65, 70, 78],
//       tip: "Create content hubs to drive organic traffic.",
//     },
//   ];

//   const sanitizeInput = (input) => {
//     return input.replace(/[<>&;]/g, "");
//   };

//   const spinWheel = () => {
//     if (isSpinning || spinsLeft <= 0) return;
//     setIsSpinning(true);
//     setSpinsLeft((prev) => prev - 1);
//     setSpinCount((prev) => prev + 1);
//     const randomDeg = Math.floor(Math.random() * 360) + 1440;
//     setRotation(rotation + randomDeg);
//     updateSpinStreak();
//     updateStreak();
//     updateQuests();

//     setTimeout(() => {
//       const segmentIndex = Math.floor(
//         ((randomDeg % 360) / 360) * wheelSegments.length
//       );
//       const outcome = wheelSegments[segmentIndex];
//       handleOutcome(outcome);
//       setIsSpinning(false);
//     }, 5000);
//   };

//   const handleOutcome = (outcome) => {
//     let finalValue = powerUps.doubleXP > 0 ? outcome.value * 2 : outcome.value;
//     if (outcome.label === "SEO Card") {
//       const newCard =
//         seoCardTemplates[Math.floor(Math.random() * seoCardTemplates.length)];
//       setCards((prev) => [...prev, newCard]);
//       setResult(`Collected ${newCard.keyword} Card! Tip: ${newCard.tip}`);
//     } else if (outcome.label === "SEO Tip") {
//       setSeoNotebook((prev) => [...prev, outcome.tip]);
//       setResult(`Learned: ${outcome.tip}`);
//     } else if (outcome.label === "Power-Up") {
//       const powerUpType = Math.random() > 0.5 ? "doubleXP" : "extraSpin";
//       setPowerUps((prev) => ({
//         ...prev,
//         [powerUpType]: prev[powerUpType] + 1,
//       }));
//       setResult(
//         `Gained ${
//           powerUpType === "doubleXP" ? "Double XP" : "Extra Spin"
//         } Power-Up!`
//       );
//     } else if (outcome.value > 0) {
//       setXp((prev) => prev + finalValue);
//       setSeasonProgress((prev) => prev + finalValue);
//       setResult(
//         `Won ${outcome.label}! +${finalValue} XP${
//           powerUps.doubleXP > 0 ? " (Doubled)" : ""
//         }`
//       );
//     }
//     if (powerUps.doubleXP > 0)
//       setPowerUps((prev) => ({ ...prev, doubleXP: prev.doubleXP - 1 }));
//     updateLevel();
//   };

//   const updateLevel = () => {
//     setLevel((prev) => {
//       const newLevel = Math.floor(xp / 500) + 1;
//       if (newLevel > prev) {
//         setResult(`Level Up! Reached Level ${newLevel}`);
//         if (newLevel === 2) setUnlockedFeatures((prev) => [...prev, "Cards"]);
//         if (newLevel === 3)
//           setUnlockedFeatures((prev) => [...prev, "Stats", "Notebook"]);
//         if (newLevel === 4)
//           setUnlockedFeatures((prev) => [...prev, "Mini-Game"]);
//         if (newLevel === 5) {
//           setWheelLevel(2);
//           setResult(
//             "Wheel upgraded! Higher XP and advanced SEO rewards unlocked."
//           );
//         }
//         if (newLevel === 6) setBackgroundTheme("cosmic");
//       }
//       return newLevel;
//     });
//   };

//   const updateStreak = () => {
//     const today = new Date().toDateString();
//     if (lastPlay !== today) {
//       const yesterday = new Date();
//       yesterday.setDate(yesterday.getDate() - 1);
//       if (lastPlay === yesterday.toDateString()) {
//         setStreak((prev) => prev + 1);
//         if (streak + 1 >= 3) setXp((prev) => prev + 50 * streak);
//       } else if (!lastPlay) {
//         setStreak(1);
//       } else {
//         setStreak(1);
//       }
//       setLastPlay(today);
//       setSpinsLeft(3);
//       setEventActive(Math.random() > 0.7);
//       if (!quests.length)
//         setQuests([
//           {
//             id: 1,
//             desc: "Collect 5 SEO Cards",
//             goal: 5,
//             progress: cards.length,
//             reward: 200,
//             expires: Date.now() + 86400000,
//           },
//           {
//             id: 2,
//             desc: "Reach Rank 90 on a Card",
//             goal: 90,
//             progress: Math.max(...(cards.map((c) => c.rank) || [0])),
//             reward: 300,
//             expires: Date.now() + 172800000,
//           },
//           {
//             id: 3,
//             desc: "Add 3 Custom Keywords",
//             goal: 3,
//             progress: customKeywords.length,
//             reward: 150,
//             expires: Date.now() + 86400000,
//           },
//         ]);
//     }
//   };

//   const updateSpinStreak = () => {
//     const now = Date.now();
//     if (lastSpinTime && now - lastSpinTime < 30000) {
//       setSpinStreak((prev) => prev + 1);
//       if (spinStreak + 1 === 3) setXp((prev) => prev + 100);
//     } else {
//       setSpinStreak(1);
//     }
//     setLastSpinTime(now);
//   };

//   const updateQuests = () => {
//     setQuests((prev) =>
//       prev
//         .map((q) => ({
//           ...q,
//           progress:
//             q.id === 1
//               ? cards.length
//               : q.id === 2
//               ? Math.max(...(cards.map((c) => c.rank) || [0]))
//               : q.id === 3
//               ? customKeywords.length
//               : q.progress,
//         }))
//         .filter((q) => q.expires > Date.now())
//     );
//   };

//   const tradeCard = (index) => {
//     setCards((prev) => prev.filter((_, i) => i !== index));
//     setXp((prev) => prev + 25);
//     setResult("Traded card for 25 XP!");
//   };

//   const combineCards = () => {
//     if (cards.length < 2) return;
//     setCards((prev) => prev.slice(2));
//     setXp((prev) => prev + 50);
//     setResult("Combined 2 cards for 50 XP!");
//   };

//   const addCustomKeyword = (e) => {
//     e.preventDefault();
//     const rawKeyword = e.target.keyword.value.trim();
//     const keyword = sanitizeInput(rawKeyword);

//     if (!keyword || keyword.length > 10 || customKeywords.includes(keyword)) {
//       setResult("Invalid keyword");
//       return;
//     }

//     if (customKeywords.length >= (level >= 4 ? 5 : 3)) {
//       setResult("Maximum keywords reached (unlock more at Level 4)");
//       return;
//     }

//     setCustomKeywords((prev) => [...prev, keyword]);
//     e.target.keyword.value = "";
//     setResult("Keyword added successfully");
//   };

//   const shareProgress = () => {
//     const text = `${username} has reached Level ${level} with ${xp} XP in Spin XP! Join me at Site.XP!`;
//     navigator.clipboard.writeText(text);
//     setResult("Progress copied to clipboard!");
//   };

//   const playMiniGame = () => {
//     const seoPairs = [
//       { term: "Meta Description", match: "Improves click-through rate" },
//       { term: "Backlinks", match: "Boosts domain authority" },
//       { term: "Keyword Density", match: "Balance for readability and ranking" },
//     ];
//     const shuffledPairs = seoPairs.sort(() => 0.5 - Math.random()).slice(0, 3);
//     const matches = Math.floor(Math.random() * 3) + 1;
//     setXp((prev) => prev + matches * 30);
//     setResult(
//       `Matched ${matches} SEO terms (e.g., "${shuffledPairs[0].term}" → "${
//         shuffledPairs[0].match
//       }") for ${matches * 30} XP!`
//     );
//   };

//   const resetProgress = () => {
//     if (window.confirm("Reset all progress?")) {
//       localStorage.clear();
//       window.location.reload();
//     }
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "Dashboard":
//         return (
//           <div>
//             <p>Welcome, {username}! Spin to earn XP and learn SEO.</p>
//             <p>
//               Streak: {streak} day{streak !== 1 ? "s" : ""} - Bonus:{" "}
//               {streak * 50} XP
//             </p>
//             <p>Spin Streak: {spinStreak}/3</p>
//             <button onClick={resetProgress}>Reset Progress</button>
//           </div>
//         );
//       case "Cards":
//         return (
//           <div className="card-gallery">
//             {cards.map((card, index) => (
//               <div
//                 key={index}
//                 className="seo-card"
//                 role="article"
//                 aria-label={`SEO Card: ${card.keyword}, Rank ${card.rank}`}
//               >
//                 <div className="card-front">
//                   <h3>{card.keyword}</h3>
//                   <p>
//                     Rank: {card.rank} | Search Vol: {card.searchVolume}
//                   </p>
//                   <p>Comp: {card.competition}</p>
//                   <div className="seo-graph">
//                     {card.trend.map((val, i) => (
//                       <div
//                         key={i}
//                         className="bar"
//                         style={{ height: `${val}px` }}
//                         data-value={val}
//                       ></div>
//                     ))}
//                   </div>
//                   <button onClick={() => tradeCard(index)}>
//                     Trade (25 XP)
//                   </button>
//                 </div>
//               </div>
//             ))}
//             {cards.length >= 2 && (
//               <button onClick={combineCards}>Combine 2 Cards (50 XP)</button>
//             )}
//           </div>
//         );
//       case "Stats":
//         return (
//           <div>
//             <p>Spins: {spinCount}</p>
//             <p>Cards Collected: {cards.length}</p>
//             <p>
//               Average XP per Spin: {spinCount ? (xp / spinCount).toFixed(2) : 0}
//             </p>
//           </div>
//         );
//       case "Leaderboard":
//         return (
//           <div>
//             <p>
//               1. {username} - {xp} XP
//             </p>
//             <p>2. SEOPro - 1200 XP</p>
//             <p>3. RankKing - 900 XP</p>
//             <button onClick={shareProgress}>Share Progress</button>
//           </div>
//         );
//       case "Profile":
//         return (
//           <div>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(sanitizeInput(e.target.value))}
//               maxLength={15}
//               placeholder="Set Username"
//             />
//             <form onSubmit={addCustomKeyword}>
//               <input
//                 type="text"
//                 name="keyword"
//                 placeholder="Add Wheel Keyword"
//                 maxLength={10}
//               />
//               <button type="submit">Add</button>
//             </form>
//           </div>
//         );
//       case "Mini-Game":
//         return (
//           <div>
//             <p>Match SEO terms for XP!</p>
//             <button onClick={playMiniGame}>Play Match Game</button>
//           </div>
//         );
//       case "Quests":
//         return (
//           <div>
//             <h3>Quests</h3>
//             {quests.map((q) => (
//               <div
//                 key={q.id}
//                 className={`quest ${q.progress >= q.goal ? "completed" : ""}`}
//               >
//                 <p>
//                   {q.desc} - {q.progress}/{q.goal}
//                 </p>
//                 <p>
//                   Reward: {q.reward} XP - Expires:{" "}
//                   {new Date(q.expires).toLocaleTimeString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         );
//       case "Season":
//         return (
//           <div>
//             <p>Season Progress: {seasonProgress}/5000 XP</p>
//             <p>Rewards: {Math.floor(seasonProgress / 1000)} spins unlocked</p>
//           </div>
//         );
//       case "Notebook":
//         return (
//           <div>
//             <h3>SEO Notebook</h3>
//             {seoNotebook.length ? (
//               seoNotebook.map((tip, i) => <p key={i}>{tip}</p>)
//             ) : (
//               <p>Spin to collect SEO tips!</p>
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className={`spin-xp-container ${
//         darkMode ? "dark-mode" : ""
//       } ${backgroundTheme}`}
//     >
//       {showTutorial && (
//         <div className="tutorial">
//           <p>Step 1: Spin the wheel to earn XP and SEO rewards.</p>
//           <p>Step 2: Collect cards to learn keyword optimization.</p>
//           <p>Step 3: Complete quests for bonus XP!</p>
//           <button onClick={() => setShowTutorial(false)}>Start Playing</button>
//         </div>
//       )}
//       {result.includes("Level Up") && <Confetti />}
//       <button
//         className="theme-toggle"
//         onClick={() => setDarkMode((prev) => !prev)}
//       >
//         {darkMode ? "☀️ Light" : "🌙 Dark"}
//       </button>
//       <h1>Spin XP - Learn SEO</h1>
//       <div className="user-stats">
//         <span className="highlight">XP: {xp}</span>
//         <span className="highlight">Level: {level}</span>
//         <span>Spins Left: {spinsLeft}</span>
//         <span>
//           Power-Ups: Double XP ({powerUps.doubleXP}), Extra Spin (
//           {powerUps.extraSpin})
//         </span>
//       </div>

//       <div className="layout">
//         <div className="sidebar">
//           {unlockedFeatures.map((feature) => (
//             <button
//               key={feature}
//               className={`tab ${activeTab === feature ? "active" : ""}`}
//               onClick={() => setActiveTab(feature)}
//             >
//               {feature}
//             </button>
//           ))}
//           <button
//             className={`tab ${activeTab === "Leaderboard" ? "active" : ""}`}
//             onClick={() => setActiveTab("Leaderboard")}
//           >
//             Leaderboard
//           </button>
//           <button
//             className={`tab ${activeTab === "Profile" ? "active" : ""}`}
//             onClick={() => setActiveTab("Profile")}
//           >
//             Profile
//           </button>
//           <button
//             className={`tab ${activeTab === "Quests" ? "active" : ""}`}
//             onClick={() => setActiveTab("Quests")}
//           >
//             Quests
//           </button>
//           <button
//             className={`tab ${activeTab === "Season" ? "active" : ""}`}
//             onClick={() => setActiveTab("Season")}
//           >
//             Season
//           </button>
//           {powerUps.extraSpin > 0 && (
//             <button
//               onClick={() => {
//                 setSpinsLeft((prev) => prev + 1);
//                 setPowerUps((prev) => ({
//                   ...prev,
//                   extraSpin: prev.extraSpin - 1,
//                 }));
//               }}
//             >
//               Use Extra Spin
//             </button>
//           )}
//         </div>

//         <div className="main-content">
//           <div
//             className="wheel-wrapper"
//             role="region"
//             aria-label="Spin Wheel Game"
//           >
//             <div className="pointer" aria-hidden="true"></div>
//             <div
//               className={`wheel wheel-level-${wheelLevel} ${
//                 isSpinning ? "spinning" : ""
//               }`}
//               style={{ transform: `rotateZ(${rotation}deg)` }}
//               role="list"
//               aria-label="Wheel segments"
//             >
//               {wheelSegments.map((seg, index) => (
//                 <div
//                   key={index}
//                   className={`wheel-segment ${
//                     index % 2 === 0 ? "segment-primary" : "segment-secondary"
//                   }`}
//                   style={{
//                     transform: `rotateZ(${
//                       index * (360 / wheelSegments.length)
//                     }deg) translateY(-50%)`,
//                   }}
//                   role="listitem"
//                 >
//                   <span className="segment-label">{seg.label}</span>
//                 </div>
//               ))}
//             </div>
//             <button
//               className={`spin-button ${
//                 spinsLeft > 0 && !isSpinning ? "pulse" : ""
//               }`}
//               onClick={spinWheel}
//               disabled={isSpinning || spinsLeft <= 0}
//               aria-label={`Spin wheel, ${spinsLeft} spins remaining`}
//             >
//               {isSpinning ? "Spinning..." : `Spin (${spinsLeft} left)`}
//             </button>
//           </div>

//           <div className="tab-content">{renderTabContent()}</div>
//         </div>
//       </div>

//       <div className="result">{result}</div>
//     </div>
//   );
// };

// const SpinXP = React.memo(SpinXPComponent);

// export default SpinXP;
