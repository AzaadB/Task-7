import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import pages and components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import AllOld from './components/FindAllOld';


function App() {//Linking all pages together
    return (
        <div className="App">
            <BrowserRouter>
            <Navbar/>
                <div className='pages'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                    </Routes>
                </div>
                <Routes>
                    <Route path='/Old' element={<AllOld/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;//exporting the app