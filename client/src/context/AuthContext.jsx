import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('university_ai_token'));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Load user on mount if token exists
  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const res = await authAPI.getMe();
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.warn('Session expired or invalid, logging out.');
          logout();
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const res = await authAPI.login({ email, password });
      if (res.data.success) {
        localStorage.setItem('university_ai_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check credentials.';
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  const register = async (userData) => {
    setAuthError(null);
    try {
      const res = await authAPI.register(userData);
      if (res.data.success) {
        localStorage.setItem('university_ai_token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      setAuthError(msg);
      return { success: false, error: msg };
    }
  };

  const forgotPassword = async (email) => {
    try {
      const res = await authAPI.forgotPassword({ email });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Forgot password request failed.');
    }
  };

  const resetPassword = async (tokenStr, newPassword) => {
    try {
      const res = await authAPI.resetPassword({ token: tokenStr, newPassword });
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Password reset failed.');
    }
  };

  const logout = () => {
    localStorage.removeItem('university_ai_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (updates) => {
    try {
      const res = await authAPI.updateProfile(updates);
      if (res.data.success) {
        setUser(res.data.user);
        return { success: true };
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Could not update profile.');
    }
  };

  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await authAPI.uploadAvatar(formData);
      if (res.data.success) {
        setUser(res.data.user);
        return { success: true, avatarUrl: res.data.avatarUrl };
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Avatar upload failed.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        authError,
        isAuthenticated: !!user,
        login,
        register,
        forgotPassword,
        resetPassword,
        logout,
        updateProfile,
        uploadAvatar,
        setAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
