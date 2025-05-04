import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem('username');
    return username ? { username } : null;
  });

  const login = (userData, tokens) => {
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    localStorage.setItem('username', userData.username);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    setUser(null);
  };

  // Get auth header for API requests
  const getAuthHeader = () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  };

  // Check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) {
      logout();
      return null;
    }
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
      });
      
      if (!response.ok) {
        logout();
        return null;
      }
      
      const data = await response.json();
      localStorage.setItem('accessToken', data.access);
      return data.access;
    } catch (error) {
      logout();
      return null;
    }
  };

  // Auth-aware fetch function
  const authFetch = async (url, options = {}) => {
    let accessToken = localStorage.getItem('accessToken');
    
    // Check if token is expired
    if (accessToken && isTokenExpired(accessToken)) {
      // Try to refresh token
      const newToken = await refreshToken();
      if (!newToken) {
        throw new Error('Session expired');
      }
      accessToken = newToken;
    }
    
    // Add auth header
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    
    // Make the fetch request
    let response = await fetch(url, {
      ...options,
      headers,
    });
    
    // Handle 401 Unauthorized
    if (response.status === 401) {
      // Try to refresh token
      const newToken = await refreshToken();
      if (!newToken) {
        throw new Error('Session expired');
      }
      
      // Retry with new token
      headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(url, {
        ...options,
        headers,
      });
    }
    
    return response;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    getAuthHeader,
    authFetch
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};