import { AnimatePresence, motion, useAnimation } from 'motion/react'
import { useEffect, useState } from 'react'

type Item = {
  id: string;
  name: string;
  isCompleted: boolean;
}

type Toast = {
  id: string;
  message: "please provide value" | "item deleted";
  type: "success" | "error"
}
type ToastProps = {
  toast: Toast;
  onRemove: (id: string) => void;
}

const Toast = ({ toast, onRemove }: ToastProps) => {

  const [isPaused, setIsPaused] = useState<boolean>(false)

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      width: '0%',
      transition: { duration: 3, ease: "linear" }
    });
  }, [controls])

  useEffect(() => {
    if (isPaused) {
      controls.stop()
    } else {
      // Resume moving towards 0% from the current position
      controls.start({
        width: "0%",
        transition: { duration: 3, ease: "linear" }
      });
    }
  }, [isPaused, controls])


  return <motion.div
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.35, ease: "easeInOut", stiffness: 300, damping: 2 }}
    key={toast.id}
    onClick={() => onRemove(toast.id)}
    className='relative cursor-pointer w-70 py-4 px-1 m-auto items-center justify-between flex bg-white shadow-md rounded mb-5 pointer-events-auto'>
    <div className='flex ml-3'>
      <div className={`px-2.5 rounded-full text-center text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>!</div>
      <p className='capitalize ml-2 text-gray-600'>{toast.message}</p>
    </div>
    <motion.button
      onClick={(e) => {
        e.stopPropagation()
        onRemove(toast.id)
      }}
      whileHover={{ color: 'black', transition: { duration: 0.35 } }}
      className='text-gray-500 cursor-pointer text-lg mr-2 -mt-7'>
      x
    </motion.button>
    <motion.div
      initial={{ width: '100%' }}
      animate={controls}
      onAnimationComplete={() => !isPaused && onRemove(toast.id)}
      className={`absolute bottom-0 left-0 ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'} h-1 w-full rounded-bl`}></motion.div>
  </motion.div>
}


const GroceryBud = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<Item[]>([])

  const [toasts, setToasts] = useState<Toast[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue) {
      const newToast: Toast = {
        id: crypto.randomUUID(),
        message: 'please provide value',
        type: 'error'
      }
      setToasts(prev => [...prev, newToast])
      return
    };
    setItems([...items, { id: crypto.randomUUID(), name: inputValue, isCompleted: false }])

    setInputValue('')
  }

  const toggleItem = (id: string) => {
    setItems(prev =>
      prev.map(x => x.id === id
        ? { ...x, isCompleted: !x.isCompleted }
        : x)
    )
  }

  const removeItem = (id: string) => {
    setItems(prev =>
      prev.filter(x => x.id !== id)
    )
    const newToast: Toast = {
      id,
      message: 'item deleted',
      type: 'success'
    }
    setToasts(prev => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts(prev =>
      prev.filter(t => t.id !== id)
    )
  }

  return (
    <section className="relative min-h-screen min-w-screen flex">
      <motion.div layout className='fixed top-5 left-0 right-0 pointer-events-none'>
        <AnimatePresence>
          {toasts.map(toast =>
            <Toast
              key={toast.id}
              toast={toast}
              onRemove={removeToast}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <div className="m-auto bg-white flex flex-col items-center px-5 py-8 rounded shadow hover:shadow-lg transition-all duration-500 max-h-120">

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-5">
          <h5 className="capitalize text-center text-2xl">grocery bud</h5>
          <div className="flex">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              type="text" className="px-3 bg-gray-100 border border-gray-200 min-w-[20rem] outline-blue-600 rounded-l" />
            <motion.button
              type='submit'
              whileHover={{ backgroundColor: '#0e7490', transition: { duration: 0.35 } }}
              className="bg-[#34aadc] text-white text-sm py-1 px-4 rounded-r cursor-pointer">
              Add Item
            </motion.button>
          </div>
        </form>
        <div
          style={{ scrollbarWidth: 'none' }}
          className='mt-10 w-full flex flex-col gap-y-2 overflow-scroll'>

          <AnimatePresence>
            {items.map(item =>
              <motion.article
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                key={item.id} className='flex justify-between items-center gap-4'>
                <input
                  onChange={() => toggleItem(item.id)}
                  checked={item.isCompleted}
                  type="checkbox" className="cursor-pointer w-4 h-4" />
                <p className={`flex-1 capitalize ${item.isCompleted ? 'line-through text-gray-400' : ''}`}>{item.name}</p>
                <motion.button
                  onClick={() => removeItem(item.id)}
                  whileHover={{ backgroundColor: '#0e7490', scale: 1.05, transition: { duration: 0.35 } }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-sm text-white bg-black cursor-pointer px-1 rounded `}>
                  Delete
                </motion.button>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default GroceryBud
