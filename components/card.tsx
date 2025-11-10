import { hover, motion } from "framer-motion";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";

type CardProps = {
    title: String,
    description: String,
    img: String | null
}



export default function Card({ title, description, img }: CardProps) {
    return (
        <motion.div
            className={`relative flex items-end text-white rounded-xl overflow-hidden shadow-lg h-64 justify-center bg-cover border-3 ${!img ? "bg-linear-to-r from-orange-600 via-amber-900 to-amber-950" : ""}`}
            style={img ? { backgroundImage: `url(${img})` } : undefined}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
                rest: { scale: 1 },
                hover: { scale: 1.02 },
            }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
            <motion.h3
                className="text-xl font-bold text-white z-30"
                variants={{
                    rest: { y: "-100%" },
                    hover: { y: "-300%" }   
                }}
                transition={{ duration: 0.35 }}
            >
                {title}
            </motion.h3>

            <motion.div
                className="absolute z-10 flex flex-col items-center justify-end text-center p-4 w-full bg-black/50 h-full"
                variants={{
                    rest: { y: "100%" },
                    hover: { y: 0 },
                }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >


                <motion.span className="text-xs">
                    {description}
                </motion.span>

                <motion.button
                    className="mt-4 bg-black text-white text-xs uppercase tracking-wider font-bold px-4 py-2 rounded-md hover:bg-neutral-800 border cursor-pointer lg:cursor-none"
                    variants={{
                        rest: { opacity: 0, y: 10 },
                        hover: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    onClick={() => window.open("https://malkincz.github.io/zizLajna/", "_blank")}
                >
                    Read more
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
