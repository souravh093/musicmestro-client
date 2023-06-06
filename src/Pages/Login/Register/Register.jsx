import React from "react";
import { Link } from "react-router-dom";
import registerImage from "../../../assets/login.jpg"

const Register = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-200">
        <img
          src={registerImage}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <h2 className="text-5xl font-bold mb-4">Register</h2>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="photo-url"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photo-url"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
          <div className="flex justify-center">
            <div>
              <span className="mr-2">Already a member?</span>
              <Link
                to="/login"
                className="inline-block align-baseline font-bold text-sm text-violet-500 hover:text-violet-800"
              >
                Sign In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
