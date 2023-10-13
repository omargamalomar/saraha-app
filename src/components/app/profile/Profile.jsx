import React, {useContext, useState} from 'react'
import { AuthContext } from '../../../context/AuthContext'
import anonymousIcon from '../../../imgs/avatar.png'
import './Profile.css'
import SharedLink from '../modal/SharedLink'

function Profile({showShareBtn=true}) {

    const [showModal, setShowModal] = useState(false)
    const {state} = useContext(AuthContext)

    return (
        <div className="container text-center py-3 my-3 text-center rounded">
            <div className="card pt-1">
                <div className='text-center'>
                    <img src="https://cdn.icon-icons.com/icons2/3906/PNG/512/anonymous_icon_246670.png" className="avatar" alt="" />
                </div>
                
                <h3 className="py-2">{state.name}</h3>
                {showShareBtn  && <button data-toggle="modal" data-target="#share" className="btn btn-outline-dark w-25 d-block mx-auto mb-3" onClick={() => setShowModal(true)}>
                    <i className="fa-solid fa-share me-2"></i>
                    <span>Share Profile</span>
                </button>}
            </div>
            <SharedLink
                show={showModal}
                onHide={() => setShowModal(false)}
                sharedLink={"http://localhost:3000/sendmessage/" + state.id}
            />
        </div>
    )
}

export default Profile