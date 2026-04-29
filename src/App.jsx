import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Home } from './Home'
import { Book1 } from './Book1'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Contacts } from './Contacts'

function App() {
  const [count, setCount] = useState(0)

  return (
			<BrowserRouter>
				<Header/>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/book" element={<Book1 />} />
					<Route path="/contacts" element={<Contacts />} />
					
					</Routes>
				<Footer/>
			</BrowserRouter>
   
  )
}

export default App
