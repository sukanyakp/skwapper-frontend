import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './context/user-context.tsx'

createRoot(document.getElementById('root')!).render(
 <UserProvider>
    <StrictMode>
      <App />
    </StrictMode>
 </UserProvider>
)
