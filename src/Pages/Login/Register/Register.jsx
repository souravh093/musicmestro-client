import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerImage from "../../../assets/login.jpg";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import { saveUser } from "../../../api/auth";

const Register = () => {
  const { createUser, googleLoginUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        updateUser(data.name, data.photoUrl).then((result) => {
          console.log(result.user);
        });
        saveUser(result.user)
        toast.success("Successfully Sign Up");
        navigate("/");
      })
      .catch((error) => setError(error.message));
  };

  const signUpWithGoogle = () => {
    googleLoginUser()
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully Sign Up With Google");
        navigate("/");
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className=" bg-gray-200">
        <img
          src={registerImage}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className=" flex flex-col justify-center items-center p-10">
        <h2 className="text-5xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
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
              {...register("name", { required: "Name is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
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
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                  message:
                    "Password must contain at least 6 characters, including one capital letter and one special character",
                },
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
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
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
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
              {...register("photoUrl", { required: "Photo URL is required" })}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.photoUrl ? "border-red-500" : ""
              }`}
            />
            {errors.photoUrl && (
              <p className="text-red-500 text-xs mt-1">
                {errors.photoUrl.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-violet-500 w-full hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
          <div className="flex justify-center mb-5">
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
          <div className="flex items-center">
            <button
              onClick={signUpWithGoogle}
              type="button"
              className="bg-gray-100 text-gray-700 border flex items-center w-full justify-center border-violet-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              //   onClick={handleGoogleLogin}
            >
              <FcGoogle className="w-4 h-4 fill-current mr-2" />
              Sign In with Google
            </button>
          </div>
        </form>
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
};

export default Register;
