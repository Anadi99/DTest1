"use client"
import { motion } from "framer-motion"

const WelcomeMessage = () => {
  return (
    <motion.p
      className="text-xl md:text-2xl text-white max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      Welcome to <span className="font-semibold text-red-300">Deutchnames</span> - where German vocabulary meets strategic gameplay.
      Master words from A1 to B2 through authentic Codenames-style challenges!
    </motion.p>
  )
}

export default WelcomeMessage
