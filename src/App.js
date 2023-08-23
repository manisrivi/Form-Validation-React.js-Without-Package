import { useState, useEffect } from "react";
import Select from "react-select";
export default function App() {
  //state List
  const stateList = ["TamilNadu", "Karnataka", "Kerla", "Andra"];
  // skills List
  const skillsList = [
    { value: "react.js", label: "React" },
    { value: "Node.js", label: "Node" },
    { value: "vanilla.js", label: "Vanilla" },
  ];
  // Initial values
  const initialValues = {
    username: "",
    phonenumber: "",
    email: "",
    password: "",
    confirmpassword: "",
    state: "",
    skills: [],
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
      [name]: value,
    }));
    setIsSubmit(true);
  };
  // form multiselect handle change
  const handleChangeMulti = (item) => {
    setFormValues((prev) => ({ ...prev, skills: item }));
    setIsSubmit(true);
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorFormValues(validate(formValues));
  };

  // form handle blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setErrorFormValues((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, formValues[name]),
    }));
  };

  // form handle blur multi
  const handleBlurMulti = (e) => {};
  // checkn the length
  useEffect(() => {
    if (isSubmit && Object.keys(errorFormValues).length === 0) {
      // API Call
      console.log(formValues);
    }
  }, [isSubmit, errorFormValues]);
  // validation
  const validate = (values) => {
    const errors = {};
    const Emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const Numberregex = /^(0|[1-9][0-9]*)$/;
    if (!values.username) {
      errors.username = "user name is required!";
    }
    if (!values.phonenumber) {
      errors.phonenumber = "phone number is required!";
    } else if (!Numberregex.test(values.phonenumber)) {
      errors.phonenumber = "number only!";
    } else if (values.phonenumber < 10) {
      errors.phonenumber = "not valid";
    }
    if (!values.email) {
      errors.email = "email is required!";
    } else if (!Emailregex.test(values.email)) {
      errors.email = "This is not valid email!";
    }
    if (!values.password) {
      errors.password = "password is required!";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "confirm password is required!";
    }
    if (!values.state) {
      errors.state = "state is required!";
    }
    console.log(values.skills.length);
    if (values.skills.length <= 0) {
      errors.skills = "skills is required!";
    }
    return errors;
  };
  const validateField = (fieldName, value) => {
    if (!value) {
      return `${fieldName} is required!`;
    }
    return "";
  };

  return (
    <div className="container">
      <h1 className="text-center">Form</h1>

      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-7">
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
            {/* Phone number */}
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
                type="password"
                value={formValues.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-danger">{errorFormValues.password}</span>
            </div>
            {/*Confirm Password */}
            <div className="text-center d-flex flex-column">
              <label className="text-start">Confirm password</label>
              <input
                className="form-control"
                name="confirmpassword"
                type="password"
                value={formValues.confirmpassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-danger">
                {errorFormValues.confirmpassword}
              </span>
            </div>
            {/*Skills*/}
            <div className="text-center d-flex flex-column">
              <label className="text-start">Skills</label>
              <Select
                isMulti
                name="skills"
                options={skillsList}
                onChange={handleChangeMulti}
                value={formValues.skills}
              />
              <span className="text-danger">{errorFormValues.skills}</span>
            </div>
            {/*State */}
            <div className="text-center d-flex flex-column">
              <label className="text-start">State</label>
              <select
                className="form-control text-center"
                name="state"
                type="text"
                value={formValues.state}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>--select--</option>
                {stateList?.map((item) => (
                  <option>{item}</option>
                ))}
              </select>
              <span className="text-danger">{errorFormValues.state}</span>
            </div>
            {/* Submit */}
            <div className="text-center d-flex flex-column">
              <button className="form-control btn btn-info">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
