import { useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, register } from "../../api/auth";
import { RegisterInput } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";
import { CurrentUser } from "@shared/index";

export const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useAuth();

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Validate input
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password) {
      setError("All fields are required!");
      setIsLoading(false);
      return;
    }

    // Register
    const input: RegisterInput = {
      username: username as string,
      email: email as string,
      password: password as string,
    };
    const res = await register(input);
    console.log("register response:", res);

    // If successful
    if (res.success) {
      // Update current user context
      const currentUserRes = await getCurrentUser();
      console.log(currentUserRes);
      updateUser((currentUserRes.data as CurrentUser) || null);
      navigate("/");
    }

    // If errors
    if (res.errors) {
      setError(
        res.errors.reduce(
          (errString, err) => errString + "\n" + err.message,
          ""
        )
      );
      setIsLoading(false);
      return;
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleRegister}>
          <h1>Create an Account</h1>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <input type="email" name="email" id="email" placeholder="Emial" />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have and account? Sign In</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};
