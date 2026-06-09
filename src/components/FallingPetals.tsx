import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FallingPetal } from "../types";

export default function FallingPetals() {
  const [petals, setPetals] = useState<FallingPetal[]>([]);

  useEffect(() => {
    // Generate static petals with distinct randomized layouts
    const initialPetals: FallingPetal[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 15, // 10s to 25s for calm floating
      size: 10 + Math.random() * 16, // 10px to 26px
      opacity: 0.4 + Math.random() * 0.5,
      rotation: Math.random() * 360,
    }));
    setPetals(initialPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full"
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 0.85}px`,
            // Soft gradient of romantic rose-petal colors
            background: "linear-gradient(135deg, #f2aeb9 0%, #e67d90 80%, #d85c74 100%)",
            borderRadius: "50% 0% 50% 50%", // petal shape!
            transform: `rotate(${petal.rotation}deg)`,
            opacity: petal.opacity,
            top: "-50px",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [
              "0px",
              `${Math.sin(petal.id) * 30}px`,
              `${Math.cos(petal.id) * 45}px`,
              `${Math.sin(petal.id) * 30}px`
            ],
            rotate: [petal.rotation, petal.rotation + 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
