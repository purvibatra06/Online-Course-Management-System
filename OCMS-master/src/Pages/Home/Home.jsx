import Header from "../../Components/Header/Header.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) {
      window.location.hash = id;
      return;
    }
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };

  return (
    <div className="home-page">
      <Header />
      <section className="hero-section">
        <div className="hero-content">
          <h1>Online Course Management System</h1>
          <p>
            Learn anytime, anywhere. Explore courses, enroll instantly, track your
            progress, and unlock your potential with our advanced course management system.
          </p>
          <button
            className="explore-btn"
            onClick={() => scrollToSection("popular-courses")}
          >
            Explore Courses
          </button>
        </div>


        <div className="hero-image"></div>
      </section>
      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div
            className="feature-card"
            onClick={() => navigate("/instructor/dashboard")}
            style={{ cursor: "pointer" }}
          >
            <h3>Instructor Dashboard</h3>
            <p>Create, update, and manage your courses with ease.</p>
          </div>
          <div
            className="feature-card"
            onClick={() => navigate("/user/dashboard")}
            style={{ cursor: "pointer" }}
          >
            <h3>User Dashboard/Student Learning</h3>
            <p>Enroll in courses, track progress & complete modules.</p>
          </div>

        </div>
      </section>

      <section className="popular-courses" id="popular-courses">
        <h2>Popular Courses</h2>
        <div className="course-display">
          <div className="course-box">
            <h3>Full-Stack Development</h3>
            <p>Learn MERN Stack from beginner to advanced.</p>
          </div>
          <div className="course-box">
            <h3>UI/UX Design</h3>
            <p>Become a professional UI/UX designer.</p>
          </div>
          <div className="course-box">
            <h3>Python for Beginners</h3>
            <p>Master Python programming step-by-step.</p>
          </div>
        </div>
        <button
          className="view-all-btn"
          onClick={() => navigate("/courses")}
        >
          View All Courses
        </button>
      </section>

      <section className="cta-section">
        <h2>Start Your Learning Journey Today!</h2>

        <p>Sign up now and join thousands of learners worldwide.</p>
        <button
          className="cta-btn"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default Home;