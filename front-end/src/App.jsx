import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemList } from './pages/ItemList';
import { ItemCreate } from './pages/ItemCreate';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/new" element={<ItemCreate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;