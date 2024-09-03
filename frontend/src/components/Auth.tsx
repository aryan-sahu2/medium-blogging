import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./Input";
import { SignUpInput } from "@aryansahu/medium-common";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const {jwt} = response.data;
      
      localStorage.setItem("token", `Bearer ${jwt}`);
      navigate("/blogs");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="h-screen flex justify-center  items-center">
      <div className="flex-col flex mx-auto w-[85%] sm:w-[60%] gap-2">
        <div className="title w-full font-semibold text-4xl text-center">
          {type === "signin" ? "Log into your Account" : "Create an Account"}
        </div>
        <div className="question w-full font-normal text-lg opacity-65 text-center mb-5">
          {type === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}
          <Link
            className="pl-2 underline hover:text-blue-600"
            to={type === "signin" ? "/signup" : "/signin"}
          >
            {type === "signin" ? "Sign Up" : "Sign in"}
          </Link>{" "}
        </div>
        {type === "signup" && (
          <Input
            purpose={type}
            type="text"
            label="Name"
            placeholder="Your Name"
            onChange={(e) => {
              setPostInputs({ ...postInputs, name: e.target.value });
            }}
          />
        )}
        <Input
          type="text"
          label="Email"
          placeholder="Your Username"
          onChange={(e) => {
            setPostInputs({ ...postInputs, email: e.target.value });
          }}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Your password"
          onChange={(e) => {
            setPostInputs({ ...postInputs, password: e.target.value });
          }}
        />
        <Button functionType={type} clickFunction={sendRequest} />
      </div>
    </div>
  );
};
