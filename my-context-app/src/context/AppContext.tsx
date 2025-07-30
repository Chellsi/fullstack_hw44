import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Типи для контексту
interface UserContextType {
  users: string[];
  addUser: (name: string) => void;
}

// 1. Створення контексту з осмисленим значенням за замовчуванням
export const UserContext = createContext<UserContextType>({
  users: ['Олександр', 'Марія'], // значення за замовчуванням
  addUser: () => {} // пуста функція за замовчуванням
});

// 2. Провайдер контексту
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<string[]>(['Олександр', 'Марія', 'Сергій']);

  const addUser = (name: string) => {
    setUsers(prev => [...prev, name]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Хук для зручного використання контексту
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};