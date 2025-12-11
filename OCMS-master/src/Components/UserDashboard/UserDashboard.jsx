import { useState, useEffect } from "react";
import axios from "axios";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [clickCount, setClickCount] = useState({});
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    loadLoggedUserName();
    fetchAllCourses();
    loadEnrolledCoursesFromLocal();
  }, []);

  const loadLoggedUserName = () => {
    const storedName =
      localStorage.getItem("username") ||
      localStorage.getItem("loggedUserName");

    if (storedName) setUserName(storedName);
  };

  const fetchAllCourses = async () => {
    try {
      const res = await axios.get("http://localhost:6090/api/course/get-courses");
      if (res.data?.courses) setCourses(res.data.courses);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  };

  const loadEnrolledCoursesFromLocal = () => {
    const saved = localStorage.getItem("enrolledCourses");
    if (saved) {
      const parsed = JSON.parse(saved);
      setEnrolledCourses(parsed);

      const countMap = {};
      parsed.forEach((c) => {
        countMap[c._id] = 2;
      });
      setClickCount(countMap);
    }
  };

  const saveLocal = (list) => {
    localStorage.setItem("enrolledCourses", JSON.stringify(list));
  };

  const handleEnroll = async (courseId) => {
    if (!token) {
      setMessage("Please login as a user!");
      return;
    }

    const username =
      userName ||
      localStorage.getItem("username") ||
      localStorage.getItem("loggedUserName") ||
      "User";

    setClickCount((prev) => ({
      ...prev,
      [courseId]: (prev[courseId] || 0) + 1,
    }));

    try {
      await axios.post(
        `http://localhost:6090/api/user/join-course/${courseId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const course = courses.find((c) => c._id === courseId);

      if ((clickCount[courseId] || 0) < 1) {
        const newCourse = {
          _id: course._id,
          title: course.title,
          description: course.description,
          price: course.price,
        };

        const updatedList = [...enrolledCourses, newCourse];
        setEnrolledCourses(updatedList);
        saveLocal(updatedList);
      }

      setMessage("Course Enrolled Successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Enrollment Failed");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-actions">
        <button className="profile-btn" onClick={() => navigate("/user/profile")}>
          View Profile
        </button>
      </div>

      <h1 className="dashboard-title">User Dashboard</h1>

      <div className="course-list-section">
        <h2 className="section-title">Available Courses</h2>

        {message && <p className="message">{message}</p>}

        {courses.length === 0 ? (
          <p>No courses available yet.</p>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course._id} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p><strong>Price:</strong> ₹{course.price}</p>

                <button
                  className="enroll-btn"
                  onClick={() => handleEnroll(course._id)}
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="enrolled-courses-section">
        <h2 className="section-title">Enrolled Courses</h2>

        {enrolledCourses.length === 0 ? (
          <p>No enrolled courses yet.</p>
        ) : (
          <div className="courses-grid">
            {enrolledCourses.map((course) => (
              <div key={course._id} className="course-card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p><strong>Price:</strong> ₹{course.price}</p>
                <p className="enrolled-text">Enrolled</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
