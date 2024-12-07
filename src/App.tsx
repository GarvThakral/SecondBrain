import './App.css'
import { AppMain } from './components/ui/appmain'
import { SideBar } from './components/ui/sidebar'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SignIn } from './components/ui/signin';
import { SignUp } from './components/ui/signup';
import { AddContent } from './components/ui/addContent';

function App() {

  return(
  <BrowserRouter>
    <div className = {'grid grid-cols-12 min-h-screen'}>
      <SideBar className = {"col-span-2"}/>
      <Routes>
        <Route path = '/' element={<AppMain className = {"col-span-10"} />}></Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/addContent" element={<AddContent/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  </BrowserRouter>
  )
}

export default App
