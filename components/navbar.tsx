import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const items = Array.from({ length: 5 }, (_, i) => i);

    return (
        <div className={`w-full sticky bg-white/50 flex white top-0 justify-center items-center text-2xl pt-4 px-4 z-40 `}>
            <h1 className="text-4xl"><a href="#snowCanvas" className="block w-full h-full">
                Jakub Málek
            </a></h1>
            <div className=" flex ml-auto gap-x-8">
                <Item key={1} index={1} active={1 == activeIndex} onClick={() => { setActiveIndex(1) }}>
                    <a href="#about" className="block w-full h-full">
                        About
                    </a></Item>
                <Item key={2} index={2} active={2 == activeIndex} onClick={() => { setActiveIndex(2) }}>
                    <a href="#tech" className="block w-full h-full">
                        Tech
                    </a></Item>
                <Item key={3} index={3} active={3 == activeIndex} onClick={() => { setActiveIndex(3) }}>
                    <a href="#projects" className="block w-full h-full">
                        Projects
                    </a></Item>
                <Item key={4} index={4} active={4 == activeIndex} onClick={() => { setActiveIndex(4) }}>
                    <a href="#tasks" className="block w-full h-full">
                        Tasks
                    </a></Item>
                <Item key={5} index={5} active={5 == activeIndex} onClick={() => { setActiveIndex(5) }}>
                    <a href="#contact" className="block w-full h-full">
                        Contact
                    </a></Item>

            </div>
        </div>
    );
}

type ItemsProps = {
    active: boolean,
    index: number,
    onClick: (index: number) => void;
    children: React.ReactNode;
}

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

    )
}