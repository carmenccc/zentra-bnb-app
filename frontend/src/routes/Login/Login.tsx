import { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { UserData } from "@zentra/shared";

export const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Validate input
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      setError("All fields are required to login!");
      return;
    }

    // Login
    const res = await login({ email, password });
    if (res.success) {
      // Update current user context
      const currentUserRes = await getCurrentUser();
      updateUser((currentUserRes.data as UserData) || null);
      navigate("/");
    }

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
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleLogin}>
          <h1>Welcome back</h1>
          <input
            name="email"
            required
            minLength={3}
            maxLength={20}
            type="email"
            placeholder="Email"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};
