import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './comp/header';
import Home from './pages/home';
import Register from './pages/register';
import Services from './pages/services';
import About from './pages/about';
import Countries from './pages/countries';
import Contact from './pages/contact';
import Add from './pages/add';
import Login from './pages/login';
import Forgot from './pages/forgot';
import Footer from './comp/footer';

function App() {
  return (
    <Router>
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "159vh" 
      }}>
        <Header />
        
        {/* Main content grows to push footer to bottom */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route exact path='/forgot' element={<Forgot/>} />
            <Route exact path='/services' element={<Services/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/countries' element={<Countries/>}/>
            <Route exact path='/contact' element={<Contact/>}/>
            <Route exact path='/add' element={<Add/>} />
            <Route exact path='/login' element={<Login/>} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
