import { FaBehance, FaCalendarAlt, FaFacebook, FaGem, FaHome, FaLinkedin, FaTimes, FaTwitter, FaUserFriends } from "react-icons/fa"
import { AnimatePresence, motion } from 'motion/react'

import logoImage from '../../assets/logo-1.svg'
import { TiThMenu } from "react-icons/ti"
import { SiFiles } from "react-icons/si"
import { CgFileDocument } from "react-icons/cg"
import { useState } from "react"

const socialLists: {
  id: number;
  icon: React.JSX.Element;
  url: string;
}[] = [
    { id: 1, icon: <FaFacebook />, url: 'https://facebook.com' },
    { id: 2, icon: <FaTwitter />, url: 'https://twitter.com' },
    { id: 3, icon: <FaLinkedin />, url: 'https://linkedin.com' },
    { id: 4, icon: <FaBehance />, url: 'https://behance.net' },
    { id: 5, icon: <FaGem />, url: 'https://behance.net' },

  ]

const menuLists: {
  id: number;
  icon: React.JSX.Element;
  name: string;
}[] = [
    { id: 1, icon: <FaHome />, name: 'home' },
    { id: 2, icon: <FaUserFriends />, name: 'team' },
    { id: 3, icon: <SiFiles />, name: 'projects' },
    { id: 4, icon: <FaCalendarAlt />, name: 'calendar' },
    { id: 5, icon: <CgFileDocument />, name: 'documents' },
  ]


const sidebarVariants = {
  hidden: {
    x: '-100%',
  },
  show: {
    x: 0,
    transition: {
      staggerChildren: 0.1,
      // when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: {
    duration: 0.3,
  } }
}

const Context = () => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false)

  return (
    <main>
      <section className="w-screen h-screen flex flex-col">
        <motion.button

          onClick={() => setIsShow(true)}

          initial={{ scale: 1 }}
          animate={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 100, damping: 0 }}
          className="text-[#49a6e9] text-5xl cursor-pointer mt-8 ml-10">
          <TiThMenu />
        </motion.button>
        <button
          aria-label="Open sidebar"
          onClick={() => setIsModal(true)}
          className="capitalize m-auto bg-[#49a6e9] hover:bg-[#1a6aa2] text-sm text-white rounded px-3 py-1 cursor-pointer transition-colors duration-500">Show Modal</button>
      </section>
      <AnimatePresence mode="wait">
        {isModal && <div
          onClick={() => setIsModal(false)}
          className="fixed flex inset-0 z-50 bg-[#0f172abb]">
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="m-auto w-11/12 h-50 max-w-xl bg-white z-20 rounded flex relative">
            <p className="m-auto text-2xl md:text-3xl font-semibold text-gray-800 capitalize">Modal Content</p>
            <FaTimes
              aria-label="Close sidebar"
              onClick={() => setIsModal(false)}
              className="absolute top-5 right-5 text-xl md:text-3xl cursor-pointer text-[#842029]" />
          </motion.div>
        </div>}
      </AnimatePresence>
      <AnimatePresence>
        {isShow && <motion.aside
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={sidebarVariants}
          transition={{ type: 'tween', duration: 0.3, ease: "easeInOut" }}
          className={`fixed overflow-hidden flex flex-col w-80 md:w-96 py-6 bg-white border-r border-r-gray-50 shadow top-0 bottom-0 left-0 z-10 ${isShow ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <motion.header
            variants={itemVariants}
            className="flex items-center justify-between gap-5 md:gap-20 mx-6">
            <img src={logoImage} alt="logo" />
            <FaTimes
              onClick={() => setIsShow(false)}
              className="text-xl md:text-3xl cursor-pointer text-[#842029]" />
          </motion.header>
          <ul className="mt-8 flex-1">
            {menuLists.map(list =>
              <motion.li
                variants={itemVariants}
                key={list.id} className="hover:bg-gray-100 px-6 py-3 cursor-pointer">
                <a href="/" className="flex items-center gap-4 capitalize text-2xl text-gray-600">{list.icon} {list.name}</a>
              </motion.li>
            )}
          </ul>

          <ul className="flex items-center justify-center gap-4">
            {socialLists.map(list =>
              <motion.li
                variants={itemVariants}
                className="text-2xl text-[#49a6e9] hover:text-[#1a6aa2]" key={list.id}>
                <a href={list.url}>{list.icon}</a>
              </motion.li>
            )}
          </ul>
        </motion.aside>}
      </AnimatePresence>
    </main>
  )
}

export default Context
