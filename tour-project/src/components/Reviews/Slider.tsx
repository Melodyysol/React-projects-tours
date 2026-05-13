import { useEffect, useState } from "react"
import { personsArray } from "./personArr"
import { motion, AnimatePresence } from "framer-motion" // [1] Import motion

const Slider = () => {
  const [index, setIndex] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [direction, setDirection] = useState(0) // [2] Track direction as a number (1 or -1)

  const person = personsArray[index]

  // Animation variants (cleaner than raw CSS)
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      filter: "blur(4px)"
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      filter: "blur(4px)"
    })
  }

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1)
      setIndex(prev => (prev + 1) % personsArray.length)
    }, 10000);
    return () => clearInterval(timer)
  }, [isPaused, index])

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + personsArray.length) % personsArray.length);
  };

  const buttonStyle = "z-10 absolute bg-gray-500 rounded text-white px-1 py text-sm md:px-1.5 md:py-0.5 md:text-xl cursor-pointer active:scale-90 hover:bg-[#7c3aed] transition-all duration-500"

  return (
    <section className="overflow-hidden relative flex items-center justify-center px-10 bg-white w-screen h-screen">
      {/* [3] AnimatePresence enables exit animations */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.article
          key={index} // [4] Motion uses key to swap components
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="absolute flex flex-col gap-4 items-center max-w-110 md:max-w-200 md:px-10"
        >
          <img className="rounded-full object-cover w-36 h-36 border-5 shadow-xl border-gray-400" src={person.image} alt="" />
          <h5 className="text-[#7c3aeddc] text-2xl font-semibold">{person.name.toUpperCase()}</h5>
          <p className="text-[#475569] -mt-2">{person.title}</p>
          <p className="text-[#64748b] text-center mt-4">{person.description}</p>

          <svg className="text-5xl text-[#7c3aed]" stroke="currentColor" fill="currentColor" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path>
          </svg>
        </motion.article>
      </AnimatePresence>

      <button onClick={() => paginate(-1)} className={`${buttonStyle} left-1/10 lg:left-1/5`}>←</button>
      <button onClick={() => paginate(1)} className={`${buttonStyle} right-1/10 lg:right-1/5`}>→</button>
    </section>
  )
}

export default Slider
