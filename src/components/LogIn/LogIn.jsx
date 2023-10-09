import React, { useState } from "react";
import styles from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";



export default function LogIn() {
  let navigate = useNavigate;
  let [apiError, setApiError] = useState("")
  function login(values) {
    axios
      .post("https://sara7aiti.onrender.com/api/v1/user/signin", values)
      .then((data) => {
        if(data.data.message == 'welcome'){
          navigate('/profile')
        }
        console.log(data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setApiError(err.response.data.error)
      });
  }


  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("email require"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "password should start capital")
      .required("password require"),
  });





  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });



  return (
    <div className="w-50 mx-auto my-5">
      <h4 className="text-center">Register</h4>
      {apiError? <div className="alert alert-danger">{apiError}</div> : ""}
      <form onSubmit={formik.handleSubmit}>
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
        <button
          type="submit"
          class="btn btn-default-outline mx-auto d-block  rounded"
        >
          login
        </button>
      </form>
    </div>
  );
}
