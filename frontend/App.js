import React from 'react';import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
  <AuthProvider>
    <AppNavigator />
  </AuthProvider>
  );
}