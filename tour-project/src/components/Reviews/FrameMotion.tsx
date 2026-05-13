import { motion } from "motion/react"

const FrameMotion = () => {
  return (
    <>
      <motion.div
      drag="x"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >Hello</motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Click Me
      </motion.button>
    </>
  )
}

export default FrameMotion
