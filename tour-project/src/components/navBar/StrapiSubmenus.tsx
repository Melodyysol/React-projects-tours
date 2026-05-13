import { useState } from "react"
import { BiMenu } from "react-icons/bi"
import { FaAddressBook, FaBehance, FaBusinessTime, FaChessBoard, FaGithub, FaPlane, FaShip, FaTimes } from "react-icons/fa"
import { AnimatePresence, motion } from 'motion/react'
import { CgCommunity } from "react-icons/cg"
import { SiContentstack } from "react-icons/si"

type List = {
  id: number;
  title: string;
  items: {
    itemId: number;
    icon: React.JSX.Element;
    // url?: string;
    name: string;
  }[]
}


const menuLists: List[] = [{
  id: 1,
  title: 'product',
  items: [
    { itemId: 1, icon: <CgCommunity />, name: 'community' },
    { itemId: 2, icon: <SiContentstack />, name: 'content' },
    { itemId: 3, icon: <FaAddressBook />, name: 'roles' }
  ]
}, {
  id: 2,
  title: 'solutions',
  items: [
    { itemId: 1, icon: <FaPlane />, name: 'Developers' },
    { itemId: 2, icon: <FaBehance />, name: 'content managers' },
    { itemId: 3, icon: <FaBusinessTime />, name: 'business teams' },
    { itemId: 4, icon: <FaChessBoard />, name: 'roles' }
  ]
}, {
  id: 3,
  title: 'resources',
  items: [
    { itemId: 1, icon: <FaShip />, name: 'starters' },
    { itemId: 2, icon: <FaGithub />, name: 'showcase' },
  ]
}]

const StrapiSubmenus = () => {

  const [isShow, setIsShow] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const [count, setCount] = useState<number>(0)

  const eachList: List = menuLists[count] ?? menuLists[0]

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    show: {
      x: 0, opacity: 1, transition: {
        duration: 0.3
      }
    }
  }

  return (
    <main>
      <section className="bg-[#6366f1] text-white w-screen h-screen px-10 py-5 sm:py-6 flex flex-col lg:block ">
        <nav className="flex items-center justify-between">
          <h1 className="font-bold text-2xl tracking-widest sm:text-3xl">strapi</h1>
          <motion.button
            onClick={() => setIsShow(true)}
            whileHover={{ scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } }}
            whileTap={{ scale: 0.9, transition: { duration: 0.3, ease: "easeInOut" } }}
            className="bg-white rounded p-1 cursor-pointer text-xl text-[#4338ca] lg:hidden">
            <BiMenu />
          </motion.button>

          {/* To be display on desktop */}
          <ul
            onMouseLeave={() => setIsExpanded(false)}
            className="hidden lg:flex mx-auto gap-10">
            {menuLists.map((list, i) =>
              <li key={list.id} className="cursor-pointer text-xl ">
                <button
                  onMouseEnter={() => {
                    setIsExpanded(true)
                    setCount(i)
                  }}
                  aria-expanded={isExpanded}
                  aria-haspopup="true"
                  className="capitalize cursor-pointer">
                  {list.title}
                </button>
              </li>
            )}
          </ul>

        </nav>
        <div
          onMouseEnter={() => isExpanded ? setIsExpanded(true) : setIsExpanded(false)}
          onMouseLeave={() => setIsExpanded(false)}
          className="hidden lg:block w-11/12 h-55 mx-auto -mt-2 pt-10">
          <AnimatePresence mode="wait">
            {isExpanded && <motion.ul
              key={count}
              onMouseEnter={() => setIsExpanded(true)}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="bg-white rounded overflow-hidden  p-8">
              <h3 className="text-[#4338ca] text-2xl capitalize mb-2">{eachList.title}</h3>
              <ul className={`grid ${count === 1 ? 'grid-cols-2' : ''} items-center justify-between gap-y-1`}>
                {eachList.items.map(item =>
                  <motion.li
                    key={item.itemId}
                    variants={itemVariants}
                  >
                    <a href="#" className="flex gap-4 capitalize items-center text-gray-800">{item.icon} {item.name}</a>
                  </motion.li>
                )}
              </ul>
            </motion.ul>}
          </AnimatePresence>
        </div>
        <section className="my-auto lg:max-w-160 lg:text-center lg:mx-auto">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl max-w-160 font-bold sm:leading-15 lg:leading-snug">Manage Any Content Anywhere</h2>
          <p>Strapi is the leading open-source headless CMS. It’s 100% JavaScript and fully customizable.</p>
        </section>
      </section>
      <AnimatePresence>
        {isShow &&
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-white">
            <div className="relative p-8">
              <button
                onClick={() => setIsShow(false)}
                aria-label="Close btn" className="absolute top-5 right-5 text-[#4f46e5] text-2xl sm:text-3xl cursor-pointer">
                <FaTimes />
              </button>
              <div className="flex flex-col gap-8 mt-8">

                {menuLists.map(list =>
                  <article key={list.id}>
                    <h3 className="text-[#4338ca] text-2xl capitalize mb-2">{list.title}</h3>
                    <ul className="grid grid-cols-2 items-center justify-between gap-y-1">
                      {list.items.map(item =>
                        <li key={item.itemId}>
                          <a href="/" className="flex gap-4 capitalize items-center text-gray-800">{item.icon} {item.name}</a>
                        </li>
                      )}
                    </ul>
                  </article>
                )}
              </div>
            </div>
          </motion.aside>}
      </AnimatePresence>
    </main >
  )
}

export default StrapiSubmenus
