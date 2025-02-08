import React, { useContext } from 'react';
import MainPage from './pages/MainPage/MainPage';
import useAuth from './hooks/useAuth';
import AuthContext from './context/AuthContext';
import Login from './pages/Login/Login';

function App() {
  const { authData, login, logout } = useAuth();
  const handleSendMessage = (message) => {
    console.log("Отправленное сообщение:", message);
  };
  return (
      <AuthContext.Provider value={{ authData, login, logout }}>
        {authData.isLoggedIn ? <MainPage /> : <Login />}
      </AuthContext.Provider>
  );
}

export default App;
