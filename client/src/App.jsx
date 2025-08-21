import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';

import NavigationBar from './components/NavigationBar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <NavigationBar />
      <Container style={{ maxWidth: '960px' }}>
        <div className="mt-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Private Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/history" 
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </Container>
    </>
  );
}

export default App;
