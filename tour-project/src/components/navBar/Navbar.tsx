import { FaBehance, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa"
import { motion } from 'motion/react'

import logoImage from '../../assets/logo-1.svg'
import { TiThMenu } from "react-icons/ti"
import { useState } from "react"
type List = {
  id: number;
  name: string;
}

const navLists: List[] = [{
  id: 1,
  name: 'Home'
}, {
  id: 2,
  name: 'About'
}, {
  id: 3,
  name: 'Projects'
}, {
  id: 4,
  name: 'Contact'
}, {
  id: 5,
  name: 'Profile'
}]

const socialLists: {
    id: number;
    icon: React.JSX.Element;
    url: string;
}[] = [
  { id: 1, icon: <FaFacebook />, url: 'https://facebook.com' },
  { id: 2, icon: <FaTwitter />, url: 'https://twitter.com' },
  { id: 3, icon: <FaLinkedin />, url: 'https://linkedin.com' },
  { id: 4, icon: <FaBehance />, url: 'https://behance.net' },
]

const Navbar = () => {

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <nav className="bg-white w-full left-0 right-0 fixed top-0 z-50 shadow-sm border-b-2 border-b-gray-300">
      <div className="max-w-6xl mx-auto p-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between h-10">
          <img src={logoImage} alt="logo" />
          <button
            onClick={() => setIsShow(!isShow)}
            className="text-2xl text-blue-400 font-bold hover:text-blue-900  transition-all duration-300 hover:rotate-90 md:hidden cursor-pointer">
            <TiThMenu />
          </button>
        </div>

        <motion.div
          className="overflow-hidden md:overflow-visible md:h-auto"
          initial={false}
          animate={{ height: isShow ? "auto" : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ul
            
            className="flex flex-col gap-4 pb-4 md:flex-row md:pb-0 md:gap-8 text-gray-600 font-medium">

            {navLists.map(list =>
              <li
                key={list.id}
              >
                <a href="/" className="hover:text-blue-400">
                  {list.name}</a>
              </li>
            )}
          </ul>
        </motion.div>

        <ul className="text-blue-400 hidden md:flex gap-2">

          {socialLists.map(list =>
            <li key={list.id} className="hover:opacity-70 cursor-pointer transition-colors">      <a href={list.url} target="_blank">{list.icon}</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
