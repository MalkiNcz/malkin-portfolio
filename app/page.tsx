'use client';
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaInstagram, FaGithub, FaSteam, FaReact, FaNodeJs, FaGitAlt, FaPhp, FaLaravel } from "react-icons/fa";
import { SiTailwindcss, SiGodotengine } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import emailjs from "@emailjs/browser";
import Modal from "@/components/modal";
import Card from "@/components/card";
import Navbar from "@/components/navbar";
import Title from "@/components/title";


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
  const techs: (keyof typeof techIcons)[] = ["React", "TailwindCSS", "Node.js", "Godot", "C#", "Git", "PHP", "Laravel"];
  const form = useRef<HTMLFormElement>(null);
  const [modal, setModal] = useState<{ type: string; msg: string } | null>(null);
  const [active, setActive] = useState<string>("");

/*<motion.h1
          className="text-6xl font-extrabold mb-4 z-1"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          Jakub Málek
        </motion.h1> */


  // cursor
  useEffect(() => {
    let cursor: HTMLDivElement | null = null;

    const enableCustomCursor = () => {
      document.documentElement.style.cursor = "none";

      cursor = document.createElement("div");
      cursor.className =
        "fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference";
      cursor.style.transform = "translate(-50%, -50%)";
      document.body.appendChild(cursor);

      const move = (e: MouseEvent) => {
        if (cursor) {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        }
      };
      window.addEventListener("mousemove", move);
      return () => {
        window.removeEventListener("mousemove", move);
        cursor?.remove();
        cursor = null;
        document.documentElement.style.cursor = "auto";
      };
    };

    let cleanup: (() => void) | null = null;

    const handleResize = () => {
      const isLarge = window.innerWidth >= 1024;

      if (isLarge && !cleanup) {
        cleanup = enableCustomCursor();
      } else if (!isLarge && cleanup) {
        cleanup();
        cleanup = null;
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (cleanup) cleanup();
    };
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
        const minDist = 50;

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
          const fg = getComputedStyle(document.documentElement)
            .getPropertyValue("--foreground")
            .trim();

          ctx.fillStyle = fg.startsWith("#") ? fg : `rgb(${fg})`;
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

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    // Set timestamp before sending
    const timestampInput = form.current.querySelector<HTMLInputElement>(
      'input[name="time"]'
    );
    if (timestampInput) {
      timestampInput.value = new Date().toISOString();
    }

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      form.current.reset();
      setModal({ type: "Success", msg: "Email was successfully sent!" });
      setTimeout(() => setModal(null), 3000);
    } catch (err) {
      console.error("Failed to send email:", err);
      setModal({ type: "Error", msg: "Failed to send email!" });
      setTimeout(() => setModal(null), 3000);
    }
  };


  return (
    <div className="min-h-screen  font-sans ">


      <motion.section
        className="h-screen flex flex-col items-center justify-center text-center select-none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >

        <canvas id="snowCanvas" className="absolute inset-0 w-full h-full z-0" />

        
        <Title />
        

        <motion.a
          href="#about"
          className="absolute bottom-10 flex flex-col items-center text-[rgb(var(--foreother))] hover:text-cyan-500 transition-colors z-10 cursor-none"
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
            <FaChevronDown size={96} />
          </motion.div>
        </motion.a>
      </motion.section>

      <Navbar />
      <section id="about" className="py-24 px-6 max-w-4xl mx-auto h-screen">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-gray-400 leading-relaxed">
          Fuck frontend
        </p>
      </section>

      <section id="tech" className="py-24 px-6 max-w-4xl mx-auto w-screen h-screen">
        <h2 className="text-4xl font-bold mb-4">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {techs.map((tech) => {
            const Icon = techIcons[tech];
            const color = techColors[tech];
            return (
              <motion.div
                key={tech}
                className="p-4 bg-[rgb(var(--background))] rounded-2xl hover:bg-[var(--hoverTech)] transition flex flex-col items-center gap-2 border-3 border-[var(--border)] hover:border-[var(--borderHover)]
"
                whileHover={{ scale: 1.05 }}
              >
                {Icon && <Icon size={40} color={color} />}
                <span>{tech}</span>
              </motion.div>
            );
          })}
        </div>
      </section>


      <section id="projects" className="py-24 px-6 max-w-4xl mx-auto h-screen">
        <h2 className="text-4xl font-bold mb-8">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card title="Žižkovská lajna" description="Top-down action shooter game." img="/zl-1.jpg" rdr="https://malkincz.github.io/zizLajna/" />
          <Card title="Risk realm" description="Online casino simulator" rdr="https://github.com/KoblizekXD/riskrealm" />
          <Card title="Cock down shooter" description="Relaxing game where you shoot chickens down." rdr="https://github.com/Chigga-Solutions/Cock-Down-Shooter" />
          <Card title="Kontrola výkazů + Kontrola dohledu" description="Apps for more efficient data control in windows forms" />
          <Card title="Termio - quizzes" description="Quizzes implemented in Termio.cz - working on" rdr="https://termio.cz" />
        </div>
      </section>



      <section id="tasks" className="py-24 px-6 max-w-4xl mx-auto h-screen">
        <h2 className="text-4xl font-bold mb-8">Tasks</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card title={"Edu tech days"} description={"HTML and CSS"} rdr="https://malkincz.github.io/edutechdays/" />


        </div>
      </section>

      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto h-screen">
        <h2 className="text-4xl font-bold mb-8">Contact me</h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col gap-4 bg-black p-6 rounded-2xl cursor-none border max-w-md"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="p-2 rounded bg-neutral-800 text-white cursor-none border-2 border-neutral-500 focus:border-neutral-300 outline-0"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-2 rounded bg-neutral-800 text-white cursor-none border-2 border-neutral-500 focus:border-neutral-300 outline-0"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-2 rounded bg-neutral-800 text-white cursor-none border-2 border-neutral-600 focus:border-neutral-300 outline-0"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="p-2 rounded bg-neutral-800 text-white cursor-none border-2 border-neutral-500 focus:border-neutral-300 outline-0"
            required
          />
          <input type="hidden" name="time" value={Date.now()} />
          <button
            type="submit"
            className="bg-black hover:bg-white hover:text-black transition hover:border-white text-white py-2 px-4 rounded cursor-none border-2 border-neutral-600 duration-500"
          >
            Send
          </button>
        </form>
      </section>

      <footer className="text-center py-12 text-gray-600 border-t border-gray-800 flex flex-col md:flex-row justify-center items-center gap-5 ">
        © {new Date().getFullYear()} Jakub Málek. All rights reserved.
        <div className="flex gap-5">
          <motion.a
            href="https://www.instagram.com/malkinw_/"
          >
            <FaInstagram className="hover:fill-[var(--foreground)] transition duration-300 cursor-none" size={34} />
          </motion.a>

          <motion.a
            href="https://github.com/MalkiNcz/"
          >
            <FaGithub className="hover:fill-[var(--foreground)] transition duration-300 cursor-none" size={32} />
          </motion.a>

          <motion.a
            href="https://steamcommunity.com/id/malkin_exe/"
          >
            <FaSteam className="hover:fill-[var(--foreground)] transition duration-300 cursor-none" size={32} />
          </motion.a>
        </div>

      </footer>
      {modal && <Modal type={modal.type} msg={modal.msg} />}
    </div>
  );
}
