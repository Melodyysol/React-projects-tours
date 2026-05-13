import axios from "axios"
import { useEffect, useState } from "react"
import { tourArraySchema, type ApiTour, type Tour } from "./type"

const Projects = () => {

  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  const toggleExpand = (id: number) => {
    setTours((prevTours) =>
      prevTours.map((tour) =>
        tour.id === id ? { ...tour, isExpanded: !tour.isExpanded } : tour
      )
    )
  }

  const handleNotInteresting = (id: number) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id))
  }

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products')
        const toursWithExpand = response.data.products.map((tour: ApiTour) => ({
          ...tour,
          isExpanded: false
        }));
        const validatedTours = tourArraySchema.safeParse(toursWithExpand);
        if (!validatedTours.success) {
          console.error('Error validating tours:', validatedTours.error)
          return
        }
        setTours(validatedTours.data);
      } catch (error) {
        console.error('Error fetching tours:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTours()
  }, [])

  const shorterWords = (str: string, maxLength: number) => {
    if (str.length <= maxLength) {
      return str
    }
    return str.slice(0, maxLength) + '...'
  }

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading tours...</p>
  }

  if (tours.length === 0) {
    return (
      <div className="m-auto w-screen h-screen text-center">
        <p className="text-center text-gray-500">No tours available.</p>
        <button
          className="bg-green-500 mt-2 text-white cursor-pointer py-2 px-4 rounded-sm hover:bg-green-600 transition-colors duration-300"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
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
              className="rounded-t-sm max-w-full h-64 object-cover"
              src={tourItem.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={tourItem.title} />
          </div>
          <div>
            <h2
              className="text-center text-2xl font-semibold text-gray-800 my-4"
            >{tourItem.title}</h2>
            <p className="text-gray-500">
              {tourItem.isExpanded ? tourItem.description : shorterWords(tourItem.description, 100)}
            </p>
            <span className={`ml-2 text-green-500 text-sm hover:underline cursor-pointer transition-all duration-700 ${tourItem.description.length <= 100 ? 'hidden' : 'block'}`}
              onClick={() => toggleExpand(tourItem.id)}>
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

export default Projects
