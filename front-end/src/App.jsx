import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemList } from './pages/ItemList';
import { ItemCreate } from './pages/ItemCreate';
import { ItemSearch } from './pages/ItemSearch';
import { ItemEdit } from './pages/ItemEdit';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/new" element={<ItemCreate />} />
        <Route path="/search" element={<ItemSearch />} />
        <Route path="/edit/:id" element={<ItemEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;