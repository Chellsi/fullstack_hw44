import './App.css';
import React, { useState } from 'react';
import { UserProvider, useUsers } from './context/AppContext';

// Рівень 1 - App (обгортка в провайдер)
const App: React.FC = () => {
  return (
    <UserProvider>
      <div className="bg-gray-100 p-10">
        <Header />
      </div>
    </UserProvider>
  );
};

// Рівень 2 - Header
const Header: React.FC = () => {
  // Використовуємо хук замість useContext напряму
  const { users } = useUsers();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">База даних користувачів</h2>
      <p className="text-gray-600">Всього користувачів: {users.length}</p>
      <UserSection />
    </div>
  );
};

// Рівень 3 - UserSection
const UserSection: React.FC = () => {
  return (
    <div className="mt-6 space-y-4">
      <UserList />
      <AddUserForm />
    </div>
  );
};

// Рівень 3 - UserList (використовує контекст)
const UserList: React.FC = () => {
  const { users } = useUsers();

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-3">Список користувачів:</h3>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="bg-white p-2 rounded shadow-sm">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Рівень 3 - AddUserForm (використовує контекст)
const AddUserForm: React.FC = () => {
  const { addUser } = useUsers();
  const [newUserName, setNewUserName] = useState('');

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName);
      setNewUserName('');
    }
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-3">Додати користувача:</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Введіть ім'я"
          className="flex-1 p-2 border border-gray-600 rounded"
        />
        <button
          onClick={handleAddUser}
          className="bg-gray-300 px-4 py-2 rounded border border-gray-600 text-gray-600 hover:bg-blue-50 hover:border-gray-300 hover:cursor-pointer"
        >
          Додати
        </button>
      </div>
    </div>
  );
};

export default App;