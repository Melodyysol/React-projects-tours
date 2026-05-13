import { FaCartPlus } from 'react-icons/fa'
import { AnimatePresence, motion } from 'motion/react'

import Phone1 from '../../assets/phone-1.png'
import Phone2 from '../../assets/phone-2.png'
import Phone3 from '../../assets/phone-3.png'
import Phone4 from '../../assets/phone-4.png'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useReducer } from 'react'

type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}
type CartState = {
  lists: CartItem[];
}
type Action =
  | { type: 'increase', payload: number }
  | { type: 'decrease', payload: number }
  | { type: 'remove', payload: number }
  | { type: 'clear' }

const carts: CartItem[] = [{
  id: 1,
  image: Phone1,
  name: 'Samsung Galaxy S8',
  price: 399.99,
  quantity: 1
}, {
  id: 2,
  image: Phone2,
  name: 'google pixel',
  price: 499.99,
  quantity: 1
}, {
  id: 3,
  image: Phone3,
  name: 'Xiaomi Redmi Note 2',
  price: 699.99,
  quantity: 1
}, {
  id: 4,
  image: Phone4,
  name: 'Samsung Galaxy S7',
  price: 599.99,
  quantity: 1
}]




const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'increase':
      return {
        ...state,
        lists: state.lists.map(list =>
        list.id === action.payload
          ? { ...list, quantity: list.quantity + 1 }
          : list
      )}
    case 'decrease':
      return {
        ...state,
        lists: state.lists.map(list =>
        list.id === action.payload
          ? { ...list, quantity: list.quantity - 1 }
          : list
      ).filter(cart => cart.quantity > 0)
    };
    case 'remove':
      return {
        ...state,
        lists: state.lists.filter(list => 
        list.id === action.payload
      )};
    case 'clear':
      return {...state, lists: []};
    default:
      return state;
  }
}


const CartReducer = () => {

  const initialState: CartState = {
    lists: carts,
  };

  const [state, dispatch] = useReducer(reducer, initialState)


  const totalCost = state.lists.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalQuantity = state.lists.reduce((total, item) => total + item.quantity, 0);

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
      <nav className='bg-blue-700 text-white flex w-screen items-center py-6 justify-around'>
        <h1 className='lg:text-4xl'>UseReducer</h1>
        <div className='relative'>
          <div className='text-4xl'>
            <FaCartPlus />
          </div>
          <div className='absolute -top-3 -right-3.5 bg-white/50 backdrop-blur-2xl rounded-full text-center w-7 h-7 text-xl'>{totalQuantity}</div>
        </div>
      </nav>

      <section className='mt-15 flex flex-col gap-8'>
        <header>
          <h2 className='uppercase text-3xl md:text-4xl text-center'>your bag</h2>
        </header>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className='flex flex-col gap-6 w-screen'>
          <AnimatePresence>
            {state.lists.map(cart =>
              <motion.article
                variants={itemVariants}
                key={cart.id} className='flex items-center px-10 max-w-200 mx-auto w-full'>
                <img src={cart.image} width={80} />
                <div className='flex-1 flex flex-col items-start'>
                  <h5 className='capitalize text-sm text-gray-800'>{cart.name}</h5>
                  <span className='text-gray-500'>${cart.price}</span>
                  <button
                    onClick={() => dispatch({type: 'remove', payload:cart.id})}
                    className='text-blue-500 text-sm cursor-pointer hover:text-blue-700 transition-all duration-500'>remove</button>
                </div>

                <div className='flex flex-col items-center'>
                  <motion.button
                    onClick={() => dispatch({type: 'increase', payload:cart.id})}
                    whileTap={{ scale: 0.7 }}
                    whileHover={{ scale: 1.3 }}
                    className='text-2xl text-blue-600 cursor-pointer transition-all duration-500'><IoIosArrowUp /></motion.button>
                  <span>{cart.quantity}</span>
                  <motion.button
                    onClick={() => dispatch({type: 'decrease', payload:cart.id})}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    className='text-2xl text-blue-600 cursor-pointer transition-all duration-500'><IoIosArrowDown /></motion.button>
                </div>

              </motion.article>)}
          </AnimatePresence>
        </motion.div>

        <footer className='mx-auto w-screen max-w-200 px-10 mb-10 text-sm grid'>

          {state.lists.length === 0 &&
            <p className='text-center -mt-10 text-lg text-gray-500'>
              is currently empty
            </p>}

          {state.lists.length > 0 &&
            <>
              <hr className='border border-gray-300' />
              <div className='flex justify-between items-center mt-3'>
                <span>Total</span>
                <span className='bg-blue-600 text-white rounded px-2.5 py-0.5'>${(totalCost).toFixed(2)}</span>
              </div>
              <motion.button
                onClick={() => dispatch({type: 'clear'})}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className='mx-auto mt-2 bg-gray-400/50 text-blue-600 backdrop-blur-2xl rounded px-2.5 py-0.5 hover:text-gray-300 hover:bg-blue-900 cursor-pointer select-none transition-all duration-500'>Clear Cart</motion.button>
            </>
          }
        </footer>
      </section>

    </main>
  )
}

export default CartReducer
