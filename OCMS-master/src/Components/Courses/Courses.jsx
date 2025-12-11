import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const CreateCourseComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("instructorToken");
  const instructorId = localStorage.getItem("instructorId");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:6090/api/course/register-course",
        {
          title,
          description,
          price,
          createdBy: instructorId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("Course Created Object:", res.data);

      localStorage.setItem("createdCourseId", res.data.course._id);

      setMessage("Course created successfully!");
      setTimeout(() => navigate("/instructor/dashboard"), 1500);
    } catch (error) {
      console.error("Error creating course:", error.response?.data || error);
      setMessage("Failed to create course!");
    }
  };

  const handleDelete = async () => {
    const courseId = localStorage.getItem("createdCourseId");

    if (!courseId) {
      alert("No course found to delete!");
      return;
    }

    try {
      await axios.delete(`http://localhost:6090/api/course/delete/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Course deleted successfully!");
      localStorage.removeItem("createdCourseId");
    } catch (error) {
      console.error("Error deleting course:", error.response?.data || error);
      alert("Failed to delete course!");
    }
  };

  return (
    <div className="create-course-container">
      <form onSubmit={handleSubmit} className="create-course-form">
        <h2 className="form-title">Create New Course</h2>

        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />

        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          required
        />

        <input
          type="number"
          placeholder="Course Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-input"
          required
        />

        <button className="submit-button">Create Course</button>
        {message && <p className="form-message">{message}</p>}
      </form>

      <button className="Delete-button" onClick={handleDelete}>
        Delete Course
      </button>
    </div>
  );
};

export default CreateCourseComponent;
