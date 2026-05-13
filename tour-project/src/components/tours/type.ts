import { z } from 'zod'

const tourSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  images: z.array(z.string()),
  isExpanded: z.boolean().default(false)
})

export type ApiTour = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[]
}

export const tourArraySchema = z.array(tourSchema)

export type Tour = z.infer<typeof tourSchema>

