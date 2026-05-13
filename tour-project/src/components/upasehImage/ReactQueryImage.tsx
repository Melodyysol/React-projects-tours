import axios from 'axios';

import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useState } from 'react'
import { type Unsplash, unsplashArraySchema } from './types';
import { useQuery } from '@tanstack/react-query';

const client_id = "KECeqK5IyRz4iULfQu6qjob3HgsXYntsTx9LO19jvjI"

const fetchData = async (searchTerm: string) => {
  const url = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${searchTerm}&per_page=20`
  try {
    const response = await axios.get(url)
    const validatedImages = unsplashArraySchema.safeParse(response.data.results)
    if (!validatedImages.success) {
      console.error('Error validating tours:', validatedImages.error)
      return []
    }
    return validatedImages.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
}


const ReactQueryImage = () => {

  const [changeTheme, setChangeTheme] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('cat')
  const [inputValue, setInputValue] = useState<string>('')

  const {
    data: lists = [],
    isError,
    error,
    isLoading,
  } = useQuery<Unsplash[], Error>({
    queryKey: ['unSplash', searchTerm],
    queryFn: () => fetchData(searchTerm)
  })

  if (isError) {
    return <p className="text-red-500 text-2xl">
      {error.message}
    </p>
  }


  return (
    <main className={`flex flex-col gap-15 w-screen min-h-screen ${changeTheme ? 'bg-gray-700 text-gray-100' : ''} transition-all duration-500`}>
      <section className='w-4/5 mx-auto relative'>
        <button
          onClick={() => setChangeTheme(prev => !prev)}
          className='absolute right-5 top-5 text-2xl md:text-3xl cursor-pointer'>
          {changeTheme ? <MdDarkMode color='white' /> : <MdLightMode />}
        </button>
      </section>
      <section className='mx-auto sm:w-4/5 max-w-150  '>
        <h1 className="capitalize text-5xl md:text-6xl text-blue-600 text-center mb-8">unsplash images</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchTerm(inputValue);
          }}
          className='flex items-center'>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text" placeholder="cat" className={`border border-gray-300 flex-1 px-4 py-0.5 placeholder:text-sm focus:outline outline-blue-600 focus:rounded ${changeTheme ? 'text-white ' : ''}`} />
          <button type="submit" className='bg-blue-600 cursor-pointer text-white px-4 text-sm hover:text-black hover:bg-blue-600/50 transition-all duration-500 py-1.5'>Search</button>
        </form>
      </section>
      <section className='mx-auto max-w-300 grid sm:grid-cols-2 md:grid-cols-3 gap-8 items-center px-10 mb-10'>
        {isLoading && <p className='text-2xl'>
          Loading...
        </p>}
        {(lists.length === 0 && !isLoading) && <p className='text-3xl col-span-full'>
          No Result Found...
        </p>}
        {!isLoading && lists.map(list =>
          <img key={list.id} src={list.urls.regular} alt={list.alt_description ?? 'search Image'} className='h-60 w-full object-cover' />
        )}
      </section>
    </main>
  )
}

export default ReactQueryImage
