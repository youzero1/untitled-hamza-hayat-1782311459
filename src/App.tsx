import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Placeholder() {
  return (
    <div className="min-h-screen flex items-center justify-center text-neutral-400">
      Loading Snake…
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Placeholder />} />
      </Routes>
    </BrowserRouter>
  );
}
