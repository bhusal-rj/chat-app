import react from 'react'
import { Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ProtectRegister } from './pages/ProtectRoutes';

function App(){
  return(
    <div>
      <Routes>
      <Route path='/register' element={<ProtectRegister><Register /></ProtectRegister>} />
      <Route path='/login' element={<login />} />
      </Routes>
      
    </div>
  )
}

export default App;