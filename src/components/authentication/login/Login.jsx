import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import {Link, useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {apiConfig} from '../../../constants/api'
import { AuthContext } from '../../../context/AuthContext'

function Login() {

    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const {state, login} = useContext(AuthContext)
    const navigate = useNavigate()

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Invalid email address')
                .required('email is required'),
            password: Yup
                .string('password must be string')
                .min(5, 'password must be more than 5 characters'),
        }),

        onSubmit: async (values) => {
            setIsLoading(true)
            await axios.post(`${apiConfig.BASE_URL}/user/signin`, values).then((response) => {
                if (response.status == 200) {
                    const status = login(response.data.token)
                    if (!status) return setErrMsg('in-valid token')
                    navigate('/home')
                }
            }).catch(err => {
                setErrMsg(err.message);
                setTimeout(() => {
                    setErrMsg('')
                }, 5000)
            }).finally(() => {
                setIsLoading(false)
            })            
        }
    })

    useEffect(() => {
        
    }, [])

    return (
        <div className="container text-center my-5">
            <div className="user my-3 d-flex flex-row justify-content-center">
                <i className="far fa-edit user-icon me-2 my-auto p-0"></i>
                <h4 className="login">Login</h4>
            </div>
            <div className="card p-5 mx-auto row col-lg-6 col-sm-12 mx-auto position-relative">
                <form onSubmit={loginForm.handleSubmit}>
                    <div className='mb-3'>
                        <input 
                            className="form-control my-2 " 
                            placeholder="Enter your email" 
                            type="email" name="email" 
                            onChange={loginForm.handleChange} 
                            value={loginForm.values.email} 
                            onBlur={loginForm.handleBlur}
                        />
                        {
                            loginForm.errors?.email && loginForm?.touched?.email && <div className='alert alert-danger p-1 my-2'>
                                <p className='p-0 m-0'>{loginForm.errors.email}</p>
                            </div>
                        }
                    </div>
                    <div className='mb-3'>
                        <input 
                            className="form-control" 
                            placeholder="Enter your Password" 
                            type="password" 
                            name="password" 
                            onChange={loginForm.handleChange} 
                            value={loginForm.values.password} 
                            onBlur={loginForm.handleBlur}
                        />
                        {
                            loginForm.errors?.password && loginForm?.touched?.password && <div className='alert alert-danger p-1 my-2'>
                                <p className='p-0 m-0'>{loginForm.errors.password}</p>
                            </div>
                        }
                    </div>
                    
                    <button 
                        disabled={!loginForm.isValid || isLoading} 
                        className="btn btn-outline-dark my-4 w-100 rounded"
                        type='submit'
                    >
                        {
                            isLoading ? <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            : <span>Login</span>
                        }
                    </button>
                    <p className="btn btn-default-outline" to="/login">haven't acount? <Link to='/register'>register</Link></p>
                </form>
                {
                    errMsg && <div className='alert alert-danger position-absolute start-0' style={{bottom: -100}}>
                        <p className='text-center'>{errMsg}</p>  
                    </div>
                }
            </div>
        </div>
    )
}

export default Login