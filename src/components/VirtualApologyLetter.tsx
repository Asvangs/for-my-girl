import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Mail, Inbox, CornerDownLeft, Sparkles } from "lucide-react";

interface InteractiveWord {
  phrase: string;
  revelation: string;
}

export default function VirtualApologyLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<InteractiveWord | null>(null);

  const keyDetails: Record<string, string> = {
    "my mistake": "I spoke without thinking and let my frustration cloud my love. You deserved patience and gentle words, and I failed to give you that. I am so sorry.",
    "heart ache": "My chest physically felt heavy seeing you sad. Your smile is my daily reassurance, and realizing I was the reason it went away broke my own heart.",
    "promise": "I promise to pause before reacting, to listen actively to understand rather than to defend, and to treat your gentle heart with the profound care it deserves.",
    "forgive me": "No rush at all, my love. Take all the time you need. I will be right here, loving you, working to rebuild your trust, and waiting to hold you tight.",
  };

  const handleWordClick = (phrase: string) => {
    setSelectedWord({
      phrase,
      revelation: keyDetails[phrase] || "I love you more than words could ever convey.",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4" id="apology-letter-section">
      <div className="text-center mb-6">
        <h2 className="font-serif text-3xl md:text-4xl text-[#8a4f58] tracking-tight mb-2">
          A Message Sealed With Love
        </h2>
        <p className="text-sm text-[#9b7277] font-sans">
          Click the love seal to open up my heart
        </p>
      </div>

      <div className="relative flex justify-center items-center min-h-[380px] md:min-h-[420px]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Envelope state */
            <motion.div
              key="sealed-envelope"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer group relative w-full max-w-md bg-gradient-to-br from-[#fbf5f2] to-[#f4e2db] rounded-2xl shadow-xl border border-[#ebd2cb] p-8 flex flex-col items-center justify-center text-center aspect-[1.5/1]"
            >
              <div className="absolute top-4 left-4 text-xs font-mono text-[#bfa099]">
                To: My Beautiful Girl
              </div>
              <div className="absolute top-4 right-4 text-xs font-mono text-[#bfa099]">
                With Love
              </div>

              {/* Decorative envelope line corners */}
              <div className="absolute inset-2 border border-dashed border-[#e4cac2] rounded-xl pointer-events-none opacity-60" />

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f294a5] to-[#db5a74] shadow-md flex items-center justify-center mb-4 relative z-10 group-hover:from-[#db5a74] group-hover:to-[#ca405b] transition-all"
              >
                <Heart className="w-9 h-9 text-white fill-white" />
              </motion.div>

              <p className="font-serif text-lg text-[#7c4d53] font-medium group-hover:text-[#ca405b] transition-colors">
                Open My Heart's Letter
              </p>
              <p className="text-xs text-[#9b7277] mt-2 italic flex items-center gap-1 bg-white/50 px-3 py-1 rounded-full border border-[#ebd2cb]/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Tap to unseal the wax
              </p>
            </motion.div>
          ) : (
            /* Unfolded active letter state */
            <motion.div
              key="unfolded-letter"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, type: "spring", damping: 20 }}
              className="w-full bg-[#fdfaf8] rounded-2xl shadow-xl border border-[#ebd0c7] overflow-hidden flex flex-col relative"
            >
              {/* Back side of Envelope background paper */}
              <div className="h-2 bg-gradient-to-r from-[#ca405b] via-[#eed8d5] to-[#f294a5]" />

              <div className="p-6 md:p-8 flex-1 font-serif text-base lg:text-lg leading-relaxed text-[#5a3e42] relative select-text">
                <p className="mb-4 text-sm font-sans tracking-wider text-[#9b7277] font-semibold uppercase flex items-center justify-between border-b border-[#f3e3df] pb-2">
                  <span>Dearest Heart,</span>
                  <span className="text-xs lowercase italic font-light font-serif">Sealed today</span>
                </p>

                <p className="mb-4">
                  I am writing this because my words failed me earlier, and I couldn't bear to see you unhappy—especially knowing that is because of me. Creating a shadow in your beautiful eyes is the biggest regret I have today. I made a {" "}
                  <button
                    onClick={() => handleWordClick("my mistake")}
                    className="underline decoration-wavy decoration-[#e38596] hover:text-[#ca405b] font-medium cursor-pointer transition-colors px-1 bg-pink-50 rounded"
                    title="Tap to read my thoughts"
                  >
                    my mistake
                  </button>
                  , my love, and I am so, so sorry.
                </p>

                <p className="mb-4">
                  When I look at you, I see my entire world. You are my voice of reason, my warmth on cold days, and the most gentle soul I have ever known. Seeing you sad makes my{" "}
                  <button
                    onClick={() => handleWordClick("heart ache")}
                    className="underline decoration-wavy decoration-[#e38596] hover:text-[#ca405b] font-medium cursor-pointer transition-colors px-1 bg-pink-50 rounded"
                    title="Tap to read my thoughts"
                  >
                    heart ache
                  </button>
                  {" "}in a way I can't describe, and it reminds me how incredibly precious your happiness is to me.
                </p>

                <p className="mb-4">
                  I give you my absolute{" "}
                  <button
                    onClick={() => handleWordClick("promise")}
                    className="underline decoration-wavy decoration-[#e38596] hover:text-[#ca405b] font-medium cursor-pointer transition-colors px-1 bg-pink-50 rounded"
                    title="Tap to read my thoughts"
                  >
                    promise
                  </button>
                  {" "}to represent a safer, more listening, and kinder boyfriend for you. I will learn to be better, to set my stubbornness aside, and to cherish your peace and joy above everything else.
                </p>

                <p className="mb-6">
                  Will you please{" "}
                  <button
                    onClick={() => handleWordClick("forgive me")}
                    className="underline decoration-dotted decoration-2 decoration-[#ca405b] hover:text-[#ca405b] font-semibold py-0.5 px-2 bg-rose-100/50 hover:bg-rose-100 rounded text-[#ca405b] cursor-pointer inline-flex items-center gap-1 transition-all"
                  >
                    forgive me <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>{" "}
                  and let this boy love you with everything he has?
                </p>

                <div className="mt-8 border-t border-[#f3e3df] pt-4 flex justify-between items-end">
                  <div>
                    <span className="font-sans text-xs text-[#b09196] block italic">Warmest thoughts,</span>
                    <span className="font-serif italic font-semibold text-xl text-[#7c4d53]">Your Boy 🌹</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setSelectedWord(null);
                    }}
                    className="text-xs font-sans text-[#a5868b] hover:text-[#ca405b] flex items-center gap-1 bg-stone-100 hover:bg-stone-200/60 px-3 py-1.5 rounded-lg border border-stone-200/50 transition-colors cursor-pointer"
                  >
                    <CornerDownLeft className="w-3 h-3" /> Wrap it back
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Highlighted Word Reflection Popup Modals */}
        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-[#fffdfd]/95 backdrop-blur-sm rounded-2xl border border-[#ebd0c7]/80 p-8 flex flex-col justify-center items-center text-center z-20"
            >
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-[#ca405b] fill-rose-100" />
              </div>
              <h4 className="font-serif italic text-xl text-[#ca405b] mb-3 capitalize flex items-center gap-2">
                &ldquo;{selectedWord.phrase}&rdquo;
              </h4>
              <p className="text-[#6e5356] font-sans text-base max-w-md leading-relaxed">
                {selectedWord.revelation}
              </p>
              <button
                onClick={() => setSelectedWord(null)}
                className="mt-6 px-5 py-2 bg-[#ca405b] hover:bg-[#b0304a] text-white text-xs font-sans font-medium tracking-larger uppercase rounded-full shadow-md transition-colors cursor-pointer"
              >
                Return to Letter
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
