export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface LoveVoucher {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  claimed: boolean;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  content: string;
  emoji: string;
}

export interface FallingPetal {
  id: number;
  left: number; // percentage (0 - 100)
  delay: number; // in seconds
  duration: number; // in seconds
  size: number; // in px
  opacity: number;
  rotation: number;
}
