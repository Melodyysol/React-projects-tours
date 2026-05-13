import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Tour } from "./type"
import axios from "axios";
import { useState } from "react";

type FetchTourProps = {
  fetchTour: () => Promise<Tour[]>
}

function ProjectQuery({ fetchTour }: FetchTourProps) {

  const queryClient = useQueryClient()

  const deleteTour = async (id: number) => {
    await axios.delete(`https://dummyjson.com/products/${id}`)
    return id;
  }

  const addTour = async (newTour: Partial<Tour>) => {
    const res = await axios.post("https://dummyjson.com/products/add", newTour)
    return res.data;
  }

  // const { mutate, variables, isPending } = useMutation({
  //   mutationFn: deleteTour,
  //   onSuccess(deletedId) {
  //     queryClient.setQueryData(['tours'], (old: Tour[] = []) =>
  //       old.filter(t => t.id !== deletedId)
  //     )
  //   },
  //   onError: () => {
  //     alert("Failed to delete")
  //   }
  // })

  // Updated form of above

  const { mutate, variables, isPending } = useMutation({
    mutationFn: deleteTour,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['tours'] });

      const previousTours = queryClient.getQueryData<Tour[]>(['tours']);

      queryClient.setQueryData(['tours'], (old: Tour[] = []) =>
        old.filter(t => t.id !== id)
      );

      return { previousTours }
    },
    onError: (_err, _id, context) => {
      if (context?.previousTours) {
        queryClient.setQueryData(['tours'], context.previousTours)
      }
    },
    // This refload the page all the time even when delete
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['tours'] })
    // }
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: addTour,
    onMutate: async (newTour) => {
      await queryClient.cancelQueries({ queryKey: ['tours'] });

      const previousTours = queryClient.getQueryData<Tour[]>(['tours'])

      const optimisticTour: Tour = {
        id: Date.now(),
        title: newTour.title || 'Title',
        description: newTour.description || '',
        category: newTour.category || '',
        price: newTour.price || 0,
        images: newTour.images || [],
        isExpanded: newTour.isExpanded || false,
      }

      queryClient.setQueryData<Tour[]>(['tours'], (old: Tour[] = []) => [
        optimisticTour,
        ...old
      ]);

      return ({ previousTours });

    },

    onError: (_err, newTour, context) => {
      if (context?.previousTours) {
        queryClient.setQueryData<Tour[]>(['tours'], context.previousTours)
      }
    },

    onSuccess: (data) => {
      queryClient.setQueryData<Tour[]>(['tours'], (old: Tour[] = []) =>
        old.map(t =>
          t.id.toString().startsWith('1') ? { ...t, id: data.id } : t
        )
      )
    }
  })

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0
  })


  const {
    data: tours = [],
    error,
    isError,
    isLoading
  } = useQuery<Tour[]>({
    queryKey: ['tours'],
    queryFn: fetchTour
  });


  const shorterWords = (str: string, max: number) => {
    if (str.length <= max) {
      return str;
    }
    return str.slice(0, max) + '...';
  }

  const toggleExpand = (id: number) => {
    queryClient.setQueryData(['tours'], (prev: Tour[] = []) => prev.map(
      t => t.id === id
        ? { ...t, isExpanded: !t.isExpanded }
        : t
    ))
  }
  // Cool version (AI generated)
  // const [expandedIds, setExpandedIds] = useState<number[]>([])

  // const toggleExpand = (id: number) => {
  //   setExpandedIds(prev =>
  //     prev.includes(id)
  //       ? prev.filter(i => i !== id)
  //       : [...prev, id]
  //   )
  // }


  // const handleNotInteresting = (id: number) => {
  //   // setLocalTours(prev => prev.filter(tour => tour.id !== id))
  //   queryClient.setQueryData(['tours'], (old: Tour[] = []) => {
  //     old.filter(t => t.id !== id)
  //   })
  // }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addMutate({
      title: form.title,
      description: form.description,
      price: form.price,
      images: ["https://placehold.co/600x400"],
      category: "tour",
    });

    setForm({
      title: '',
      description: '',
      price: 0
    });
  }

  if (isLoading)
    return <p className="text-center text-gray-500">Loading tours...</p>;
  if (isError) {
    const message = error instanceof Error ? error.message : 'Something went wrong.'
    return (
      <p className="text-center text-red-500">
        Error : {message}
      </p>
    )
  }


  if (tours.length === 0) {
    return (
      <div className="text-center">
        <p>No tours left.</p>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: ['tours'] })}
          className="mt-2 text-green-500 cursor-pointer"
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-4 p-4 border rounded"
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border p-2 block mb-2"
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="border p-2 block mb-2"
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: Number(e.target.value) })}
          className="border p-2 block mb-2"
        />
        <button
          type="submit"
          disabled={!form.title || !form.description}
          className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded-2xl hover:opacity-70 disabled:cursor-no-drop disabled:bg-green-300">
          Add Tour
        </button>
      </form>


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
            onClick={() => mutate(tourItem.id)}
            disabled={isPending && variables === tourItem.id}
          >
            {isPending && variables === tourItem.id ? "Removing..." : "Not Interesting"}
          </button>
        </div>
      ))}
    </>
  )
}

export default ProjectQuery
