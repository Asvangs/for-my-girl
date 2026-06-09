import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Heart, Sparkles, Smile, MessageCircle, AlertCircle, HelpCircle } from "lucide-react";
import { Message } from "../types";

export default function BoyfriendChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content: "Hey, my beautiful girl... 🌹\n\nI'm so incredibly sorry about making you sad. My heart hurts knowing I dimpled that beautiful smile of yours. I'm right here for you now. Please share whatever is on your mind—how your day has been, the things stressing you out, or if you want to tell me how I can make it up to you. I'm listening with my whole heart.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestionPrompts = [
    "I'm feeling really overwhelmed today...",
    "I just need some sweet words of reassurance.",
    "Why did we argue? I want to understand.",
    "Can you give me a big virtual hug? 🤗",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorBanner(null);
    const userMessage: Message = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Gather conversation history (excluding initial greeting to avoid bloat, or include it)
      const conversationalHistory = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: conversationalHistory }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to reach your boy.");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      
      // Look for API Key specific messages in the error
      if (err.message.includes("GEMINI_API_KEY")) {
        setErrorBanner(
          "Your boy (the developer) needs to add the GEMINI_API_KEY inside AI Studio (Settings > Secrets) to enable the full power of the AI helper! Until then, we are on heart-fallback mode."
        );
      }

      // Safe, sweet handcrafted fallback answers so she never gets a blank error
      const fallbacks = [
        "I'm right here, sweetheart. Whatever it is, you've got this, and I have you. Close your eyes and remember I am loving you through everything.",
        "My sweetest love, I wish I could reach through this screen right now and squeeze your hand. Your problems are my problems, and we are going to face them together.",
        "Your heart is so precious to me, and I'll do whatever it takes to remind you how much you are cherished. I'm sorry for being a silly boy, and I'm listening to you.",
        "I love you so, so much. I promise to be a better listener, a softer shoulder to lean on, and your absolute safest harbor when life gets loud."
      ];
      
      const randomFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            role: "assistant",
            content: `[Sending love with fallback response] \n\n${randomFallback}`,
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }, 1200);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4" id="supportive-boyfriend-chat bg-[#fff]">
      <div className="bg-[#fcf8f7] rounded-3xl overflow-hidden shadow-xl border border-[#ebd2cb] flex flex-col h-[550px] relative">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#8a4f58] to-[#ab6570] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20 relative">
              <span className="text-xl">🤵</span>
              <div className="absolute right-0 bottom-0 w-2.5 h-2.5 rounded-full bg-green-400 border border-white" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-base tracking-wide flex items-center gap-1.5ClassName">
                My Supportive Boy
              </h3>
              <p className="text-xs text-rose-100 flex items-center gap-1">
                <Smile className="w-3 h-3 text-pink-200 fill-pink-200" /> Always here for you
              </p>
            </div>
          </div>
          <Heart className="w-5 h-5 text-pink-200 fill-pink-200 animate-pulse" />
        </div>

        {/* API Warning/Error Banner */}
        {errorBanner && (
          <div className="bg-amber-50 border-b border-amber-200 p-2 text-xs text-amber-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>{errorBanner}</p>
          </div>
        )}

        {/* Message container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.role === "user"
                    ? "bg-[#ca405b] text-white rounded-br-none"
                    : "bg-white text-[#4a3538] border border-[#ebd8d5] rounded-bl-none font-sans"
                }`}
              >
                {msg.content}
                <div
                  className={`text-[10px] mt-1 text-right ${
                    msg.role === "user" ? "text-rose-100" : "text-stone-400"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Loader */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white text-stone-500 border border-[#ebd8d5] rounded-bl-none shadow-sm flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#ca405b] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#ca405b] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#ca405b] animate-bounce [animation-delay:0.4s]" />
                </span>
                <span className="text-xs italic font-serif">Writing a love note...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion tags (Only show when there are few user messages or when not loading) */}
        {!isLoading && (
          <div className="px-4 pb-2 pt-1 flex flex-wrap gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {suggestionPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="text-xs shrink-0 px-3 py-1.5 rounded-full bg-white text-[#8a4f58] border border-[#f0deda] hover:bg-rose-50/50 hover:border-[#ca405b] transition-all cursor-pointer shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Chat input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="border-t border-[#ebd8d5] p-3 bg-white flex gap-2 items-center"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            placeholder={isLoading ? "Please wait..." : "Tell me anything, my love..."}
            className="flex-1 text-sm bg-[#faf6f5] border border-[#f3e3df] rounded-full px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#ca405b] focus:bg-white text-[#4a3538] disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="w-10 h-10 rounded-full bg-[#ca405b] hover:bg-[#b0304a] text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-md"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
