import React, { createContext, useState, useContext, useEffect } from 'react';


// Create auth context
const AuthContext = createContext(null);

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLoggedIn = () => {
      const accessToken = localStorage.getItem('accessToken');
      const username = localStorage.getItem('username');
      
      if (accessToken && username) {
        setUser({ username });
      }
      
      setLoading(false);
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = (userData, tokens) => {
    localStorage.setItem('accessToken', tokens.access);
    localStorage.setItem('refreshToken', tokens.refresh);
    localStorage.setItem('username', userData.username);
    setUser(userData);
    return true;
  };

  // Logout function
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
      return false;
    }
    
    try {
      const response = await fetch('/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh }),
      });
      
      if (!response.ok) throw new Error('Token refresh failed');
      
      const tokens = await response.json();
      localStorage.setItem('accessToken', tokens.access);
      return true;
    } catch (error) {
      logout();
      return false;
    }
  };

  // Auth-aware fetch function
  const authFetch = async (url, options = {}) => {
    // Get access token
    let accessToken = localStorage.getItem('accessToken');
    
    // Check if token is expired
    if (accessToken && isTokenExpired(accessToken)) {
      // Try to refresh token
      const refreshSuccess = await refreshToken();
      if (!refreshSuccess) {
        throw new Error('Session expired');
      }
      accessToken = localStorage.getItem('accessToken');
    }
    
    // Add auth header
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    
    // Make the fetch request
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    // Handle 401 Unauthorized (token might be invalid)
    if (response.status === 401) {
      // Try to refresh token
      const refreshSuccess = await refreshToken();
      if (!refreshSuccess) {
        throw new Error('Session expired');
      }
      
      // Retry with new token
      accessToken = localStorage.getItem('accessToken');
      headers.Authorization = `Bearer ${accessToken}`;
      
      return fetch(url, {
        ...options,
        headers,
      });
    }
    
    return response;
  };

  // Value object to be provided by context
  const value = {
    user,
    loading,
    login,
    logout,
    getAuthHeader,
    authFetch,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};