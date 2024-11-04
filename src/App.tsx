import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { AccountForm } from './components/AccountForm';
import { LoginForm } from './components/LoginForm';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<AccountForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}