
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForumPage from './components/ForumPage';
import Account from './components/Account';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ForumPage />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;