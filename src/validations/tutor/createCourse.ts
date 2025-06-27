import z from "zod";

export const courseSchema = z.object({
  title: z.string().nonempty("Title is required"),
  category: z.string().nonempty("Category is required"),
  level: z.enum(["basic", "intermediate", "advanced"], {
    required_error: "Level is required",
  }),
  description: z.string().nonempty("Description is required"),
  price: z.string().nonempty("Price is required"),
  language: z.string().nonempty("Language is required"),
  songName: z.string().optional(),
  movieOrAlbum: z.string().optional(),
}).superRefine((data, ctx) => {
  // Conditionally require songName and movieOrAlbum for advanced level
  if (data.level === "advanced") {
    if (!data.songName || data.songName.trim() === "") {
      ctx.addIssue({
        path: ["songName"],
        code: z.ZodIssueCode.custom,
        message: "Song Name is required for advanced level",
      });
    }
    if (!data.movieOrAlbum || data.movieOrAlbum.trim() === "") {
      ctx.addIssue({
        path: ["movieOrAlbum"],
        code: z.ZodIssueCode.custom,
        message: "Movie or Album is required for advanced level",
      });
    }
  }
});
