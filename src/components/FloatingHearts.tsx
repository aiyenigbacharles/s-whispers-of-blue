import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: number }[]>([]);

  useEffect(() => {
    // Generate 5 floating hearts with random positions and delays
    const generatedHearts = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 90 + 5}%`,
      delay: Math.random() * 8,
    }));
    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="floating-heart text-accent/20 fill-accent/20"
          style={{
            left: heart.left,
            animationDelay: `${heart.delay}s`,
            width: "24px",
            height: "24px",
          }}
        />
      ))}
    </div>
  );
}
