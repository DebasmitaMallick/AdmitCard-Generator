import './App.css';
import AdmitCard from './components/AdmitCard';
import DataForm from './components/DataForm';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<DataForm />} />
          <Route path='/admitcard' element={<AdmitCard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;