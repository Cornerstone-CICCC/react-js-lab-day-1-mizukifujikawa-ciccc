import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { User } from "../types/user.types"

type Props = {
  onSubmit: (userData: User) => void;
  onClear: () => void;
  userToEdit?: User | null;
};

const UserForm = ({ onSubmit, onClear, userToEdit }: Props) => {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    fullname: '',
    age: 0,
    education: '',
    gender: '',
    skills: [],
    bio: ''
  });

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        fullname: userToEdit.fullname,
        age: userToEdit.age,
        education: userToEdit.education,
        gender: userToEdit.gender,
        skills: userToEdit.skills,
        bio: userToEdit.bio
      });
    } else {
      setFormData({
        fullname: '',
        age: 0,
        education: '',
        gender: '',
        skills: [],
        bio: ''
      });
    }
  }, [userToEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      setFormData({
        ...formData,
        skills: formData.skills.includes(value)
          ? formData.skills.filter(skill => skill !== value)
          : [...formData.skills, value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    const newUser: User = { ...formData, id: userToEdit ? userToEdit.id : Date.now() };
    onSubmit(newUser);
    setFormData({
        fullname: "",
        age: 0,
        education: "",
        gender: "",
        skills: [],
        bio: "",
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        value={formData.fullname}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      <select name="education" value={formData.education} onChange={handleChange}>
        <option value="">Select Education</option>
        <option value="Grade School">Grade School</option>
        <option value="High School">High School</option>
        <option value="College">College</option>
      </select>
      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
          />
          Female
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Other"
            checked={formData.gender === 'Other'}
            onChange={handleChange}
          />
          Other
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="skills"
            value="TypeScript"
            checked={formData.skills.includes('TypeScript')}
            onChange={handleChange}
          />
          TypeScript
        </label>
        <label>
          <input
            type="checkbox"
            name="skills"
            value="React"
            checked={formData.skills.includes('React')}
            onChange={handleChange}
          />
          React
        </label>
        <label>
          <input
            type="checkbox"
            name="skills"
            value="Node"
            checked={formData.skills.includes('Node')}
            onChange={handleChange}
          />
          Node
        </label>
        <label>
          <input
            type="checkbox"
            name="skills"
            value="NoSQL"
            checked={formData.skills.includes('NoSQL')}
            onChange={handleChange}
          />
          NoSQL
        </label>
      </div>
      <textarea
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
      />
      <button type="submit">
        {userToEdit ? 'Save User' : 'Add User'}
      </button>
      <button type="button" onClick={onClear}>Clear</button>
    </form>
  );
};

export default UserForm;
