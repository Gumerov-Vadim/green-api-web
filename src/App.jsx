import React from 'react';
import Login from './pages/Login';
import Editor from './components/UI/Editor/Editor';
function App() {
  const handleSendMessage = (message) => {
    console.log("Отправленное сообщение:", message);
  };
  return (
    <div>
      test
      <Login />
    
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Editor onSendMessage={handleSendMessage} />
     </div>
    </div>
  );
}

export default App;
