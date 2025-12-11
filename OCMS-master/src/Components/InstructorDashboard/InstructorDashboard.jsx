import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./InstructorDashboard.css";

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);


  const token = localStorage.getItem("instructorToken");

  useEffect(() => {
    const saved = localStorage.getItem("instructorCourses");
    if (saved) {
      setCourses(JSON.parse(saved));
    }
  }, []);


  const handleCreateCourse = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("Please login as an instructor!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);

      const res = await axios.post(
        "http://localhost:6090/api/course/register-course",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        setMessage("Course created successfully!");

        const newCourse = {
          _id: Date.now().toString(),
          title,
          description,
          price,
        };

        const updatedCourses = [...courses, newCourse];
        setCourses(updatedCourses);
        localStorage.setItem("instructorCourses", JSON.stringify(updatedCourses));

        setTitle("");
        setDescription("");
        setPrice("");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      setMessage("Failed to create course.");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axios.delete(
        `http://localhost:6090/api/course/delete/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Backend delete failed (ignored for local display).");
    }

    const updated = courses.filter((c) => c._id !== courseId);
    setCourses(updated);
    localStorage.setItem("instructorCourses", JSON.stringify(updated));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-actions">
        <button className="profile-btn" onClick={() => navigate("/instructor/profile")}>
          View Profile
        </button>
      </div>

      <h1 className="dashboard-title">Instructor Dashboard</h1>

      <div className="create-course-section">
        <h2 className="section-title">Create a New Course</h2>

        <form onSubmit={handleCreateCourse} className="create-course-form">
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Course Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <button type="submit">Create Course</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>

      <div className="course-list-section">
        <h2 className="section-title">Registered Courses</h2>

        {courses.length === 0 ? (
          <p>No courses registered yet.</p>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course._id} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p>
                  <strong>Price:</strong> ₹{course.price}
                </p>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCourse(course._id)}
                >
                  Delete Course
                </button>
              </div>

            ))}
          </div>

        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;