import { useState } from "react";
import { motion, AnimatePresence } from 'motion/react'

type NavSpan = 'tommy' | 'bigdrop' | 'cuker'
type Person = {
  id: number;
  title: string;
  name: string;
  date: string;
  description: string[]
}
type User = "tommy" | "bigdrop" | "cuker"

const navSpans: NavSpan[] = ['tommy', 'bigdrop', 'cuker']

const persons: Person[] = [{
  id: 1,
  title: 'Full Stack Web Developer',
  name: 'tommy',
  date: 'December 2015 - Present',
  description: [
    "Tote bag sartorial mlkshk air plant vinyl banjo lumbersexual poke leggings offal cold-pressed brunch neutra. Hammock photo booth live-edge disrupt.",
    "Post-ironic selvage chambray sartorial freegan meditation. Chambray chartreuse kombucha meditation, man bun four dollar toast street art cloud bread live-edge heirloom.",
    "Butcher drinking vinegar franzen authentic messenger bag copper mug food truck taxidermy. Mumblecore lomo echo park readymade iPhone migas single-origin coffee franzen cloud bread tilde vegan flexitarian."
  ]
}, {
  id: 2,
  title: 'Front-End Engineer',
  name: 'bigdrop',
  date: 'May 2015 - December 2015',
  description: [
    "Hashtag drinking vinegar scenester mumblecore snackwave four dollar toast, lumbersexual XOXO. Cardigan church-key pabst, biodiesel vexillologist viral squid.",
    "Franzen af pitchfork, mumblecore try-hard kogi XOXO roof party la croix cardigan neutra retro tattooed copper mug. Meditation lomo biodiesel scenester",
    "Fam VHS enamel pin try-hard echo park raw denim unicorn fanny pack vape authentic. Helvetica fixie church-key, small batch jianbing messenger bag scenester +1",
    "Fam VHS enamel pin try-hard echo park raw denim unicorn fanny pack vape authentic. Helvetica fixie church-key, small batch jianbing messenger bag scenester +1"
  ]
}, {
  id: 3,
  title: 'Engineering Intern',
  name: 'cuker',
  date: 'May 2014 - September 2015',
  description: [
    "I'm baby woke mumblecore stumptown enamel pin. Snackwave prism pork belly, blog vape four loko sriracha messenger bag jean shorts DIY bushwick VHS. Banjo post-ironic hella af, palo santo craft beer gluten-free.",
    "YOLO drinking vinegar chambray pok pok selfies quinoa kinfolk pitchfork street art la croix unicorn DIY. Woke offal jianbing venmo tote bag, palo santo subway tile slow-carb post-ironic pug ugh taxidermy squid.",
    "Pour-over glossier chambray umami 3 wolf moon. Iceland kale chips asymmetrical craft beer actually forage, biodiesel tattooed fingerstache. Pork belly lomo man braid, portland pitchfork locavore man bun prism."
  ]
}]

const Tab = () => {

  const [user, setUser] = useState<User>('tommy')
  // const [index, setIndex] = useState<number>(0)

  const capitalize = (str: string = '') => {
    return str.trim().split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
  };

  const activePerson = persons.find(person => person.name === user) ?? persons[0]

  // const activePerson = persons[index]

  return (
    <section className="flex flex-col gap-15 md:gap-30 p-10 md:flex-row md:items-start md:justify-center">
      <nav className="flex justify-center items-center gap-4 mt-10 md:flex-col md:mt-20 md:items-start md:gap-8">
        {navSpans.map(
          button =>
            <button
              key={button}
              onClick={() => setUser(button)}
              className={`relative select-none cursor-pointer text-sm transition-all duration-300
              hover:text-[#14b8a6] md:pl-20
              ${button === user ? 'text-[#14b8a6]' : ''}
            `}
            >

              {button.toUpperCase()}

              {button === user && (
                <motion.div
                  layoutId="activeTab"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                  }}
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 md:h-6 md:w-0.5 md:top-1/2
md:-translate-y-1/2"
                />
              )}
            </button>
        )}
      </nav>
      <AnimatePresence mode="wait">
        <motion.article
          key={activePerson.id}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35, ease:"easeInOut" }}
          className="md:align-top max-w-200 md:mt-20">
          <h1 className="font-semibold text-2xl md:text-4xl">{capitalize(activePerson.title)}</h1>
          <span className="bg-gray-300 px-3 py-1 rounded inline-block my-3">{activePerson.name.toUpperCase()}</span>
          <p className="text-gray-500">{capitalize(activePerson.date)}</p>
          <div className="flex flex-col gap-5 mt-10">
            {activePerson.description.map((d, i) =>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                // exit={{ opacity: 0, x: 10 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                key={i} className="flex gap-4 md:gap-10 items-center justify-start">
                <span className="text-[#14b8a6]">➤➤ {/*▶▶*/}</span>
                <p className="text-gray-800">{d}</p>
              </motion.div>
            )}
          </div>
        </motion.article>
      </AnimatePresence>
    </section>
  )
}

export default Tab
