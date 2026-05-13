// import { useReducer } from 'react'
import { useState } from 'react'
import Item1 from '../../assets/item-1.jpeg'
import Item2 from '../../assets/item-2.jpeg'
import Item3 from '../../assets/item-3.jpeg'
import Item4 from '../../assets/item-4.jpeg'
import Item5 from '../../assets/item-5.jpeg'
import Item6 from '../../assets/item-6.jpeg'
import Item7 from '../../assets/item-7.jpeg'
import Item8 from '../../assets/item-8.jpeg'
import Item9 from '../../assets/item-9.jpeg'
import { AnimatePresence, motion } from 'motion/react'


type Products = {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  // key: { type: 'breakfast' } | { type: 'lunch' } | { type: 'shakes' }
  category: 'breakfast' | 'lunch' | 'shakes'
}

type Category = 'breakfast' | 'lunch' | 'shakes' | 'all'

const items: Products[] = [{
  id: 1,
  image: Item1,
  title: 'buttermilk pancakes',
  price: 1099,
  description: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed",
  // key: { type: 'breakfast' },
  category: 'breakfast'
}, {
  id: 2,
  image: Item2,
  title: 'diner double',
  price: 1299,
  description: "vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats",
  // key: { type: 'lunch' },
  category: 'lunch'

}, {
  id: 3,
  image: Item3,
  title: 'garden salad',
  price: 1599,
  description: "ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ",
  // key: { type: 'shakes' },
  category: 'shakes'
}, {
  id: 4,
  image: Item4,
  title: 'country delight',
  price: 1799,
  description: "Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut,",
  // key: { type: 'breakfast' },
  category: 'breakfast'

}, {
  id: 5,
  image: Item5,
  title: 'egg attack',
  price: 2099,
  description: "franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up",
  // key: { type: 'lunch' },
  category: 'lunch'

}, {
  id: 6,
  image: Item6,
  title: 'oreo dream',
  price: 2599,
  description: "Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday",
  // key: { type: 'shakes' },
  category: 'shakes'

}, {
  id: 7,
  image: Item7,
  title: 'bacon overflow',
  price: 3099,
  description: "carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird on it single-origin coffee",
  // key: { type: 'breakfast' },
  category: 'breakfast'

}, {
  id: 8,
  image: Item8,
  title: 'american classic',
  price: 3599,
  description: "on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut",
  // key: { type: 'lunch' },
  category: 'lunch'

}, {
  id: 9,
  image: Item9,
  title: 'quarantine buddy',
  price: 4099,
  description: "skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.",
  // key: { type: 'shakes' },
  category: 'shakes'

}]

const categoryNames: Category[] = ['all', 'breakfast', 'lunch', 'shakes'];

// type Action = {type: 'all'}| { type: 'breakfast' } | { type: 'lunch' } | { type: 'shakes' }

// const reducer = (state: Products[], action: Action) => {
//   switch (action.type) {
//     case 'all':
//       return items;
//     case 'breakfast':
//       return items.filter(item => item.key.type === 'breakfast');
//     case 'lunch':
//       return items.filter(item => item.key.type === 'lunch');
//     case 'shakes':
//       return items.filter(item => item.key.type === 'shakes');
//     default:
//       return state;
//   }
// }

const Menu = () => {

  // const [products, dispatch] = useReducer(reducer, items);

  const [category, setCategory] = useState<Category>('all');

  const capitalize = (str: string): string => {
    return str.trim().split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
  }

  const products: Products[] = category === 'all'
    ? items
    : items.filter(item => category === item.category);


  const containerVarients = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };


  return (
    <section className='py-20 px-10 grid grid-cols-1 gap-10'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-4xl font-semibold text-gray-800 text-center'>Our Menu</h1>
        <div className='w-25 h-1 bg-orange-400'></div>
      </div>
      <div
        className='flex justify-center items-center gap-4'>
        {categoryNames.map(name =>
          <motion.button
            layout
            transition={{ duration: 1 }}
            key={name}

            // onClick={() => dispatch({ type: "all" } as Action)}
            onClick={() =>
              setCategory(name)
            }
            className={`relative select-none px-3 py-1 rounded text-white cursor-pointer text-sm active:scale-90 transition-all duration-300
              ${category === name ? 'bg-orange-700' : 'bg-orange-400 hover:bg-orange-700'}`}
          >
            {category === name && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-orange-700 rounded -z-10"
                transition={{ duration: 0.3 }}
              />
            )}
            <span className='relative z-10'>
              {capitalize(name)}
            </span>
          </motion.button>
        )}
      </div>

      <motion.div
        layout
        variants={containerVarients}
        initial="hidden"
        animate="show"
        className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
        <AnimatePresence mode='popLayout'>
          {products.map(product =>
            <motion.article
              layout
              variants={itemVariants}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              initial="hiidden"
              animate="show"
              exit="exit"
              transition={{
                duration: 0.4,
                layout: { type: "spring", stiffness: 200, damping: 25 }
              }}
              key={product.id} className='flex flex-col items-center gap-10 bg-white rounded max-w-92'>
              <img
                className='rounded w-full h-full object-cover max-h-60'
                src={product.image} alt={'item' + product.id} />
              <div className='px-10'>
                <header className='flex justify-between items-center'>
                  <h2 className='text-lg font-semibold text-gray-900'>{capitalize(product.title)}</h2>
                  <span className='text-white bg-orange-400 rounded px-3 '>${(product.price / 100).toFixed(2)}</span>
                </header>
                <p className='text-md text-gray-500 my-10'>
                  {product.description}
                </p>
              </div>

            </motion.article>
          )}
        </AnimatePresence>
      </motion.div>


    </section>
  )
}

export default Menu
