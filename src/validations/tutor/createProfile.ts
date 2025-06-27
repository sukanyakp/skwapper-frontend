import z from 'zod'

export const profileSchema = z.object({
  name: z.string().nonempty("Name is required"),
  bio: z.string().nonempty("Bio is required"),
  category: z.string().nonempty("Category is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  experience : z.string().nonempty("Experience is required"),
  location : z.string().nonempty("Location is required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .nullable()
});
