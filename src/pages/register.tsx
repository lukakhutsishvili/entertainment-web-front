import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "../hooks/register_schema";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

interface ErrorMessage {
  label: string;
  value: string;
  key: string;
  message: string;
  path: string[];
  type: string;
}

const Register = () => {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    resolver: yupResolver(registerSchema),
  });
  const { errors } = formState;

  const [response, setResponse] = useState<undefined | ErrorMessage>();
  const navigate = useNavigate();

  const submit = async (data: Inputs) => {
    try {
      const res = await axios.post("http://localhost:3000/api/register", {
        email: data.email,
        password: data.password,
      });
      setResponse(res.data[0]);
      if (!res.data[0]) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="lg:px-[520px] pb-[100px]  md:px-[184px] md:pt-[56px] flex flex-col justify-center px-6 pt-12">
      <div className="flex justify-center">
        <img src="/assets/logo.svg" />
      </div>
      <div className="md:rounded-[20px] md:mt-[72px] md:p-8 bg-darkBlue p-6 pb-8 mt-[58px]  rounded-[10px]">
        <h1 className=" font-light text-white text-[32px]">Sign Up</h1>
        <form onSubmit={handleSubmit(submit)}>
          <div className="relative">
            <input
              className={` pl-[16px] focus:border-white pb-[17px]  border-b-[1px] mt-10 w-full outline-[0px] bg-transparent text-[15px] font-light text-white placeholder:opacity-[0.5] caret-red  border-0 ${
                errors.email ? "border-red " : "border-gray "
              }`}
              placeholder="Email address "
              {...register("email")}
            />
            <p className="absolute text-red text-[13px] font-light right-[17px] bottom-[18px] ">
              {errors.email && errors.email.message}
              {response?.type && response?.type}
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
            </p>
          </div>
          <div className="relative">
            <input
              className={`pl-[16px] focus:border-white  pb-[17px] border-b-[1px] mt-6 w-full outline-[0px] bg-transparent text-[15px] font-light text-white placeholder:opacity-[0.5] caret-red  border-0 ${
                errors.email ? "border-red " : "border-gray "
              }`}
              placeholder="Repeat password "
              {...register("repeatPassword")}
            />
            <p className="absolute text-red text-[13px] font-light right-[17px] bottom-[18px] ">
              {errors.repeatPassword && errors.repeatPassword.message}
            </p>
          </div>
          <button className="w-full hover:bg-white hover:text-dark rounded-md text-[15px] font-light border-[0px] mt-[54px] bg-red  text-white h-12 flex justify-center items-center">
            Create an account
          </button>
        </form>
        <div className="flex justify-center text-[15px] font-light gap-[9px] mt-6 ">
          <p className="text-white">Already have an account?</p>
          <Link to={"/login"}>
            <p className="text-red cursor-pointer">Login</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
