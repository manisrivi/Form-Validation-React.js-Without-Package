import { useState, useEffect } from "react";
export default function App() {
  // Initial values
  const initialValues = {
    username: "",
    phonenumber: "",
    email: "",
    password: ""
  };
  // form values set an initial state
  const [formValues, setFormValues] = useState(initialValues);
  // form error handling
  const [errorFormValues, setErrorFormValues] = useState({});
  // form submit or not submit
  const [isSubmit, setIsSubmit] = useState(false);
  // form handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
    setIsSubmit(true);
  };
  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorFormValues(validate(formValues));
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setErrorFormValues((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, formValues[name])
    }));
  };
  // checkn the length
  useEffect(() => {
    if (Object.keys(formValues).length === 0 && isSubmit) {
    }
  }, []);
  // validation
  const validate = (values) => {
    const errors = {};
    const Emailregex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const Numberregex = /^(0|[1-9][0-9]*)$/;
    if (!values.username) {
      errors.username = "User name is Required!";
    }
    if (!values.phonenumber) {
      errors.phonenumber = "Phone number is Required!";
    } else if (!Numberregex.test(values.phonenumber)) {
      errors.phonenumber = "Not a Number!";
    }
    if (!values.email) {
      errors.email = "Email is Required!";
    } else if (!Emailregex.test(values.email)) {
      errors.email = "This is not valid email!";
    }
    if (!values.password) {
      errors.password = "Password is Required!";
    }
    return errors;
  };
  const validateField = (fieldName, value) => {
    if (!value) {
      return `${fieldName} is Required!`;
    }
    return "";
  };
  return (
    <div className="container">
      <h1 className="text-center">Login Form</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-2 mt-5 p-4 border rounded shadow-lg"
      >
        {/* Username */}
        <div className="text-center d-flex flex-column">
          <label className="text-start">User name</label>
          <input
            className="form-control"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="text-danger">{errorFormValues.username}</span>
        </div>
        {/* Username */}
        <div className="text-center d-flex flex-column">
          <label className="text-start">Phone number</label>
          <input
            className="form-control"
            name="phonenumber"
            value={formValues.phonenumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="text-danger">{errorFormValues.phonenumber}</span>
        </div>
        {/* Email */}
        <div className="text-center d-flex flex-column">
          <label className="text-start">Email</label>
          <input
            className="form-control"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="text-danger">{errorFormValues.email}</span>
        </div>
        {/* Password */}
        <div className="text-center d-flex flex-column">
          <label className="text-start">Password</label>
          <input
            className="form-control"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="text-danger">{errorFormValues.password}</span>
        </div>
        {/* Submit */}
        <div className="text-center d-flex flex-column">
          <button className="form-control btn btn-info">Submit</button>
        </div>
      </form>
    </div>
  );
}
