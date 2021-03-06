import React, {useEffect} from 'react';
import Chat from './Chat';
import './App.css'
import SideBar from './SideBar'
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from './features/userSlice'
import Login from './Login';
import {auth, provider} from './firebase'
import {login, logout} from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        )
      }else{
        dispatch(logout());
      }
    })
  }, [dispatch])

  return (
    <div className="app">
      {user? (
        <>
          <SideBar/>
          <Chat/>
        </>
      ): (
        <Login/>
      )}


    </div>
  );
}

export default App;
