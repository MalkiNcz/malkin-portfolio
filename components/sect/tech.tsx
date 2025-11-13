
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FaReact, FaNodeJs, FaGitAlt, FaPhp, FaLaravel, FaHtml5, FaCss3, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiGodotengine } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { IoLogoJavascript } from "react-icons/io";

export default function Tech() {
  const techs: (keyof typeof techIcons)[] = ["React", "TailwindCSS", "Node.js", "Godot", "C#", "Git", "PHP", "Laravel", "HTML", "CSS", "JavaScript", "Github"];


  const techIcons = {
    "React": FaReact,
    "TailwindCSS": SiTailwindcss,
    "Node.js": FaNodeJs,
    "Godot": SiGodotengine,
    "C#": TbBrandCSharp,
    "Git": FaGitAlt,
    "PHP": FaPhp,
    "Laravel": FaLaravel,
    "HTML": FaHtml5,
    "CSS": FaCss3,
    "JavaScript": IoLogoJavascript,
    "Github": FaGithub
  };

  
  const techColors = {
    React: "#61DBFB",
    TailwindCSS: "#38B2AC",
    "Node.js": "#68A063",
    Godot: "#478CBF",
    "C#": "#9B4F96",
    Git: "#F1502F",
    PHP: "#787CB5",
    Laravel: "#FF2D20",
    HTML: "#E34C26",
    CSS: "#264DE4",
    JavaScript: "#F7DF1E",
    Github: "#ffffff",
  };

  return (
    <section id="tech" className="py-24 px-6 max-w-4xl mx-auto w-screen min-h-screen">
      <h2 className="text-4xl font-bold mb-4">Tech Stack</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
        {techs.map((tech) => {
          const Icon = techIcons[tech];
          const color = techColors[tech];
          const name = tech;
          return (
            <Card index={techs.indexOf(tech)} color={color} Icon={Icon} name={name} key={techs.indexOf(tech)} />
          );
        })}
      </div>
    </section>
  )
}

function Card( { index, color, Icon, name  } : {index: number, color: string, Icon: IconType, name: string}) {
const techs = ["React", "TailwindCSS", "Node.js", "Godot", "C#", "Git", "PHP", "Laravel"];
  return (
    <motion.div
      key={index}
      className="p-4 bg-[rgb(var(--background))] rounded-2xl hover:bg-[var(--hoverTech)] transition flex flex-col items-center gap-2 border-3 border-[var(--border)] hover:border-[var(--borderHover)]
        "
      whileHover={{ scale: 1.05 }}
    >
      {Icon && <Icon size={40} color={color} />}
      <span>{name}</span>
    </motion.div>
  )
}