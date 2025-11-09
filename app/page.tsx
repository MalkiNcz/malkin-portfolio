'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaInstagram, FaGithub, FaSteam, FaReact, FaNodeJs, FaGitAlt, FaPhp, FaLaravel } from "react-icons/fa";
import { SiTailwindcss, SiGodotengine } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

const techIcons = {
  "React": FaReact,
  "TailwindCSS": SiTailwindcss,
  "Node.js": FaNodeJs,
  "Godot": SiGodotengine,
  "C#": TbBrandCSharp,
  "Git": FaGitAlt,
  "PHP": FaPhp,
  "Laravel": FaLaravel,
};

const techColors = {
  React: "#61DBFB",
  "TailwindCSS": "#38B2AC",
  "Node.js": "#68A063",
  Godot: "#478CBF",
  "C#": "#9B4F96",
  Git: "#F1502F",
  PHP: "#787CB5",
  Laravel: "#FF2D20",
};

export default function Portfolio() {
  const [showIntro, setShowIntro] = useState(true);
  const techs: (keyof typeof techIcons)[] = ["React", "TailwindCSS", "Node.js", "Godot", "C#", "Git", "PHP", "Laravel"];

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // cursor
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className =
      "fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference";
    document.body.appendChild(cursor);

    const move = (e: any) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  //snow
  useEffect(() => {
    const canvas = document.getElementById("snowCanvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let flakes: {
      speed: number;
      velY: number;
      velX: number;
      x: number;
      y: number;
      size: number;
      stepSize: number;
      step: number;
      opacity: number;
    }[] = [];
    const flakeCount = 400;
    let mX = -100, mY = -100;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function reset(flake: any) {
      if (canvas) flake.x = Math.floor(Math.random() * canvas.width);
      flake.y = 0;
      flake.size = Math.random() * 3 + 2;
      flake.speed = Math.random() * 1 + 0.5;
      flake.velY = flake.speed;
      flake.velX = 0;
      flake.opacity = Math.random() * 0.5 + 0.3;
    }

    function snow() {
      if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < flakeCount; i++) {
        const flake = flakes[i];
        const dist = Math.sqrt((flake.x - mX) ** 2 + (flake.y - mY) ** 2);
        const minDist = 150;

        if (dist < minDist) {
          const force = minDist / (dist * dist);
          const xcomp = (mX - flake.x) / dist;
          const ycomp = (mY - flake.y) / dist;
          const deltaV = force / 2;
          flake.velX -= deltaV * xcomp;
          flake.velY -= deltaV * ycomp;
        } else {
          flake.velX *= 0.98;
          if (flake.velY <= flake.speed) flake.velY = flake.speed;
          flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;
        }

        flake.y += flake.velY;
        flake.x += flake.velX;

        if (canvas) {
          if (
            flake.y >= canvas.height ||
            flake.y <= 0 ||
            flake.x >= canvas.width ||
            flake.x <= 0
          ) {
            reset(flake);
          }
        }

        if (ctx) {
          ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(snow);
    }

    function init() {
      flakes = [];
      if (canvas) {
        for (let i = 0; i < flakeCount; i++) {
          const x = Math.floor(Math.random() * canvas.width);
          const y = Math.floor(Math.random() * canvas.height);
          const size = Math.random() * 3 + 2;
          const speed = Math.random() * 1 + 0.5;
          const opacity = Math.random() * 0.5 + 0.3;

          flakes.push({
            speed,
            velY: speed,
            velX: 0,
            x,
            y,
            size,
            stepSize: Math.random() / 30,
            step: 0,
            opacity,
          });
        }
        snow();
      }
    }

    canvas.addEventListener("mousemove", (e) => {
      mX = e.clientX;
      mY = e.clientY;
    });

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    init();

    return () => {
      window.removeEventListener("resize", () => { });
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 1 }}
              className="text-5xl font-bold"
            >
              Welcome
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        className="h-screen flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >

        <canvas id="snowCanvas" className="absolute inset-0 w-full h-full z-0" />
        <motion.h1
          className="text-6xl font-extrabold mb-4 z-1"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          Jakub Málek
        </motion.h1>
        <motion.p
          className="text-xl text-gray-400 z-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          Student / Developer
        </motion.p>

        <motion.a
          href="#about"
          className="absolute bottom-10 flex flex-col items-center text-gray-400 hover:text-white transition-colors z-10 cursor-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >


          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaChevronDown size={96} className="text-white" />
          </motion.div>
        </motion.a>
      </motion.section>


      <section id="about" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-gray-400 leading-relaxed">
          Fuck frontend
        </p>
      </section>

      <section id="tech" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {techs.map((tech) => {
            const Icon = techIcons[tech]; 
            const color = techColors[tech];
            return (
              <motion.div
                key={tech}
                className="p-4 bg-gray-900 rounded-2xl hover:bg-gray-800 transition flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                {Icon && <Icon size={40} color={color} />}
                <span>{tech}</span>
              </motion.div>
            );
          })}
        </div>
      </section>


      <section id="projects" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            key={1}
            className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl font-semibold mb-2">Žižkovska lajna</h3>
            <p className="text-gray-400">
              Top-down shooter game
            </p>
          </motion.div>

        </div>
      </section>

      

      <section id="tasks" className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Tasks</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            key={1}
            className="p-6 bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl font-semibold mb-2">Edu tech days</h3>
            <p className="text-gray-400">
              Edut tech days
            </p>
          </motion.div>

        </div>
      </section>

      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Contact me</h2>
      </section>

      <footer className="text-center py-12 text-gray-600 border-t border-gray-800 flex justify-center items-center gap-5 ">
        © {new Date().getFullYear()} Jakub Málek. All rights reserved.
        <motion.a
          href="https://www.instagram.com/malkinw_/"
        >
          <FaInstagram className="hover:text-white transition duration-300 cursor-none" size={50} />
        </motion.a>

        <motion.a
          href="https://github.com/MalkiNcz/"
        >
          <FaGithub className="hover:text-white transition duration-300 cursor-none" size={48} />
        </motion.a>

        <motion.a
          href="https://steamcommunity.com/id/malkin_exe/"
        >
          <FaSteam className="hover:text-white transition duration-300 cursor-none" size={48} />
        </motion.a>

      </footer>
    </div>
  );
}
