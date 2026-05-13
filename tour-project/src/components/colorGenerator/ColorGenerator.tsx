import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
type ColorGrrid = {
  id: number;
  percent: number;
  color: string;
}

type HexaToRGB = (hex: string) => {
  r: number;
  g: number;
  b: number
}

type Toast = {
  id: number;
  message: string;
  type: 'success' | 'error'
}

const ToastComponent = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {

  const [isClose, setIsClose] = useState<boolean>(false)

  useEffect(() => {
    if (!isClose) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer)
    }

  }, [onClose, isClose])

  return <>
    <div
      onClick={onClose}
      onMouseEnter={() => setIsClose(true)}
      onMouseLeave={() => setIsClose(false)}
      className="w-78 px-2 py-5 bg-white shadow-lg shadow-gray-300 rounded flex items-start justify-between">
      <div role="alert" className="flex gap-2 items-center">
        <div>
          <svg className={`w-5 ${type === 'success' ? "text-green-500" : "text-red-500"} `} viewBox="0 0 24 24" width="100%" height="100%" fill="var(--toastify-icon-color-success)">
            <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z">
            </path>
          </svg>
        </div>
        <div className="text-gray-600">
          {message}
        </div>
      </div>
      <button type="button"
        onClick={onClose}
      >
        <svg className="w-3 -mt-1 text-gray-500 cursor-pointer" aria-hidden="true" viewBox="0 0 14 16">
          <path fillRule="evenodd" d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z">
          </path>
        </svg>
      </button>
    </div>
    <motion.div
      initial={{ width: '100%' }}
      animate={{ width: '0%' }}
      transition={{ duration: isClose ? 5 : 3 }}
      role="progressbar" className={`absolute left-0 bottom-0 rounded-bl ${type === 'success' ? "bg-green-500" : "bg-red-500"}  h-1`}>
    </motion.div>
  </>
}

const ColorGenerator = () => {

  const [color, setColor] = useState<string>('#000000');
  const [list, setList] = useState<ColorGrrid[]>([]);
  const [isError, setIsError] = useState<boolean>(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const hexaToRGB: HexaToRGB = (hex: string) => {
    let cleanHex = hex.replace(/^#/, '')
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(char => char + char).join('')
    }
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16)
    }
  }

  const RGBToHexa = (rgb: string) => {
    const fakeDiv = document.createElement('div')
    fakeDiv.style.color = rgb
    document.body.appendChild(fakeDiv)

    const cs = window.getComputedStyle(fakeDiv).color;
    document.body.removeChild(fakeDiv)

    const values = cs.match(/\d+/g);

    if (!values) return null;

    const [r, g, b] = values.map(Number);
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

  }

  const copyToClipboard = async (hex: string) => {

    await navigator.clipboard.writeText(hex);
    addToast(`Copied ${hex} to clipboard!`, 'success');
  }

  const errorMessage = () => {
    if (isError) {
      addToast(`Unable to parse color from string: ${color}`, 'error')
    }
  }

  const adjustedColor = (hex: string, factor: number) => {
    const { r, g, b } = hexaToRGB(hex)

    const adjust = (val: number) => {
      const res = factor > 0
        ? val + (255 - val) * factor
        : val * (1 + factor);

      return Math.round(Math.min(255, Math.max(0, res)))
    }

    return '#' + [adjust(r), adjust(g), adjust(b)]
      .map(x => x.toString(16).padStart(2, '0')).join('')

  }

  useEffect(() => {
    const event = { preventDefault: () => { } } as React.FormEvent<HTMLFormElement>;
    handleSubmit(event);
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsError(false)
    errorMessage()

    try {
      const resolve = color.startsWith('#') ? color : RGBToHexa(color)

      const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;

      if (!resolve || !hexRegex.test(resolve)) {
        setIsError(true)

        throw new Error("Invalid Color");
      }

      const finalColor = resolve

      const newList: ColorGrrid[] = Array.from({ length: 21 }, (_, index) => {
        const factor = (10 - index) / 10
        return {
          id: index,
          percent: Math.abs((index - 10) * 10),
          color: adjustedColor(finalColor, factor)
        }
      })

      setList(newList)
    } catch (error) {
      console.error('Error :' + error);
      setIsError(true)
    }
  }

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };


  return (
    <main className="relative flex flex-col min-w-screen min-h-screen">
      <section className="flex flex-col gap-x-10 gap-y-5 m-10 md:items-center md:flex-row">
        <h4 className="capitalize text-gray-800 text-2xl">color generator</h4>
        <form
          onSubmit={handleSubmit}
          className="flex items-center">
          <input
            onChange={(e) => setColor(e.target.value)}
            value={color.startsWith('#') ? color : RGBToHexa(color) ?? "#000000"}
            className="bg-white h-11 rounded pr-0.5" type="color" />
          <input
            onChange={(e) => setColor(e.target.value)}
            value={color}
            className={`${isError ? 'border-2 border-red-500' : 'border-none'} h-11 w-60 bg-white rounded px-5 text-lg placeholder:text-gray-400`} type="text" placeholder="#f15025" />
          <button style={{ backgroundColor: isError ? 'black' : color }} className={`text-white text-sm rounded-r px-4 py-3`} type="submit">Submit</button>
        </form>
      </section>
      <section className="grid min-[500px]:grid-cols-2 min-[670px]:grid-cols-3 md:grid-cols-4 min-[1116px]:grid-cols-5 min-[1336px]:grid-cols-6">


        {list.map(item =>
          <article key={item.id}
            onClick={() => { copyToClipboard(item.color) }}
            role="button"
            aria-label={`Copy hex code ${item.color}`}
            title="Click to copy"
            style={{ backgroundColor: item.color }}
            className={`${item.id > 10 ? 'text-white' : 'text-gray-900'}
              pb-20 pt-5 pl-10 text-lg cursor-pointer active:opacity-80`}>
            <p>{item.percent}%</p>
            <p>{item.color}</p>
          </article>
        )}
      </section>
      <AnimatePresence>
        <div className="absolute top-0 left-0 right-0 flex flex-col gap-y-4 pt-5">


          {toasts.map(toast =>
            <motion.div key={toast.id}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="m-auto relative pointer-events-auto">
              <ToastComponent
                message={toast.message}
                type={toast.type}
                onClose={() => removeToast(toast.id)}
              />
            </motion.div>
          )
          }

        </div>
      </AnimatePresence>
    </main >
  )
}

export default ColorGenerator
