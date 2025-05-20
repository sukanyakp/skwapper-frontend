import { useState } from "react"
import {signup} from "../api/api"

const Signup = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit = async(e : React.FormEvent)=>{
        e.preventDefault();
        signup(email,password);
    }

  return (
   <form  onSubmit={handleSubmit}>
    <input type="email"  placeholder="email"  value={email}  onChange={e => setEmail (e.target.value)} />
    <input type="password" placeholder="password" value={password}  onChange={e => setPassword(e.target.value)} />

    <button  type="submit">SignUp</button>
   </form>
  )
}

export default Signup
