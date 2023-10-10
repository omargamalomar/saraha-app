import React, { Fragment, useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import img from "../../images/avatar.png";
import axios from "axios";
import { Link } from "react-router-dom";
import TokenContext from '../../Context/tokenContext'
import jwtDecode from "jwt-decode";
export default function Profile() {
  const [allMessages, seAllMessages] = useState([]);
const [userId, setUserId] = useState("")
  async function getMessages() {
    let { data } = await axios.get(
      "https://sara7aiti.onrender.com/api/v1/message",
      {
        headers: {
          token: localStorage.getItem("userToken")
        }
      });
    console.log(data);
    seAllMessages(data.allMessages)
  }

  function getUserId(){
    let decode = jwtDecode(localStorage.getItem('userToken'))
    console.log(decode);
    setUserId(decode.id)
  }
  useEffect(() => {
    getMessages();
    getUserId();
  }, []);
  return (
    <Fragment>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card pt-5">
          <a  data-toggle="modal" data-target="#profile">
            <img src={img} className="avatar" alt="hello" />
            <h3>Omar Gamal</h3>
          </a>
          <Link
            data-toggle="modal"
            data-target="#share"
            className="btn btn-default-outline share "
            to={'/message/'+ userId}
          >
            <i className="fas fa-share-alt" /> Share Profile
          </Link>
        </div>
      </div>

      <div className="container text-center my-5 text-center">
        <div className="row">
          {allMessages.length == 0 ? (
            <div className="col-md-12">
              <div className="card py-5">
                <p>You don't have any messages... </p>
              </div>
            </div>
          ) : (
            ""
          )}
          {allMessages.map((ele) =><div key={ele._id} className="card py-5 mb-5">
          <p>{ele.messageContent} </p>
        </div>)}
        </div>
      </div>
    </Fragment>
  );
}
