import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/navigation.js';
import Login from './components/Login/login.js';
import Register from './components/Register/register.js';
import Admin from './components/Admin/admin.js';
import User from './components/User/user.js';

function App() {
	const [route, setRoute] = useState('userLogin'),
    [userInfo, setUserInfo] = useState(0);

	const onRouteChange = (route) => setRoute(route);

  return (
    <div className="App">
        <Navigation onRouteChange={onRouteChange} />
        { route === 'userLogin'
        ?
        <Login name={"USER"} setUserInfo={setUserInfo} onRouteChange={onRouteChange}/>
        :
        route === 'adminLogin'
        ?
        <Login name={"ADMIN"} setUserInfo={setUserInfo} onRouteChange={onRouteChange}/>
        :
        route === 'register'
        ?
        <Register setUserId={setUserInfo} onRouteChange={onRouteChange}/>
        :
        route === 'ADMIN'
        ?
        <Admin userInfo={userInfo}/>
        :
        <User userInfo={userInfo} onRouteChange={onRouteChange}/>
        } 
    </div>
  );
}

export default App;
