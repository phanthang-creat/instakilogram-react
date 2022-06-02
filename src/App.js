import './App.css';

import {
  Routes,
  Route,
} from "react-router-dom";
import MyRoute from './routes/route';
import Auth from './pages/auth/auth';
import NotFound from './pages/404/404';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/*" element={<MyRoute />} />
          <Route path="/accounts/*" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
}

export default App;
