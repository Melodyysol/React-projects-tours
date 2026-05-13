import { AnimatePresence, motion } from "motion/react";
import { useState } from "react"

type LoremParagraph = {
  id: number;
  description: string;
}

const lorems: LoremParagraph[] = [{
  id: 1,
  description: "Jelly sweet roll jelly beans biscuit pie macaroon chocolate donut. Carrot cake caramels pie sweet apple pie tiramisu carrot cake. Marzipan marshmallow croissant tootsie roll lollipop. Cupcake lemon drops bear claw gummies. Jelly bear claw gummi bears lollipop cotton candy gummi bears chocolate bar cake cookie. Cupcake muffin danish muffin cookie gummies. Jelly beans tiramisu pudding. Toffee soufflé chocolate cake pastry brownie. Oat cake halvah sweet roll cotton candy croissant lollipop. Macaroon tiramisu chocolate bar candy candy carrot cake jelly sweet. Gummies croissant macaroon dessert. Chocolate cake dragée pie."
}, {
  id: 2,
  description: "Next level tbh everyday carry, blog copper mug forage kitsch roof party pickled hammock kale chips tofu. Etsy shoreditch 8-bit microdosing, XOXO viral butcher banh mi humblebrag listicle woke bicycle rights brunch before they sold out ramps. Twee shabby chic taiyaki flannel, enamel pin venmo vape four loko. Hexagon kale chips typewriter kitsch 8-bit organic plaid small batch keffiyeh ethical banh mi narwhal echo park cronut."
}, {
  id: 3,
  description: "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead."
}, {
  id: 4,
  description: "Cat gets stuck in tree firefighters try to get cat down firefighters get stuck in tree cat eats firefighters' slippers kitty power ignore the squirrels, you'll never catch them anyway for what a cat-ass-trophy! or purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table. Pretend you want to go out but then don't bite off human's toes, yet disappear for four days and return home with an expensive injury; bite the vet so catch eat throw up catch eat throw up bad birds."
}, {
  id: 5,
  description: "This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel. That makes me feel angry! Anyhoo, your net-suits will allow you to experience Fry's worm infested bowels as if you were actually wriggling through them. I just told you! You've killed me! Fry! Quit doing the right thing, you jerk! Michelle, I don't regret this, but I both rue and lament it. Morbo can't understand his teleprompter because he forgot how you say that letter that's shaped like a man wearing a hat."
}, {
  id: 6,
  description: "Airedale hard cheese mozzarella. Pecorino melted cheese port-salut emmental babybel cheese and wine melted cheese manchego. Everyone loves blue castello everyone loves fromage cheese slices airedale cheddar cream cheese. Bavarian bergkase who moved my cheese halloumi port-salut gouda jarlsberg ricotta rubber cheese. Stinking bishop smelly cheese brie."
}, {
  id: 7,
  description: "Salvia glossier subway tile, leggings mustache YOLO semiotics chia. Pitchfork tbh af blog church-key meggings vaporware PBR&B master cleanse post-ironic man bun pabst mustache letterpress synth. Snackwave raw denim godard, 3 wolf moon shaman offal kitsch unicorn live-edge selvage schlitz fashion axe vaporware drinking vinegar prism. Shabby chic tacos artisan, chambray chicharrones cardigan leggings typewriter af pop-up williamsburg meditation PBR&B viral. You probably haven't heard of them DIY jean shorts subway tile fashion axe bushwick kitsch tumeric cloud bread vaporware freegan franzen pork belly chicharrones banh mi."
}, {
  id: 8,
  description: "Man braid celiac synth freegan readymade, pitchfork fam salvia waistcoat lomo bitters gentrify four loko. Pitchfork semiotics post-ironic vegan. Tofu meditation microdosing hashtag semiotics venmo. Flexitarian vape tilde taiyaki. Prism poutine farm-to-table, messenger bag vegan taxidermy tattooed sartorial squid jean shorts fixie selvage trust fund vape."
}]

const Lorems = () => {

  const [inputValue, setInputValue] = useState<number | ''>(1)
  const [requiredLorem, setRequiredLorem] = useState<LoremParagraph[]>([lorems[0]])

  // const filteredLorem = lorems.filter(lorem => 
  //   lorem.id <= inputValue
  // )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // setRequiredLorem(filteredLorem)
    const numInputValue = inputValue === '' ? 1 : inputValue
    const amount = Math.min(
      Math.max(numInputValue, 1),
      lorems.length
    )
    setRequiredLorem(lorems.slice(0, amount))
  }

  return (
    <section className="min-w-screen min-h-screen flex flex-col items-center px-4 gap-8">
      <h5 className="mt-40 text-[1.6rem] text-center uppercase font-bold">Tired of boring lorem ipsum?</h5>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center">
        <label htmlFor="amount" className="text-xl">Paragraphs:</label>
        <input
          id="amount"
          onChange={(e) => setInputValue(Number(e.target.value) || '')}
          value={inputValue}
          type="number" min={1} max={8} step={1}
          className="bg-[#94a3b869] rounded outline-none text-xl px-4 py-0.75"
        />
        <button type="submit" className="bg-[#059669] px-4 py-2 rounded text-sm text-white cursor-pointer active:scale-90 hover:bg-[#047857] transition-all">Generate</button>
      </form>
      <article className="my-10 max-w-2xl flex flex-col gap-10 overflow-hidden">
        <AnimatePresence mode="wait">
        {requiredLorem.map((lorem, i) =>
          <motion.p 
          initial={{opacity:0, y:20}}
          animate={{opacity: 1, y:0}}
          exit={{opacity:0, y:-20}}
          transition={{duration: 0.3, delay: i * 0.1}}
          
          key={lorem.id} className="leading-relaxed text-gray-700"> {lorem.description} 
          </motion.p>
        )}
        </AnimatePresence>

      </article>
    </section>
  )
}

export default Lorems
