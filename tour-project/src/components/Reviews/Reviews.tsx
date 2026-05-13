import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { personsArray } from './personArr';

type Trend =
  { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'set'; payload: number }


const reducer = (state: number, action: Trend) => {
  switch (action.type) {
    case 'increment':
      return (state + 1) % personsArray.length;
    case 'decrement':
      return (state - 1 + personsArray.length) % personsArray.length;
    case 'set':
      return action.payload
    default:
      return state;
  }
}

const Reviews = () => {

  const [index, dispatch] = useReducer(reducer, 0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)


  const person = personsArray[index];

  // const [count, setCount] = useState<number>(0)


  // const handleNewPerson = (trend: Trend) => {

  //   let newIndex = count;

  //   if (trend === 'increment') {
  //     newIndex = (count + 1) % personsArray.length
  //   } else {
  //     newIndex = (count - 1 + personsArray.length) % personsArray.length
  //   }
  //   setCount(newIndex)
  // }

  const randomPerson = useCallback(() => {
    // let randomIndex = Math.floor(Math.random() * personsArray.length);

    // if (randomIndex === count) {
    //   randomIndex = (count + 1) % personsArray.length;
    // }

    // setCount(randomIndex);

    let randomIndex = Math.floor(Math.random() * personsArray.length);

    if (randomIndex === index) {
      randomIndex = (index + 1) % personsArray.length;
    }

    dispatch({ type: 'set', payload: randomIndex });
  }, [index]);
  const capitalize = (str: string) => {
    return str.trim().split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ')
  };
  useEffect(() => {

    if (isPaused) return

    const timer = setInterval(() => {
      dispatch({ type: 'increment' });
    }, 10000);
    return () => clearInterval(timer);
  }, [isPaused])


  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
  }
  const handleTouchEnd = () => {
    if (touchEndX.current === null || touchStartX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwapDistance = 50;

    if (distance > minSwapDistance) {
      dispatch({ type: "increment" })
    } else if (distance < -minSwapDistance) {
      dispatch({ type: "decrement" })
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }


  return (
    <div className="w-screen bg-gray-100 h-screen flex">
      <div
        onMouseEnter={() => { setIsPaused(true) }}
        onMouseLeave={() => { setIsPaused(false) }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        className="touch-pan-y m-auto bg-white w-3/4 h-3/4 flex flex-col items-center justify-center shadow-gray-400 hover:shadow-md p-4 max-w-150 rounded border border-gray-100 md:max-h-110 md:gap-5">
        <div className='relative rounded-full bg-blue-600 w-40 h-40'>
          <img src={person.image} alt={`person-${person.id}`} className='absolute top-1 right-2 w-40 h-40 rounded-full object-cover' />
          <div className='absolute top-2 left-0 rounded-full bg-blue-600 w-10 h-10 text-white text-2xl text-center'>
            <svg className='absolute top-2 left-2 ' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z"></path></svg>
          </div>
        </div>

        <div>
          <h1 className='text-3xl text-gray-700 text-center'>{capitalize(person.name)}</h1>
          <h2 className='text-blue-600 text-sm text-center'>{person.title.toUpperCase()}</h2>
          <p>
            {person.description}
          </p>
        </div>
        <div>
          <span
            onClick={() => dispatch({ type: 'decrement' })}
            className='text-2xl text-blue-900 cursor-pointer ml-7 mr-4 select-none'>←</span>
          <span
            // onClick={() => handleNewPerson('increment')}
            onClick={() => dispatch({ type: 'increment' })}
            className='text-2xl text-blue-900 cursor-pointer select-none'>→</span>

          <button
            onClick={randomPerson}
            className='text-sm block bg-blue-200 px-4 py-1 rounded text-blue-500 cursor-pointer hover:text-white hover:bg-blue-900 transition-all duration-500 ease-in-out select-none active:scale-90'>Surprise Me</button>
        </div>
      </div>
    </div>
  )
}

export default Reviews
