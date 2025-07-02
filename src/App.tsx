import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UserList from './components/Users/UserList';
import ContentList from './components/Content/ContentList';
import CommunityList from './components/Community/CommunityList';

function App() {
  return (
    <AuthProvider children={undefined}>
      <div>
        <Login />
        <Register />
        <UserList />
        <ContentList />
        <CommunityList />
      </div>
    </AuthProvider>
  );
}

export default App; 