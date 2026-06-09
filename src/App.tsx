/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Mail, MessageCircle, Gift, Compass, RotateCcw } from "lucide-react";
import FallingPetals from "./components/FallingPetals";
import VirtualApologyLetter from "./components/VirtualApologyLetter";
import BoyfriendChatbot from "./components/BoyfriendChatbot";
import LoveVouchers from "./components/LoveVouchers";

interface Memory {
  id: string;
  title: string;
  text: string;
  emoji: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<"letter" | "chat" | "promises" | "memories">("letter");
  const [hugsSent, setHugsSent] = useState(0);
  const [showLoveNote, setShowLoveNote] = useState(false);
  const [dailyReason, setDailyReason] = useState<string | null>(null);

  const keyMemories: Memory[] = [
    {
      id: "m1",
      title: "Your Heart-melting Smile",
      text: "The way your eyes crinkle completely whenever you laugh at something silly. It is the most beautiful scenery in the entire universe to me.",
      emoji: "💖",
    },
    {
      id: "m2",
      title: "The Warmest Hugs",
      text: "Wrapping my arms around you and resting my chin on your head. In those moments, all the loudness of life fades away completely.",
      emoji: "🤗",
    },
    {
      id: "m3",
      title: "How Hard You Try",
      text: "I admire your dedication and beautiful mind so much. Seeing you pursue your dreams and face your hurdles makes me incredibly proud.",
      emoji: "🌟",
    },
    {
      id: "m4",
      title: "Our Quiet Mornings",
      text: "Just talking about simple things or sharing silence with you. With you, even doing absolutely nothing is the best part of my day.",
      emoji: "🌅",
    },
  ];

  const loveReasons = [
    "You have the absolute kindest soul I have ever met in my life.",
    "Your happiness is my absolute number one priority and joy.",
    "The way you look after me and make me want to be a better person.",
    "Your laugh is my absolute favorite song in the world.",
    "You always see the absolute best in everyone, especially in me.",
  ];

  const handleRevealReason = () => {
    const randomReason = loveReasons[Math.floor(Math.random() * loveReasons.length)];
    setDailyReason(randomReason);
    setShowLoveNote(true);
  };

  return (
    <div className="min-h-screen bg-[#fffafa] text-[#4a3538] font-sans pb-16 relative overflow-x-hidden selection:bg-rose-100 selection:text-[#ca405b]">
      
      {/* Dynamic Falling Rose Petals Shower */}
      <FallingPetals />

      {/* Hero Header Section */}
      <header className="relative py-12 md:py-16 text-center max-w-4xl mx-auto px-4 z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-rose-100/80 shadow-xs mb-4"
        >
          <Heart className="w-4 h-4 text-[#ca405b] fill-[#ca405b] animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#8a4f58] font-sans">
            A Safe Space Made Just For You
          </span>
        </motion.div>

        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#623a41] tracking-tight font-semibold"
        >
          I am So Sorry, My Love
        </motion.h1>

        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-lg text-[#855e63] max-w-xl mx-auto mt-4 leading-relaxed font-sans"
        >
          My sweetest girl, my actions made you sad today, and it breaks my heart. I built this lovely little world to remind you of my love and to hold you close. Please stay as long as you need.
        </motion.p>

        {/* Tactile Virtual Interactivity: Hug Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          <button
            onClick={() => {
              setHugsSent((prev) => prev + 1);
            }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ca405b] to-[#e47589] hover:from-[#b0304a] hover:to-[#ca405b] text-white text-sm font-semibold shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            Send Me a Virtual Hug <Heart className="w-4 h-4 fill-white" />
          </button>

          <button
            onClick={handleRevealReason}
            className="px-5 py-2.5 rounded-full bg-white border border-[#f0deda] text-xs font-semibold text-[#8a4f58] hover:bg-rose-50/50 hover:border-[#f2aeb9] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Remind Me Why You Love Me
          </button>
        </motion.div>

        {/* Live Hug Counter Display */}
        {hugsSent > 0 && (
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            className="text-xs font-mono font-medium text-[#ca405b] mt-3"
          >
            {hugsSent} Hug{hugsSent > 1 ? "s" : ""} wrapping around your shoulders holding you snuggly... 💞
          </motion.p>
        )}
      </header>

      {/* Love Reminder Drawer Modal */}
      <AnimatePresence>
        {showLoveNote && dailyReason && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full border border-rose-100 shadow-2xl relative"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-[#ca405b]" />
              </div>
              
              <h3 className="font-serif text-xl font-bold text-[#8a4f58] mb-2">My Golden Promise</h3>
              <p className="text-sm font-sans text-[#5c4044] leading-relaxed mb-6">
                “{dailyReason}”
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleRevealReason}
                  className="flex-1 py-2 border border-stone-200 text-[#8a4f58] text-xs font-sans font-semibold rounded-xl hover:bg-stone-50 cursor-pointer transition-colors"
                >
                  Show Another
                </button>
                <button
                  onClick={() => setShowLoveNote(false)}
                  className="flex-1 py-2 bg-[#ca405b] text-white text-xs font-sans font-semibold rounded-xl hover:bg-[#b0304a] cursor-pointer transition-colors"
                >
                  Lock in My Heart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tab Selector Segment */}
      <div className="max-w-xl mx-auto px-4 mb-2 z-10 relative">
        <label htmlFor="tab-select" className="sr-only">Choose tab menu</label>
        <div className="bg-[#f2e6e3] p-1.5 rounded-full flex gap-1 justify-between shadow-xs">
          <button
            onClick={() => setActiveTab("letter")}
            className={`flex-1 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "letter"
                ? "bg-white text-[#ca405b] shadow-sm"
                : "text-[#8a4f58] hover:text-[#ca405b] hover:bg-white/40"
            }`}
          >
            <Mail className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Apology Letter</span>
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "chat"
                ? "bg-white text-[#ca405b] shadow-sm"
                : "text-[#8a4f58] hover:text-[#ca405b] hover:bg-white/40"
            }`}
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>My Boy Chat</span>
          </button>

          <button
            onClick={() => setActiveTab("promises")}
            className={`flex-1 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "promises"
                ? "bg-white text-[#ca405b] shadow-sm"
                : "text-[#8a4f58] hover:text-[#ca405b] hover:bg-white/40"
            }`}
          >
            <Gift className="w-4 h-4 shrink-0" />
            <span>Promises</span>
          </button>

          <button
            onClick={() => setActiveTab("memories")}
            className={`flex-1 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "memories"
                ? "bg-white text-[#ca405b] shadow-sm"
                : "text-[#8a4f58] hover:text-[#ca405b] hover:bg-white/40"
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Our Lane</span>
          </button>
        </div>
      </div>

      {/* Main Tab Panels with Transition animations */}
      <main className="relative z-10 min-h-[450px]">
        <AnimatePresence mode="wait">
          {activeTab === "letter" && (
            <motion.div
              key="tab-letter"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <VirtualApologyLetter />
            </motion.div>
          )}

          {activeTab === "chat" && (
            <motion.div
              key="tab-chat"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BoyfriendChatbot />
            </motion.div>
          )}

          {activeTab === "promises" && (
            <motion.div
              key="tab-promises"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <LoveVouchers />
            </motion.div>
          )}

          {activeTab === "memories" && (
            <motion.div
              key="tab-memories"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto px-4 my-8"
            >
              <div className="text-center mb-10">
                <h2 className="font-serif text-3xl text-[#8a4f58] tracking-tight">
                  Adored Memory Lane
                </h2>
                <p className="text-sm text-[#9b7277] max-w-sm mx-auto mt-2 font-sans">
                  Whenever we hit a bumpy road, let's remember the magic of where we have been and why our map matches.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyMemories.map((m) => (
                  <div
                    key={m.id}
                    className="p-6 rounded-2xl bg-white/75 border border-[#ebd8d5] backdrop-blur-xs flex gap-4 transition-all hover:bg-white hover:shadow-xs"
                  >
                    <span className="text-3xl p-3 bg-rose-50/50 rounded-xl max-h-14 flex items-center justify-center shrink-0">
                      {m.emoji}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-medium text-[#7c4d53] mb-1.5">
                        {m.title}
                      </h3>
                      <p className="text-sm text-[#6c5155] leading-relaxed font-sans">
                        {m.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12 p-8 rounded-3xl bg-radial-to-r from-red-50 to-[#fff8f8] border border-[#f5ded9] max-w-2xl mx-auto">
                <Heart className="w-8 h-8 text-[#ca405b] fill-[#ca405b] mx-auto mb-3" />
                <h3 className="font-serif text-lg text-[#8a4f58] font-semibold">
                  A Promise of Tomorrow
                </h3>
                <p className="text-xs md:text-sm text-[#8c676c] font-sans mt-2 max-w-md mx-auto leading-relaxed">
                  I will listen better, learn your heart strings better, and do everything in my ability to paint over today's gloom with a bright, warm sunshine of absolute adoration.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full text-center py-8 border-t border-[#f2deda]/40 mt-12 z-10 relative">
        <p className="text-xs text-[#a28489] font-sans">
          Created with endless love & a sincere heart for my beautiful girl.
        </p>
      </footer>
    </div>
  );
}

