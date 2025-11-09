'use client';
import { motion } from "framer-motion";

type ModalProps = {
    type: string,
    msg: string
}

export default function Modal({ type, msg }: ModalProps) {
    return (
        <motion.div
            className="bottom-10 left-10 h-auto min-w-fit px-4 py-2 border rounded-2xl bg-amber-300 text-black flex flex-col shadow-lg z-10 fixed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            <motion.h1 className="font-bold">{type}</motion.h1>
            <motion.span>{msg}</motion.span>
        </motion.div>
    )
}