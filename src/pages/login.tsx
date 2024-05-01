import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "../store/userDataSlice";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { errors } = formState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailError, setEmailErrors] = useState();
  const [passwordError, setPasswordErrors] = useState();

  const submit = async (data: Inputs) => {
    try {
      const response = await axios.post(
        "https://entertainment-web-back-production.up.railway.app/api/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      if (response.data.token) {
        dispatch(updateUserData({ id: response.data.id }));
        localStorage.setItem("userId", response.data.id);
        navigate("/home");
        localStorage.setItem("token", response.data.token);
      }
    } catch (error: any) {
      if (error.response.data.emailError) {
        setEmailErrors(error.response.data.emailError);
      } else if (error.response.data.passwordError) {
        setPasswordErrors(error.response.data.passwordError);
      }
    }
  };

  return (
    <div className="lg:px-[520px] pb-[100px] md:px-[184px] md:pt-[56px] flex flex-col justify-center px-6 pt-12">
      <div className="flex justify-center">
        <img src="/assets/logo.svg" />
      </div>
      <div className="md:rounded-[20px] md:mt-[72px] md:p-8 bg-darkBlue p-6 pb-8 mt-[58px]  rounded-[10px]">
        <h1 className=" font-light text-white text-[32px]">Login</h1>
        <form onSubmit={handleSubmit(submit)}>
          <div className="relative">
            <input
              className={` pl-[16px] focus:border-white pb-[17px]  border-b-[1px] mt-10 w-full outline-[0px] bg-transparent text-[15px] font-light text-white placeholder:opacity-[0.5] caret-red  border-0 ${
                errors.email ? "border-red " : "border-gray "
              }`}
              placeholder="Email address "
              {...register("email", {
                required: { value: true, message: "Can’t be empty" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <p className="absolute text-red text-[13px] font-light right-[17px] bottom-[18px] ">
              {errors.email && errors.email.message}
              {emailError && emailError}
            </p>
          </div>
          <div className="relative">
            <input
              className={`pl-[16px] focus:border-white  pb-[17px] border-b-[1px] mt-6 w-full outline-[0px] bg-transparent text-[15px] font-light text-white placeholder:opacity-[0.5] caret-red  border-0 ${
                errors.email ? "border-red " : "border-gray "
              }`}
              placeholder="Password "
              {...register("password", {
                required: { value: true, message: "Can’t be empty" },
              })}
            />
            <p className="absolute text-red text-[13px] font-light right-[17px] bottom-[18px] ">
              {errors.password && errors.password.message}
              {passwordError && passwordError}
            </p>
          </div>
          <button className="w-full hover:bg-white hover:text-dark rounded-md text-[15px] font-light border-[0px] mt-[54px] bg-red  text-white h-12 flex justify-center items-center">
            Login to your account
          </button>
        </form>
        <div className="flex justify-center text-[15px] font-light gap-[9px] mt-6 ">
          <p className="text-white">Login to your account?</p>
          <Link to={"/register"}>
            <p className="text-red cursor-pointer">Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
