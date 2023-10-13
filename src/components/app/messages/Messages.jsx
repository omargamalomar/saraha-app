import React, { useEffect, useState } from 'react'
import MessageCard from '../messageCard/MessageCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMessages } from '../../../redux/messages.slice'

function Messages() {
    
    const dispatch = useDispatch()
    const state = useSelector((state) => {
        return state.messages
    })

    useEffect(() => {
        dispatch(fetchMessages())
    }, [])    

    console.log(state);

    if (state.loading) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    if (!state.messages.length) {
        return <div className="container text-center my-5 text-center">
            <div className="row">
                <div className="col-md-12">
                    <div className="card py-5">
                        <p>You don't have any messages... </p>
                    </div>
                </div>
            </div>
        </div>
    }

    return (
        <div className='row align-items-center'>
            {state.messages.map((msg) => {
                return <>
                    <MessageCard 
                        key={msg._id}
                        msg={msg.messageContent}
                    />
                </>
            })}
        </div>
    )
}

export default Messages