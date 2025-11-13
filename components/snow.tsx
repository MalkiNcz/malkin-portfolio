import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Title from "@/components/title";
import { FaChevronDown, FaSnowflake } from "react-icons/fa";

export default function Snow() {
    const [enabled, setEnabled] = useState(true);

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

        const flakeCount = window.innerWidth < 768 ? 100 : 200;
        let mX = -100, mY = -100;
        let animationFrame: number | null = null;

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
            if (canvas && canvas.classList.contains("paused")) return;

            if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);

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

                if (canvas &&
                    flake.y >= canvas.height ||
                    flake.y <= 0 ||
                    canvas &&
                    flake.x >= canvas.width ||
                    flake.x <= 0
                ) {
                    reset(flake);
                }

                const fg = getComputedStyle(document.documentElement)
                    .getPropertyValue("--foreground")
                    .trim();

                if (ctx) {
                    ctx.fillStyle = fg.startsWith("#") ? fg : `rgb(${fg})`;
                    ctx.beginPath();
                    ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrame = requestAnimationFrame(snow);
        }

        function init() {
            flakes = [];
            for (let i = 0; i < flakeCount; i++) {
                const x = canvas ? (Math.floor(Math.random() * canvas.width)) : 0;
                const y = canvas ? Math.floor(Math.random() * canvas.height) : 0;
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

        const handleMouseMove = (e: MouseEvent) => {
            mX = e.clientX;
            mY = e.clientY;
        };

        const handleResize = () => {
            if (!canvas || !ctx) return;
            cancelAnimationFrame(animationFrame!);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            flakes = [];
            init();
        };

        const handleClassChange = () => {
            if (!canvas || !ctx) return;
            const paused = canvas.classList.contains("paused");

            cancelAnimationFrame(animationFrame!);
            if (paused) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else {
                flakes = [];
                init();

            }
        };



        const observer = new MutationObserver(handleClassChange);
        observer.observe(canvas, { attributes: true, attributeFilter: ["class"] });

        canvas.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        init();

        return () => {
            observer.disconnect();
            canvas.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrame!);
        };
    }, []);

    //

    useEffect(() => {
        const canvas = document.getElementById("snowCanvas");
        if (!canvas) return;
        if (enabled) {
            canvas.classList.remove("paused");
        } else {
            canvas.classList.add("paused");
        }
    }, [enabled]);

    return (
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

            <motion.button
                onClick={() => setEnabled((prev) => !prev)}
                whileTap={{ scale: 0.9 }}
                className={`
                absolute bottom-6 right-6 z-50 p-3 rounded-full border-2
                transition-all duration-300 shadow-lg backdrop-blur-md
                ${enabled
                        ? "bg-white/10 border-[var(--foreground)] hover:bg-white/20"
                        : "bg-red-500/20 border-red-500/50 hover:bg-red-500/30"
                    }
              `}
                title={enabled ? "Disable snow" : "Enable snow"}
            >
                <div className="relative flex items-center justify-center">
                    <FaSnowflake
                        className={`text-2xl transition-all duration-300 ${enabled ? "text-[var(--foreground)]" : "text-gray-400"
                            }`}
                    />
                    {!enabled && (
                        <motion.div
                            initial={{ rotate: 45, scale: 0 }}
                            animate={{ rotate: 45, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute w-8 h-0.5 bg-red-500 rounded-full"
                        />
                    )}
                </div>
            </motion.button>
        </motion.section>

    )
}