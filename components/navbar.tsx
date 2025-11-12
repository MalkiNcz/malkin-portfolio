import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
const [ignoreScroll, setIgnoreScroll] = useState(false);

  // map items to sections
  const items = [
    { index: 1, id: "about" },
    { index: 2, id: "tech" },
    { index: 3, id: "projects" },
    { index: 4, id: "tasks" },
    { index: 5, id: "contact" },
  ];

  const handleClick = (index: number, id: string) => {
  setActiveIndex(index);
  setIgnoreScroll(true); // temporarily ignore scroll
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // allow scroll spy after animation (~500ms)
  setTimeout(() => setIgnoreScroll(false), 500);
};

  useEffect(() => {
  const handleScroll = () => {
    if (ignoreScroll) return; // skip scroll spy

    let currentIndex: number | null = null;
    items.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        const top = section.offsetTop;
        const height = section.clientHeight;
        if (window.scrollY >= top - height / 2) {
          currentIndex = item.index;
        }
      }
    });
    setActiveIndex(currentIndex);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();
  return () => window.removeEventListener("scroll", handleScroll);
}, [ignoreScroll]);

  return (
    <div className={`w-full sticky bg-[var(--navbarbg)] flex white top-0 justify-center items-center text-2xl pt-4 px-4 z-40`}>
      <h1 className="text-4xl">
        <a href="#snowCanvas" className="block w-full h-full">
          Jakub Málek
        </a>
      </h1>
      <div className="flex ml-auto gap-x-8">
        {items.map(({ index, id }) => (
          <Item
            key={index}
            index={index}
            active={index === activeIndex}
            onClick={() => handleClick(index, id)}
          >
            <a href={`#${id}`} className="block w-full h-full">
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          </Item>
        ))}
      </div>
    </div>
  );
}

type ItemsProps = {
  active: boolean;
  index: number;
  onClick: (index: number) => void;
  children: React.ReactNode;
};

function Item({ active, index, onClick, children }: ItemsProps) {
  return (
    <motion.button
      className={`
        relative px-4 rounded-md cursor-none
        after:content-[''] after:absolute after:left-0 after:-bottom-0.5
        after:h-0.5 after:bg-current
        after:transition-all after:duration-200
        hover:scale-125
        ${active ? "after:w-full scale-125" : "after:w-0"}
      `}
      onClick={() => onClick(index)}
    >
      {children}
    </motion.button>
  );
}
