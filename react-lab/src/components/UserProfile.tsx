import { User } from '../types/user.types';

type Props = {
  user: User | null;
};

const UserProfile = ({ user }: Props) => {
  if (!user) {
    return <div>Select a user to view details</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Full Name:</strong> {user.fullname}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Education:</strong> {user.education}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Skills:</strong> {user.skills.join(', ')}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
    </div>
  );
};

export default UserProfile;
