import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setEmail("");
    setPassword("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let endpoint =
        role === "user"
          ? "http://localhost:6090/api/user/login"
          : role === "instructor"
          ? "http://localhost:6090/api/instructors/login"
          : "http://localhost:6090/api/admin/login";

      const res = await axios.post(
        endpoint,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      if (res.status === 200) {
        // ---------------------------
        //  Extract token correctly
        // ---------------------------
        const token =
          res.data?.data?.token || // Admin backend format
          res.data?.token ||
          res.data?.accessToken ||
          res.data?.user?.token ||
          res.data?.user?.accessToken;

        if (!token) {
          console.log("Token not found. Full response:", res.data);
          setMessage("Token missing from response!");
          setLoading(false);
          return;
        }

        // ---------------------------
        // Save token based on role
        // ---------------------------
        if (role === "admin") {
          localStorage.setItem("adminToken", token);
        } else if (role === "user") {
          localStorage.setItem("userToken", token);
        } else if (role === "instructor") {
          localStorage.setItem("instructorToken", token);
        }

        // Save email & id if available
        const userObj =
          res.data?.data?.admin ||
          res.data?.data?.user ||
          res.data?.user ||
          res.data;

        if (userObj) {
          if (userObj.email) localStorage.setItem("email", userObj.email);
          if (userObj._id) localStorage.setItem("userId", userObj._id);
          if (userObj.username) localStorage.setItem("username", userObj.username);
          if (userObj.name) localStorage.setItem("username", userObj.name);
        }

        // ---------------------------
        // Navigation after login
        // ---------------------------
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "user") {
          navigate("/user/dashboard");
        } else if (role === "instructor") {
          navigate("/instructor/dashboard");
        }
      } else {
        setMessage(res.data.message || "Login failed!");
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An error occurred during login.";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2 className="login-title">Login to OCMS</h2>

      <div className="role-selector">
        <label>Select Role: </label>
        <select value={role} onChange={handleRoleChange}>
          <option value="user">User</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h3>

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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default LoginPage;
