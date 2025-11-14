'use client';
import { useEffect } from "react";


import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import Tech from "@/components/sect/tech";
import Projects from "@/components/sect/projects";
import Tasks from "@/components/sect/tasks";
import Contact from "@/components/sect/contact";
import About from "@/components/sect/about";
import Snow from "@/components/snow";



export default function Portfolio() {


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




  


  return (
    <div className="min-h-screen">
      <Snow />
      <Navbar />      
      <About />
      <Tech />
      <Projects />
      <Tasks />
      <Contact />
      <Footer />  
    </div>
  );
}
