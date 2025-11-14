import { motion } from "framer-motion";
import { FaInstagram, FaGithub, FaSteam } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="text-center py-12 text-gray-600 border-t border-gray-800 flex flex-col md:flex-row justify-center items-center gap-5 " id="feet">
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
    )
}