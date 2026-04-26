import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PresenterView from './pages/PresenterView';
import ViewerScreen from './pages/ViewerScreen';
import AudiencePanel from './pages/AudiencePanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/present/:id" element={<PresenterView />} />
        <Route path="/view/:id" element={<ViewerScreen />} />
        <Route path="/audience/:id" element={<AudiencePanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
