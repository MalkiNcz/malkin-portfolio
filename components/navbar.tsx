import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ignoreScroll, setIgnoreScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { index: 1, id: "about" },
    { index: 2, id: "tech" },
    { index: 3, id: "projects" },
    { index: 4, id: "tasks" },
    { index: 5, id: "contact" },
  ];

   const handleClick = (index: number, id: string) => {
  const section = document.getElementById(id);
  if (!section) return;

  setIgnoreScroll(true);
  setActiveIndex(index);

  section.scrollIntoView({ behavior: "smooth" });

  // Počkám, až doběhne smooth-scroll
  setTimeout(() => setIgnoreScroll(false), 600);
};



useEffect(() => {
  const handleScroll = () => {
    if (ignoreScroll) return;

    let currentIndex: number | null = null;
    const scrollPos = window.scrollY + window.innerHeight / 2;

    items.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        const rect = section.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const bottom = top + rect.height;

        if (scrollPos >= top && scrollPos < bottom) {
          currentIndex = item.index;
        }
      }
    });

    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  return () => window.removeEventListener("scroll", handleScroll);
}, [ignoreScroll, activeIndex]);



  return (
    <header className="sticky top-0 z-50 bg-[var(--navbarbg)] backdrop-blur-lg shadow-lg border-b border-[var(--border)]">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold select-none">
          <a href="#snowCanvas" className="cursor-pointer md:cursor-none">Jakub Málek</a>
        </h1>

        <nav className="hidden md:flex gap-x-8 items-center ml-auto text-xl">
          {items.map(({ index, id }) => (
            <Item
              key={index}
              index={index}
              active={index === activeIndex}
              onClick={() => handleClick(index, id)}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </Item>
          ))}
        </nav>

        <button
          className="md:hidden text-3xl text-[var(--foreground)] cursor-pointer md:cursor-none "
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <motion.nav
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[var(--navbarbg)] border-t border-[var(--border)] absolute w-full"
      >
        <div className="flex flex-col items-center py-4 gap-4">
  {items.map(({ index, id }) => (
    <motion.button
      key={index}
      onClick={() => handleClick(index, id)}
      whileHover="hover"
      animate="rest"
            variants={{
                rest: { scale: 1 },
                hover: { scale: 1.2 },
            }}
      className={`text-lg cursor-pointer md:cursor-none
        ${
        index === activeIndex
          ? "text-[var(--accent)] font-semibold scale-[1.2]"
          : "text-[var(--foreground)]"
      }`}
    >
      {id.charAt(0).toUpperCase() + id.slice(1)}
    </motion.button>
  ))}
</div>
      </motion.nav>
    </header>
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
        relative px-3 py-1 rounded-md select-none cursor-pointer md:cursor-none
        after:content-[''] after:absolute after:left-0 after:-bottom-0.5
        after:h-0.5 after:bg-current
        after:transition-all after:duration-200
        hover:scale-110
        ${active ? "after:w-full text-[var(--accent)]" : "after:w-0"}
      `}
      onClick={() => onClick(index)}
    >
      {children}
    </motion.button>
  );
}
