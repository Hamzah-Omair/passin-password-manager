import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NavBar from './assets/components/NavBar'
import Manager from './assets/components/Manager'
import Footer from './assets/components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <NavBar />
     <div className='bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]'>
      <Manager/>
     </div>
      <Footer/>
    </>
  )
}

export default App
