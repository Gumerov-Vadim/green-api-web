import React from 'react';
import MainPage from './pages/MainPage/MainPage';
import useAuth from './hooks/useAuth';
import AuthContext from './context/AuthContext';
import Login from './pages/Login/Login';

function App() {
  const { authData, login, logout } = useAuth();
  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {authData.isLoggedIn ? <MainPage/> : <Login />}
    </AuthContext.Provider>
  );
}

export default App;
