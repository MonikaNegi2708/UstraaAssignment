import './App.css';
import Dashboard from './containers/dashboard'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="header-outer-box">
          <h1 className="heading">Our Products</h1>
        </div>
        <Dashboard />
      </BrowserRouter>
    </div>
  );
}

export default App;
