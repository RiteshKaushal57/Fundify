import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Register from './components/Register.jsx'
import EntrepreneurRegister from './components/Entrepreneur/EntrepreneurRegister.jsx'
import BusinessIdeas from './components/BusinessIdeas.jsx'
import BusinessIdeaDetail from './components/BusinessIdeaDetail.jsx'
import InvestorRegister from './components/Investor/InvestorRegister.jsx'
import KYCForm from './components/KYCForm .jsx'
import BusinessIdeaForm from './components/BusinessIdeaForm.jsx'
import AboutUs from './components/About.jsx'
import Footer from './components/Footer.jsx'
import HowItWorks from './components/how-it-woks.jsx'
import AdvisorRegister from './components/Advisor/AdvisorRegistration.jsx'
import Dashboard from './components/Dashboard.jsx'

const App = () => {
  return (
    <div >
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/entrepreneur/register' element={<EntrepreneurRegister />} />
        <Route path='/business-idea' element={<BusinessIdeas />} />
        <Route path='/business-ideas/:id' element={<BusinessIdeaDetail />} />
        <Route path='/investor/register' element={<InvestorRegister />} />
        <Route path='/kyc' element= <KYCForm /> />
        <Route path='/postIdea' element= <BusinessIdeaForm /> />
        <Route path='/about' element= <AboutUs /> />
        <Route path='/how-it-works' element= <HowItWorks /> />
        <Route path='/dashboard' element= <Dashboard /> />
        <Route path='/advisor/register' element= <AdvisorRegister /> />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
