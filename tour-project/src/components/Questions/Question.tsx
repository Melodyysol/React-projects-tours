import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type QuestionType = {
  id: number;
  question: string;
  answer: string;
  isExpanded?: boolean;
}

const questions: QuestionType[] = [{
  id: 1,
  question: "Do I have to allow the use of cookies?",
  answer: "Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, whatever poutine normcore fixie cred kickstarter post-ironic street art.",
}, {
  id: 2,
  question: "How do I change my My Page password?",
  answer: "Coloring book forage photo booth gentrify lumbersexual. Migas chillwave poutine synth shoreditch, enamel pin thundercats fashion axe roof party polaroid chartreuse.",
}, {
  id: 3,
  question: "What is BankID?",
  answer: "Enamel pin fam sustainable woke whatever venmo. Authentic asymmetrical put a bird on it, lumbersexual activated charcoal kinfolk banjo cred pickled sartorial.",
}, {
  id: 4,
  question: "Whose birth number can I use?",
  answer: "Edison bulb direct trade gentrify beard lo-fi seitan sustainable roof party franzen occupy squid. Knausgaard cronut succulents, scenester readymade shabby chic lyft. Copper mug meh vegan gentrify.",
}, {
  id: 5,
  question: "When do I recieve a password ordered by letter?",
  answer: "Locavore franzen fashion axe live-edge neutra irony synth af tilde shabby chic man braid chillwave waistcoat copper mug messenger bag. Banjo snackwave blog, microdosing thundercats migas vaporware viral lo-fi seitan",
}
]

const Question = () => {

  const [questionStates, setQuestionStates] = useState<QuestionType[]>(questions
    .map(question => ({ ...question, isExpanded: false }))
  )

  const capitalize = (str: string): string => {
    return str.trim().split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
  };

  const toggleExpand = (id: number) => {
    setQuestionStates(prev => prev
      .map((q) => q.id === id
        ? { ...q, isExpanded: !q.isExpanded }
        : { ...q, isExpanded: false })
    )
  }




  return (
    <section className="w-screen bg-cyan-200 min-h-screen h-full flex py-10 md:py-20">
      <AnimatePresence mode="wait">
      <div className="w-3/4 bg-white m-auto p-4 md:p-8 border border-gray-100 rounded hover:shadow-md max-w-220">
        <h1 className="text-3xl text-center text-gray-600 md:text-6xl md:mt-10 md:mb-10">Questions</h1>

        {questionStates.map(question => (
          <motion.article
          layout
          key={question.id} className="rounded border-2 border-gray-300 shadow-lg p-4 md:px-8 mt-5 md:mt-8">
            <header className="flex gap-4 items-center justify-between">
              <h5 className="text-sm font-semibold text-gray-700 md:text-[1.3rem]">{capitalize(question.question)}</h5>
              <motion.button
              whileHover={{scale:1.1}}
              key={question.id}
                onClick={() => {
                  toggleExpand(question.id)
                }}
                className="active:scale-90 bg-blue-900 w-5 h-5 md:w-8 md:h-8 rounded-full text-white cursor-pointer select-none hover:opacity-80 transition-all duration-700">
                <span
                  className={`inline-block transition-transform duration-300 ${question.isExpanded ? 'rotate-45' : ''
                    }`}
                >
                  +
                </span>
              </motion.button>
            </header>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out origin-top ${question.isExpanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}>
              <p className="md:text-lg text-gray-500">{question.answer}</p>
            </div>
          </motion.article>)
        )}
      </div>
      </AnimatePresence>
    </section>
  )
}

export default Question




