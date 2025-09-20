"use client"
import { motion } from "framer-motion"

const CallToAction = () => {
  return (
    <motion.p
      className="text-md text-white max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      Join the strategic approach to German language mastery.
    </motion.p>
  )
}

export default CallToAction
