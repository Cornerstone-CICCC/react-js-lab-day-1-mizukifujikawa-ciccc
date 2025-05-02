import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import { User } from './types/user.types';

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddUser = (userData: User) => {
    console.log('Adding user:', userData);
    setUsers((prev) => {
      const userExists = prev.some((user) => user.id === userData.id);

      // IDが既にある場合は更新し、ない場合は新規追加
      const updatedUsers = userExists
        ? prev.map((user) =>
            user.id === userData.id ? userData : user
          )
        : [...prev, { ...userData }];
      console.log('Updated users:', updatedUsers);
      return updatedUsers;
    });
    setSelectedUser(null);
  };

  const handleClearForm = () => {
    setSelectedUser(null);
  };

  const handleViewUser = (id: number) => {
    const user = users.find((user) => user.id === id);
    setSelectedUser(user || null);
  };

  const handleEditUser = (id: number) => {
    const user = users.find((user) => user.id === id);
    setSelectedUser(user || null);
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <>
      <UserForm
        onSubmit={handleAddUser}
        onClear={handleClearForm}
        userToEdit={selectedUser}
      />
      <UserList
        users={users}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
      <UserProfile user={selectedUser} />
    </>
  );
};

export default App;
