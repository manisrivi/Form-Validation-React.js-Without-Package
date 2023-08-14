import "./styles.css";
import { useState } from "react";

export default function App() {
  // Initial form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  // Error form data
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });
  // Touched and Untouched form data
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  });
  // handleChange for Input data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };
  // handle blur
  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.value]: true
    });
  };
  // Validation
  const validation = () => {
    // Error Initialized
    let tempErrors = {};
    let formIsValid = true;
    // name Validate
    if (!formData.name) {
      formIsValid = false;
      tempErrors.name = "Name is Empty";
    }
    // email Validate
    if (!formData.email) {
      formIsValid = false;
      tempErrors.email = "Email is Empty";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      tempErrors.email = "Email is Invalid";
    }
    // password Validate
    if (!formData.password) {
      formIsValid = false;
      tempErrors.password = "Password is Empty";
    }
    setErrors(tempErrors);
    return formIsValid;
  };
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      console.log(formData);
    }
  };

  return (
    <div className="container">
      <form className="d-flex flex-column gap-3 p-3" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <span>Name</span>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<span className="text-danger">{errors.name}</span>}
        </div>
        {/* Email */}
        <div>
          <span>Email</span>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<span className="text-danger">{errors.email}</span>}
        </div>
        {/* Password */}
        <div>
          <span>Password</span>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {<span className="text-danger">{errors.password}</span>}
        </div>
        {/* Submit */}
        <div>
          <button type="submit" className="btn btn-info form-control">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
