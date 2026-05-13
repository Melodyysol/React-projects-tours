import { useEffect, useState } from "react";
import type { Tour } from "./types";

const TourImage = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG91cnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"

function Project() {

  const [isLoading, setIsLoading] = useState(false)

  const tour: Tour = {
    id: 1,
    title: "Best of Paris in 7 Days Tour",
    description: "Paris is synonymous with the finest things that culture can offer — in art, fashion, food, literature, and ideas. On this tour, your Paris-savvy Rick Steves guide will immerse you in the very best of the City of Light: the masterpiece-packed Louvre and Orsay museums, resilient Notre-Dame Cathedral, exquisite Sainte-Chapelle, and extravagant Palace of Versailles. You'll also enjoy guided neighborhood walks through the city's historic heart as well as quieter moments to slow down and savor the city's intimate cafés, colorful markets, and joie de vivre. Join us for the Best of Paris in 7 Days!",
    price: 1990,
    imageUrl: TourImage,
    isExpanded: false
  }
  const [tours, setTours] = useState<Tour[]>([tour])
  const toggleExpand = (id: number) => {
    setTours(prev =>
      prev.map((t => t.id === id
        ? { ...t, isExpanded: !t.isExpanded }
        : t
      ))
    )
  }
  const handleNotInteresting = (id: number) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id))
  }

  useEffect(() => {
    if (tours.length === 0) {
      setIsLoading(true)
      // Simulate fetching new tours after a delay
      const timer = setTimeout(() => {
        setTours([tour])
        setIsLoading(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [tours.length])

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 text-lg py-10">
        Loading new tours...
      </div>
    )
  }

  return (
    <>
      {tours.map((tourItem) => (

        <div className="border-2 border-gray-300 rounded-lg p-4 mb-4 max-w-sm mx-auto" key={tourItem.id}>
          <div className="relative">
            <span
              className="absolute top-0 right-0 bg-green-400 px-4 py-1 text-white font-semibold rounded-tr-sm"
            >${tourItem.price.toLocaleString()}</span>
            <img
              className="bg-red-700 rounded-t-sm max-w-full h-64 object-cover"
              src={tourItem.imageUrl}
              alt={tourItem.title} />
          </div>
          <div>
            <h2
              className="text-center text-2xl font-semibold text-gray-800 my-4"
            >{tourItem.title}</h2>
            <p className="text-gray-500">
              {tourItem.isExpanded ? tourItem.description : `${tourItem.description.substring(0, 100)}...`}
            </p>
            <span className="text-green-500 text-sm hover:underline cursor-pointer transition-all duration-700" onClick={() => toggleExpand(tourItem.id)}>
              {tourItem.isExpanded ? "Show Less" : "Read more"}
            </span>
          </div>
          <button
            className="text-green-500 text-sm py-2 text-center border border-green-500 rounded-sm hover:bg-green-500 hover:text-white cursor-pointer m-auto block mt-4 w-full transition-all duration-800"
            onClick={() => handleNotInteresting(tourItem.id)}>
            Not Interesting
          </button>
        </div>
      ))}
    </>
  )
}

export default Project;