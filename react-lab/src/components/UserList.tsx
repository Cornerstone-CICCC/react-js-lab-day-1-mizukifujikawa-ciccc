import { User } from "../types/user.types"

type Props = {
  users: User[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const UserList = ({ users, onView, onEdit, onDelete }: Props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.fullname}</td>
            <td>
              <button onClick={() => onView(user.id)}>View</button>
              <button onClick={() => onEdit(user.id)}>Edit</button>
              <button onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
