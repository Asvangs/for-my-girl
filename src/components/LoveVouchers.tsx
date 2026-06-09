import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, CheckCircle, Gift } from "lucide-react";
import { LoveVoucher } from "../types";

export default function LoveVouchers() {
  const [vouchers, setVouchers] = useState<LoveVoucher[]>([
    {
      id: "v1",
      title: "An Infinite Hand-Hold",
      desc: "Good for one continuous walk, fingers locked, with absolute peace of mind. Interlocks guaranteed.",
      emoji: "🤝",
      claimed: false,
    },
    {
      id: "v2",
      title: "Late Night Sweet Cravings Run",
      desc: "Redeemable at any hour. I will drive us, buy your favorite dessert, and listen to all your thoughts.",
      emoji: "🍦",
      claimed: false,
    },
    {
      id: "v3",
      title: "The Ultimate 'No Argument' Shield",
      desc: "If we ever start a petty disagreement, present this card. I will instantly surrender, smile, and hug you.",
      emoji: "🛡️",
      claimed: false,
    },
    {
      id: "v4",
      title: "Handmade Dinner & Movie Night",
      desc: "I will cook your favorite dish, set up candles, let you pick the movies, and treat you like a queen.",
      emoji: "🍝",
      claimed: false,
    },
    {
      id: "v5",
      title: "Warm Blanket Fort & 3-Hour Cuddles",
      desc: "A safe virtual hideout made of string lights, fluffy pillows, and me wrapping myself around you snugly.",
      emoji: "🏰",
      claimed: false,
    },
    {
      id: "v6",
      title: "Deep Listening Session",
      desc: "Zero advice, zero defense, just total attention as you vent about everything, while I massage your hands.",
      emoji: "💆‍♀️",
      claimed: false,
    },
  ]);

  const [claimedId, setClaimedId] = useState<string | null>(null);

  const handleClaim = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, claimed: true } : v))
    );
    setClaimedId(id);
    setTimeout(() => {
      setClaimedId(null);
    }, 3000);
  };

  const claimedVoucher = vouchers.find((v) => v.id === claimedId);

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4" id="romantic-love-vouchers">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#ca405b] text-xs font-semibold tracking-wider uppercase border border-rose-100 mb-2">
          <Gift className="w-3 h-3 text-[#ca405b]" /> Interactive Peace Offerings
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#8a4f58] tracking-tight">
          Love Vouchers For You
        </h2>
        <p className="text-sm text-[#9b7277] max-w-md mx-auto mt-2 font-sans">
          These are sacred promises you can present to me anytime. Redeem one whenever you want to smile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vouchers.map((voucher) => (
          <motion.div
            key={voucher.id}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={`relative p-6 rounded-2xl border bg-white shadow-sm flex flex-col justify-between overflow-hidden transition-all duration-300 ${
              voucher.claimed
                ? "border-emerald-100 bg-emerald-50/20 opacity-85"
                : "border-[#f0deda] bg-radial-to-bl from-white via-white to-[#fffcfc] hover:shadow-md hover:border-[#f2aeb9]"
            }`}
          >
            {/* Ticket punched effect corners */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-[#fffbfa] border-r border-[#ebd2cb]" />
            <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-[#fffbfa] border-l border-[#ebd2cb]" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl p-2 bg-[#faf3f1] rounded-2xl inline-block">
                  {voucher.emoji}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-[#caa0a6] uppercase">
                  No. {voucher.id}
                </span>
              </div>

              <h3 className="font-serif text-lg font-medium text-[#6c424a] mb-2 leading-tight">
                {voucher.title}
              </h3>
              <p className="text-xs text-[#8c676c] font-sans leading-relaxed mb-6">
                {voucher.desc}
              </p>
            </div>

            <div className="mt-auto pt-2 border-t border-dashed border-[#f3e3df]">
              {voucher.claimed ? (
                <div className="flex items-center justify-center gap-1.5 py-2 text-emerald-600 font-sans text-xs font-medium">
                  <CheckCircle className="w-4 h-4 fill-emerald-50" /> Claimed & Locked
                </div>
              ) : (
                <button
                  onClick={() => handleClaim(voucher.id)}
                  className="w-full py-2 bg-rose-50 hover:bg-[#ca405b] hover:text-white transition-all text-[#ca405b] font-sans text-xs font-semibold rounded-xl cursor-pointer text-center outline-none"
                >
                  Confirm & Claim Promise
                </button>
              )}
            </div>

            {/* Vintage style watermark */}
            <div className="absolute right-4 bottom-12 text-[4rem] pointer-events-none opacity-[0.03] select-none font-serif font-bold italic">
              VALENTINE
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sweet popup animation showing claimed voucher */}
      <AnimatePresence>
        {claimedId && claimedVoucher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#ebd2cb] shadow-2xl text-center relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 via-sky-300 to-rose-400 animate-pulse" />
              
              <div className="text-6xl mb-4">{claimedVoucher.emoji}</div>
              
              <h3 className="font-serif text-2xl text-[#8a4f58] mb-2">
                Promise Redeem Success!
              </h3>
              
              <p className="text-sm text-[#5a3e42] mb-6">
                You just claimed <strong className="text-[#ca405b]">{claimedVoucher.title}</strong>. <br />
                My heart is officially bound to fulfill this request. Show this to me next time we speak, my love.
              </p>

              <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-full">
                <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" /> Bound & active in our records
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
