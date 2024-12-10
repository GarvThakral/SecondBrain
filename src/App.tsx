import { useState } from 'react';
import './App.css'
import { AppMain } from './components/ui/appmain'
import { SideBar } from './components/ui/sidebar'
import { InitialStage } from './components/ui/initialStage';


function App() {
  const token = localStorage.getItem('token')||"";
  const [signinState,toggleSigninState] = useState(false);
  const [signupState,toggleSignupState] = useState(false);
  const [isLoggedIn,toggleIsLoggedIn] = useState(token != "");

  return(
    <div className = {'grid grid-cols-12 min-h-screen'}>
      <SideBar className = {"col-span-2"} signinState = {signinState} toggleSigninState = {toggleSigninState} signupState = {signupState} toggleSignupState = {toggleSignupState} isLoggedIn = {isLoggedIn} toggleIsLoggedIn ={toggleIsLoggedIn} />
        <div className="col-span-10">
        {isLoggedIn ? <AppMain/>:<InitialStage />}
        </div>
    </div>
  )
}

export default App
