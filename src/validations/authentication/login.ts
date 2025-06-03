import z from 'zod'
import { emailRegex ,passwordRegex} from '../../constants/regex'


export const formSchema = z.object({
    email : z
    .string()
    .email("Invalid email address")
    .regex(emailRegex.validEmail , "Enter a valid email")
    .nonempty("Email is required"),

    password : z
    .string()
    .min(6,'password must be atleast 6 characters')
    .regex(passwordRegex.capitalLetter , 'password must contain a capital letter')
    .regex(passwordRegex.digit, 'password must contain a digit')
    .regex(passwordRegex.specialSymbol, 'password must contain a special number')
    
})