'use client';
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaInstagram, FaGithub, FaSteam, FaReact, FaNodeJs, FaGitAlt, FaPhp, FaLaravel, FaSnowflake, FaBan } from "react-icons/fa";
import { SiTailwindcss, SiGodotengine } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import emailjs from "@emailjs/browser";
import Modal from "@/components/modal";
import Card from "@/components/card";
import Navbar from "@/components/navbar";

import Tech from "@/components/sect/tech";
import Projects from "@/components/sect/projects";
import Snow from "@/components/snow";




export default function Portfolio() {
  
  const form = useRef<HTMLFormElement>(null);
  const [modal, setModal] = useState<{ type: string; msg: string } | null>(null);
  const [active, setActive] = useState<string>("");
  

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
      <Snow />

      

      <Navbar />
      <section id="about" className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-gray-400 leading-relaxed">
          Fuck frontend
        </p>
      </section>

      <Tech />
      <Projects />
      


      



      <section id="tasks" className="py-24 px-6 max-w-4xl mx-auto min-h-screen">
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
