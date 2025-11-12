import { motion } from "framer-motion";

export default function Title() {

    return (
        <motion.div 
        className="logo text-6xl font-extrabold mb-8 z-1"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        >
            <b>
                J
                <span>a</span>
                <span>k</span>
                <span>u</span>
                <span>b</span>
                M
                <span>á</span>
                <span>l</span>
                <span>e</span>
                <span>k</span>
            </b>
            <motion.p
          className="text-2xl text-[rgb(var(--foreother))] z-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
        >
          Student / Developer
        </motion.p>
        </motion.div>
        
    );
}