import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navigate = useNavigate();
  let [apiError, setApiError] = useState("")

  function register(values) {
    axios
      .post("https://sara7aiti.onrender.com/api/v1/user", values)
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setApiError(err.response.data.error);
      });
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "Name must be less then  15")
      .min(3, "Name must be less then  15")
      .required("name is require"),
    email: Yup.string().email("invalid email").required("email require"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "password should start capital")
      .required("password require"),
    rePassword: Yup.string().oneOf([Yup.ref("password")]).required("Is Require"),
    age: Yup.number()
      .min(10, "min is 10")
      .max(60, "max is 60")
      .required("age is require"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      age: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <div className="w-50 mx-auto my-5">
      <h4 className="text-center">Register</h4>
      {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="userName">Username</label>
          <input
            name="name"
            type="text"
            id="userName"
            className="form-control"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="rePassword">Confirm Password</label>
          <input
            name="rePassword"
            type="password"
            id="rePassword"
            className="form-control"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-4">
          <label htmlFor="age">Age</label>
          <input
            name="age"
            type="number"
            id="age"
            className="form-control"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.age && formik.touched.age ? (
            <div className="alert alert-danger">{formik.errors.age}</div>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="btn btn-default-outline mx-auto d-block  rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
