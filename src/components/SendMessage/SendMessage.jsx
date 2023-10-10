import React from "react";
import styles from './SendMessage.module.css'
import { useParams } from "react-router-dom";
import img from "../../images/avatar.png";
import { useFormik } from "formik";
import axios from "axios";
export default function SendMessage() {

  let x =useParams()
  async function addMessage(values){
    let data ={
      ...values,
      receivedId: x.userId
    }
    let res = await axios.post('https://sara7aiti.onrender.com/api/v1/message', data)
    console.log(res)
  }

  let formik = useFormik({
    initialValues:{
      messageContent:"",
    },
    onSubmit:(values) => {
      addMessage(values)
    }
  })



  return (

<div className="container text-center py-5 my-5 text-center">
  <div className="card py-5 mb-5">
    <a href="#" data-toggle="modal" data-target="#profile">
      <img src={img}className="avatar " alt="hello"/>
    </a>
    <div className="container w-50 m-auto">
      <form onSubmit={formik.handleSubmit}  method="post">
        <textarea className="form-control" name="messageContent" value={formik.values.messageContent} onChange={formik.handleChange} cols={10} rows={9}  />
        <button type="submit" className="btn btn-outline-info mt-3"><i className="far fa-paper-plane" /> Send</button>
      </form>
    </div>
  </div>
  <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
</div>

  )
}
