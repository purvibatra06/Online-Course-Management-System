import { useState } from "react";
import axios from "axios";
import "./Signup.css";

const SignupPage = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setEmail("");
    setPassword("");
    setFullName("");
    setBio("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let endpoint = "";

      if (role === "user")
        endpoint = "http://localhost:6090/api/user/register";
      else if (role === "instructor")
        endpoint = "http://localhost:6090/api/instructors/register";

      const data =
        role === "instructor"
          ? { fullName, email, password, bio }
          : { fullName, email, password };

      console.log(" Sending signup data:", data);

      const res = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      });

      console.log("Signup response full data:", res.data);
      console.log("Response status:", res.status);

      const isSuccess = res.data?.success === true || res.status === 201 || res.status === 200;

      if (isSuccess || res.data?.message?.toLowerCase().includes("success")) {
        setMessage(` ${role} registered successfully! Redirecting to login in 2s...`);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setMessage(res.data?.message || "Registration response received but unclear if successful.");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      console.error("Full error object:", error);
      const errMsg = error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An error occurred during registration.";
      setMessage(` ${errMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <h2 className="signup-title">Register to OCMS</h2>

      <div className="role-selector">
        <label>Select Role: </label>
        <select value={role} onChange={handleRoleChange}>
          <option value="user">User</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Registration</h3>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {role === "instructor" && (
          <textarea
            placeholder="Enter your bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SignupPage;
