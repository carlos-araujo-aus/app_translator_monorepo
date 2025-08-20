import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// (We'll create these components in the next steps)
// import NavigationBar from './components/NavigationBar';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';
// import HistoryPage from './pages/HistoryPage';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      {/* <NavigationBar /> */}
      <Container className="mt-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<h1>Login Page Placeholder</h1>} />
          <Route path="/register" element={<h1>Register Page Placeholder</h1>} />

          {/* Private Routes (we'll protect them later) */}
          <Route path="/" element={<h1>Dashboard Page Placeholder</h1>} />
          <Route path="/history" element={<h1>History Page Placeholder</h1>} />
          
          {/* Route for any other URL not found */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
