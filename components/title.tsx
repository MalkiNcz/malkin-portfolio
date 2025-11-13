import { motion } from "framer-motion";

export default function Title() {

  return (
    <motion.div
      className="logo font-extrabold mb-2 z-1"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 1 }}
    >
      <b className="flex flex-col lg:flex-row justify-center align-center">
        <div className="">
          J
          <span>a</span>
          <span>k</span>
          <span>u</span>
          <span>b</span>
        </div>
        <div className="">
          M
          <span>á</span>
          <span>l</span>
          <span>e</span>
          <span>k</span>
        </div>
      </b>
      <motion.p
        className=" text-lg xl:text-2xl text-[rgb(var(--foreother))] z-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        Student / Developer
      </motion.p>
    </motion.div>

  );
}