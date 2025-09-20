

import { motion } from "framer-motion";

export default function WordSlider() {
  const words = [
    "ABSTRACT ART",
    "ARCHITECTURE",
    "GYM FITNESS",
    "ISLAMIC",
    "MOTIVATIONAL",
    "SPACE",
    "VINTAGE",
    "CLASSIC",
    "DIGITAL PAINTING",
    "FLORAL",
    "MUSICAL",
    "BTS",
    "EDUCTAION",
    "CRICKET",
    "GUNS",
    "FORMULA 1",
    "MOTO GP",
    "SUFISM",
    "NBA",
    "CARS",
    "BIKES",
    "ANIME",
    "CARTOON",
    "FOOTBALL",
    "CELEBRITIES",
    "ARMY",
    "COMICS",
    "MOVIE",
    "TV SERIES"
  ];

  const repeatedWords = [...words];

  return (
    <div className="relative bg-secondary h-70 w-full overflow-hidden">
      {/* 🔹 First Diagonal Slider (↘) */}
      <div
        className="absolute left-[-20%] top-[20%] w-[140%] h-[75px]  p-4 bg-primary overflow-hidden"
        style={{ transform: "rotate(10deg)" }}
      >
        <motion.div
          className="whitespace-nowrap text-4xl font-bold orbitron text-accent   flex items-center"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{
            background: "linear-gradient(90deg, #ff006e, #8338ec, #3a86ff)",
            WebkitBackgroundClip: "text",
          }}
        >
          {repeatedWords.map((word, index) => (
            <span key={index} className="mr-8">
              {word} •
            </span>
          ))}
        </motion.div>
      </div>

      {/* 🔹 Second Diagonal Slider (↙) */}
      <div
        className="absolute right-[-20%] top-[20%] w-[140%] h-[75px] p-4 bg-primary overflow-hidden"
        style={{ transform: "rotate(-10deg)" }}
      >
        <motion.div
          className="whitespace-nowrap text-4xl orbitron font-bold text-accent flex items-center"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{
            background: "linear-gradient(90deg, #ffd60a, #ff8500, #ff006e)",
            WebkitBackgroundClip: "text",
            // WebkitTextFillColor: "transparent",
          }}
        >
          {repeatedWords.map((word, index) => (
            <span key={index} className="mr-8">
              {word} •
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
