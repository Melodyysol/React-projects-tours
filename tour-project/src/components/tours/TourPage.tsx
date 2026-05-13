import ProjectQuery from './ProjectQuery'
import axios from 'axios'
import { tourArraySchema, type ApiTour, type Tour } from './type';

function TourPage() {

  const fetchTour = async (): Promise<Tour[]> => {
    try {
      const res = await axios.get('https://dummyjson.com/products');

      const toursWithExpand = res.data.products.map((tour: ApiTour) => ({
        ...tour,
        isExpanding: false
      }))

      const validatedTours = tourArraySchema.safeParse(toursWithExpand)
      if (!validatedTours.success) {
        console.error(validatedTours.error)
        return []
      }
      return validatedTours.data

    } catch (error) {
      console.error('Error fetching tours:', error)
      return []
    }
  }

  return (
    <>
    <h1 className='text-center text-3xl underline mb-10 mt-5'>Our Tours</h1>
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <ProjectQuery fetchTour={fetchTour} />
    </div>
    </>
  )
}

export default TourPage
