import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import httpClient from "../../api/httpClient";
import { useAppDispatch } from "../../hooks";
// import { userSelector } from "../../redux/slices/userSlice";
// import { RootState } from "../../redux/store";
import { loginUser } from "../../redux/thunk/user.thunk";
import { ILoginResponse } from "../../types/interfaces";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const isValidEmail = (input: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const isValidUsername = (input: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(input);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (isValidEmail(value) || isValidUsername(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isValid) {
      try {
        const data: ILoginResponse = await dispatch(
          loginUser(formData)
        ).unwrap();
        if (data.statusCode === 200) {
          navigate("/", { state: { message: data.message, success: true } });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-white max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Username or Email *</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password *</label>
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
        <div className="mb-6">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Login
          </button>
        </div>
        <div className="text-center">
          <Link to="/register" className="text-blue-600 hover:underline">
            Don't have an account? Register here.
          </Link>
        </div>
      </form>
    </div>
  );
};
