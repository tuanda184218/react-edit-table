import { Outlet } from 'react-router-dom';
import './App.scss';


function App() {
  return (
    <div className="app-container">
      
      <div className='main-container'>
        <div className='app-content'>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default App;
