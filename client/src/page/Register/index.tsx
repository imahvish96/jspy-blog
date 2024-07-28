import React, { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/thunk/user.thunk";
import { Loader } from "../../components";

interface IFormData {
  username: string;
  password: string;
  fullName: string;
  avatar: Blob | null;
  coverImage: Blob | null;
  email: string;
}
export const RegistrationForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
    fullName: "",
    avatar: null,
    coverImage: null,
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { fullName, username, email, password, avatar, coverImage } =
      formData || {};
    const submitFormData = new FormData();
    submitFormData.append("fullName", fullName);
    submitFormData.append("username", username);
    submitFormData.append("email", email);
    submitFormData.append("password", password);
    submitFormData.append("avatar", avatar as any);
    submitFormData.append("coverImage", coverImage as any);

    try {
      setLoading(false);
      const res = await dispatch(registerUser(submitFormData)).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        username: "",
        password: "",
        fullName: "",
        avatar: null,
        coverImage: null,
        email: "",
      });

      navigate("/");
      setLoading(false);
    }
  };

  if (loading) <Loader />;

  return (
    <div className="bg-white max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username e.g. jsfanboy"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Avatar <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            accept="image/*"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            onChange={handleFileChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            accept="image/*"
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
