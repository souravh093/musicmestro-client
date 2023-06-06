import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Container from "../../components/Shared/Container/Container";
import loginImage from "../../assets/login.jpg";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { loginUser, googleLoginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password).then((result) => {
      console.log(result.user);
      toast.success("Successfully Login");
      navigate("/");
    });
  };

  const loginWithGoogle = () => {
    googleLoginUser().then((result) => {
      console.log(result.user);
      toast.success("Successfully Login with Google");
      navigate("/");
    });
  };
  return (
    <Container>
      <div className="flex h-screen">
        <div className="w-1/2 bg-gray-200">
          <img
            src={loginImage}
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center p-10">
          <h2 className="text-5xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm  ">
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
            <div className="mb-6 flex flex-col gap-3">
              <button
                type="submit"
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
              <div className="flex justify-center">
                <div>
                  <span className="mr-2">Not a member?</span>
                  <Link
                    to="/register"
                    className="inline-block align-baseline font-bold text-sm text-violet-500 hover:text-violet-800"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={loginWithGoogle}
                type="button"
                className="bg-gray-100 text-gray-700 border flex items-center w-full justify-center border-violet-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                //   onClick={handleGoogleLogin}
              >
                <FcGoogle className="w-4 h-4 fill-current mr-2" />
                Sign In with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
