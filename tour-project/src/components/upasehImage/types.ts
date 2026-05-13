import { z } from "zod"


const unsplashSchema = z.object({
  id: z.string(),
  alt_description: z.string().nullable(),
  urls: z.object({
    small: z.string(),
    regular: z.string(),
  }),
  user: z.object({
    name: z.string(),
  }),
});

export const unsplashArraySchema = z.array(unsplashSchema)

export type Unsplash = z.infer<typeof unsplashSchema>
