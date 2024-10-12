import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import LandingPage from './pages/LandingPage';


function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<LandingPage></LandingPage>}></Route>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
