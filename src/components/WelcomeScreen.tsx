import React, { useState } from "react";
import { userLogin } from "../lib/api/api";

type Props = {
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
};

export function WelcomeScreen(props: Props) {
  const { changeScreen } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(e.target.value);
  };

  function handleUserLogin() {
    userLogin(changeScreen, email, password);
  }

  function userLogout() {
    localStorage.removeItem("user");
  }

  return (
    <div className="card w-96 h-96 bg-secondary shadow-xl flex flex-col justify-evenly items-center">
      <p className="text-xl">Sign In</p>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">What is your email?</span>
        </label>
        <input
          type="email"
          placeholder="email..."
          className="input input-bordered w-full max-w-xs"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
        />
        <label className="label">
          <span className="label-text">What is your password?</span>
        </label>
        <input
          type="password"
          placeholder="password..."
          className="input input-bordered w-full max-w-xs"
          value={password}
          onChange={(e) => handleChange(e, setPassword)}
        />
        <button onClick={handleUserLogin} className="btn btn-primary mt-8">
          <span className="text-white">sign in</span>
        </button>
        <button onClick={userLogout} className="btn btn-primary mt-8">
          <span className="text-white">log out</span>
        </button>
      </div>
    </div>
  );
}
