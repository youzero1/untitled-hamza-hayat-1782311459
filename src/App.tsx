import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SnakePage from '@/pages/SnakePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SnakePage />} />
      </Routes>
    </BrowserRouter>
  );
}
