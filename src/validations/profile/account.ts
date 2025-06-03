import  {nameRegex} from '../../constants/regex'
import  z from 'zod' ; 

export const formSchema = z.object({

    name : z
         .string()
         .min(3,"Name must be atleast 3 characters !")
         .regex(nameRegex.capitalLetter,"Name's first letter should be capital !")
         .regex(nameRegex.alphabet,"Name should contain only alphabets !" )
         .nonempty("Name is required"),

})