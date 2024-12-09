import './App.css'
import { AppMain } from './components/ui/appmain'
import { SideBar } from './components/ui/sidebar'
import { BrowserRouter, Route, Routes } from "react-router-dom";


import { useState } from 'react';

function App() {
  const [signinState,toggleSigninState] = useState(false);
  const [signupState,toggleSignupState] = useState(false);
  return(
  <BrowserRouter>
    <div className = {'grid grid-cols-12 min-h-screen'}>
      <SideBar className = {"col-span-2"} signinState = {signinState} toggleSigninState = {toggleSigninState} signupState = {signupState} toggleSignupState = {toggleSignupState}/>
        <div className="col-span-10">
        <Routes>
          <Route path = '/' element={<AppMain />}></Route>
        </Routes>
        </div>
    </div>
  </BrowserRouter>
  )
}

export default App
