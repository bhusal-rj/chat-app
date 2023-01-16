import react, { useEffect } from 'react'
import { Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ProtectChat, ProtectForm } from './pages/ProtectRoutes';
import Chat from './pages/Chat';
import SetAvatar from './pages/SetAvatar';


function App(){
  
  
  return(
    <div>
      <Routes>
      <Route path='/register' element={<ProtectForm><Register /></ProtectForm>} />
      <Route path='/login' element={<ProtectForm><Login /></ProtectForm>} />
      <Route path="/setAvatar" element={<SetAvatar />} />
      <Route path="/" element={<ProtectChat><Chat/></ProtectChat>} />
      </Routes>
      
    </div>
  )
}

export default App;