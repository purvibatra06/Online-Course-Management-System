import React, { useEffect, useState } from "react";
import axios from "axios";
import "./InstructorProfile.css";

const InstructorProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    bio: "",
    qualifications: [{ degree: "", institution: "", year: "" }],
  });

  const token = localStorage.getItem("instructorToken");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:6090/api/instructors/getprofile/69141f2ffc01b44c37eaeb30", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser({
          fullName: res.data.fullName || "",
          email: res.data.email || "",
          bio: res.data.bio || "",
          qualifications: res.data.qualifications?.length
            ? res.data.qualifications
            : [{ degree: "", institution: "", year: "" }],
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
        "http://localhost:6090/api/instructors/Profile/69141f2ffc01b44c37eaeb30",
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
      <div className="profile-form">
        <h2>Instructor Profile</h2>
        <form onSubmit={handleUpdate}>
          <label>fullName</label>
          <input type="text" value={user.fullName} disabled />

          <label>Email</label>
          <input type="email" value={user.email} disabled />

          <label>Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            placeholder="Enter your bio"
          />

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

          <button type="submit" className="update-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstructorProfile;
