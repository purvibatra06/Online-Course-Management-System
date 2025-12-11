import { useEffect, useState } from "react";
import axios from "axios";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    bio: "",
    qualifications: [{ degree: "", institution: "", year: "" }],
    progress: 0, 
    completedModules: [], 
  });

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:6090/api/user/get-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          bio: res.data.bio || "",
          qualifications: res.data.qualifications?.length
            ? res.data.qualifications
            : [{ degree: "", institution: "", year: "" }],
          progress: res.data.progress || 0,
          completedModules: res.data.completedModules || [],
        });
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQualificationChange = (index, e) => {
    const updated = [...user.qualifications];
    updated[index][e.target.name] = e.target.value;

    setUser((prev) => ({
      ...prev,
      qualifications: updated,
    }));
  };

  const handleAddQualification = () => {
    setUser((prev) => ({
      ...prev,
      qualifications: [
        ...prev.qualifications,
        { degree: "", institution: "", year: "" },
      ],
    }));
  };

  const handleRemoveQualification = (index) => {
    const updated = [...user.qualifications];
    updated.splice(index, 1);

    setUser((prev) => ({
      ...prev,
      qualifications: updated,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:6090/api/user/update-profile",
        {
          bio: user.bio,
          qualifications: user.qualifications,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("PROFILE RESPONSE:", res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
    
        <div className="profile-form-column">
          <div className="profile-form">
            <h2>User Profile</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={user.fullName} disabled />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" value={user.email} disabled />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  placeholder="Enter your bio"
                />
              </div>

              <div className="qualifications-section">
                <h3>Qualifications</h3>
                {user.qualifications.map((qual, index) => (
                  <div key={index} className="qualification-group">
                    <input
                      type="text"
                      name="degree"
                      value={qual.degree}
                      onChange={(e) => handleQualificationChange(index, e)}
                      placeholder="Enter degree"
                    />
                    <input
                      type="text"
                      name="institution"
                      value={qual.institution}
                      onChange={(e) => handleQualificationChange(index, e)}
                      placeholder="Enter institution"
                    />
                    <input
                      type="text"
                      name="year"
                      value={qual.year}
                      onChange={(e) => handleQualificationChange(index, e)}
                      placeholder="Enter year"
                    />
                    {user.qualifications.length > 1 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => handleRemoveQualification(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="add-btn" onClick={handleAddQualification}>
                  + Add Qualification
                </button>
              </div>

              <button type="submit" className="update-btn">
                Update
              </button>
            </form>
          </div>
        </div>

        <div className="profile-progress-column">
          <div className="progress-section">
            <h3>Progress</h3>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${user.progress}%` }}></div>
            </div>
            <p>{user.progress}% completed</p>
          </div>

          <div className="completed-modules-section">
            <h3>Completed Modules</h3>
            {user.completedModules.length > 0 ? (
              <ul>
                {user.completedModules.map((mod, idx) => (
                  <li key={idx}>{mod}</li>
                ))}
              </ul>
            ) : (
              <p>No modules completed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
