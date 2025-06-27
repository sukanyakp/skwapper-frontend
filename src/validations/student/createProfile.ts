import z from 'zod'



export const profileSchema = z.object({
    name : z.string().nonempty("Name is required"),
    bio : z.string().nonempty("Bio is required"),
    instrument : z.string().nonempty("Instrument is required"),
    location : z.string().nonempty("Location is required"),
    image :z.instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .nullable(),
})