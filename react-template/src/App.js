import './App.css';
import { BrowserRouter, Navigate, Route, Routes  } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import HomePage from './pages/home/HomePage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';

import { connect } from 'react-redux'

export const App = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    
  }, [])
 const routes=()=>{
  if(!isLoggedIn){
    return(
      <Routes>
      <Route path="*" element={<Navigate to="/signUp" replace />} />
      <Route path="/signIn" element={ <SignInPage />}/>
      <Route path="/signUp" element={ <SignUpPage />}/>
      </Routes>
    )
  }
  return(
    <Routes>
    <Route path="*" element={<Navigate to="/home" replace />} />
    <Route path="/home" element={ <HomePage />}/>
    </Routes>
  )
  }
  return (
    <div className="App">
    <BrowserRouter >
    {routes()}
    </BrowserRouter>
  </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)