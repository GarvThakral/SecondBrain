import { useState } from 'react';
import './App.css'
import { AppMain } from './components/ui/appmain'
import { SideBar } from './components/ui/sidebar'
import { InitialStage } from './components/ui/initialStage';


function App() {
  interface Tag {
    _id: string;
    title: string;
    __v: number;
}
interface Content {
    _id: string;
    text: string;
    link: string;
    tags: Tag[];
    title: string;
    type: string;
    userId: string;
    date: string;
    __v: number;
}

  const [contentState, setContentState] = useState<Content[]>([]);
  const token = localStorage.getItem('token')||"";
  const [signinState,toggleSigninState] = useState(false);
  const [signupState,toggleSignupState] = useState(false);
  const [isLoggedIn,toggleIsLoggedIn] = useState(token != "");

  return(
    <div className = {'grid grid-cols-12 min-h-screen'}>
      <SideBar className = {"col-span-2"} signinState = {signinState} toggleSigninState = {toggleSigninState} signupState = {signupState} toggleSignupState = {toggleSignupState} isLoggedIn = {isLoggedIn} toggleIsLoggedIn ={toggleIsLoggedIn} contentState= {contentState} setContentState={setContentState} />
        <div className="col-span-10">
        {isLoggedIn ? <AppMain contentState= {contentState} setContentState={setContentState} />:<InitialStage />}
        </div>
    </div>
  )
}

export default App
