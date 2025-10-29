import { useState, useEffect } from "react";
import useStore from "../../zustand/store";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const register = useStore((state) => state.register);
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  useEffect(() => {
    // Clear the auth error message when the component unmounts:
    return () => {
      setAuthErrorMessage("");
    };
  }, []);

  const handleRegister = (event) => {
    event.preventDefault();

    register({
      username: username,
      password: password,
      email: email,
    });
  };

  return (
    <div className="register-container">
        <img
          src="/img/prepperservelogo_horizontal.svg"
          alt="Prep & Preserve logo"
          className="register-logo"
        />
      <h2>Create an Account</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* gotta get cloudinary set up for this part */}
        <button>Upload Profile Image</button>
        <button type="submit">Create Account</button>
      </form>
      {
        // Conditionally render registration error:
        errorMessage && <h3>{errorMessage}</h3>
      }
    </div>
  );
}

export default RegisterPage;
