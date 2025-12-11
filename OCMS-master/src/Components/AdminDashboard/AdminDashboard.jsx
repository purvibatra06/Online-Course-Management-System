import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    if (!token) {
      setMessage("Unauthorized. Please login again.");
      setLoading(false);
      return;
    }

    try {
   
      const coursesRes = await axios.get(
        "http://localhost:6090/api/admin/courses",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourses(Array.isArray(coursesRes.data?.data) ? coursesRes.data.data : []);

      const usersRes = await axios.get(
        "http://localhost:6090/api/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(Array.isArray(usersRes.data?.data) ? usersRes.data.data : []);

      const instructorsRes = await axios.get(
        "http://localhost:6090/api/admin/instructors",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInstructors(Array.isArray(instructorsRes.data?.data) ? instructorsRes.data.data : []);

    } catch (error) {
      const errMsg =
        error.response?.data?.message || error.message || "Failed to fetch data";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:6090/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  const handleDeleteInstructor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this instructor?")) return;

    try {
      await axios.delete(`http://localhost:6090/api/admin/instructors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInstructors(instructors.filter((inst) => inst._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete instructor.");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading data...</p>}
      {message && <p className="error-msg">{message}</p>}

      <section>
        <h3>All Courses</h3>
        <div className="card-container">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div className="card" key={course._id}>
                <h4>{course.title}</h4>
               
                <p>{course.description}</p>
              </div>
            ))
          ) : (
            !loading && <p>No Courses Available</p>
          )}
        </div>
      </section>

      <section>
        <h3>All Users</h3>
        <div className="card-container">
          {users.length > 0 ? (
            users.map((user) => (
              <div className="card" key={user._id}>
                <h4>{user.name || user.fullName || "No Name"}</h4>
                <p><strong>Email:</strong> {user.email}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete User
                </button>
              </div>
            ))
          ) : (
            !loading && <p>No Users Found</p>
          )}
        </div>
      </section>

      <section>
        <h3>All Instructors</h3>
        <div className="card-container">
          {instructors.length > 0 ? (
            instructors.map((inst) => (
              <div className="card" key={inst._id}>
                <h4>{inst.name || inst.fullName || "No Name"}</h4>
                <p><strong>Email:</strong> {inst.email}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteInstructor(inst._id)}
                >
                  Delete Instructor
                </button>
              </div>
            ))
          ) : (
            !loading && <p>No Instructors Found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
