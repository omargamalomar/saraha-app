import React, {useState} from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import {Link, useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import {apiConfig} from '../../../constants/api'

function Register() {

    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const registerForm = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            age: ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .min(3, "name must me more than 3 characters")
                .max(30, "name must be less than or equal 30 charactes")
                .required('name is required'),
            email: Yup
                .string()
                .email('Invalid email address')
                .required('email is required'),
            password: Yup
                .string('password must be string')
                .min(5, 'password must be more than 5 characters'),
            rePassword: Yup
                .string('password must be string')
                .oneOf([Yup.ref('password'), null], 'confirmation password must equal password'),
            age: Yup.number().positive().min(12).max(70)
        }),

        onSubmit: async (values) => {
            setIsLoading(true)
            await axios.post(`${apiConfig.BASE_URL}/user`, values).then(response => {
                if (response.status == 201) {
                    navigate('/login')
                }
            }).catch(err => {
                setErrMsg(err.message)
                setTimeout(() => {
                    setErrMsg('')
                }, 5000)
            }).finally(() => {
                setIsLoading(false)
            })
        }
    })

    return (
        <div className="container text-center my-5">
            <div className="user my-3 d-flex flex-row justify-content-center">
                <i className="far fa-edit user-icon me-2 my-auto p-0"></i>
                <h4 className="login">Register</h4>
            </div>
            <div className="row card p-5 col-lg-6 col-sm-12 mx-auto position-relative">
                <form className='' onSubmit={registerForm.handleSubmit}>
                    <div className='mb-3'>
                        <input 
                            className="form-control" 
                            placeholder="Enter your Name" 
                            type="text" name="name" 
                            onChange={registerForm.handleChange} 
                            value={registerForm.values.name} 
                            onBlur={registerForm.handleBlur}
                        />
                        {
                            registerForm.errors?.name && registerForm?.touched?.name && <div className='alert alert-danger p-1 my-2'>
                                <p className='p-0 m-0'>{registerForm.errors.name}</p>
                            </div>
                        }
                    </div>
                    <div className='mb-3'>
                        <input 
                            className="form-control my-2 " 
                            placeholder="Enter your email" 
                            type="email" name="email" 
                            onChange={registerForm.handleChange} 
                            value={registerForm.values.email} 
                            onBlur={registerForm.handleBlur}
                        />
                        {
                            registerForm.errors?.email && registerForm?.touched?.email && <div className='alert alert-danger p-1 my-2'>
                                <p className='p-0 m-0'>{registerForm.errors.email}</p>
                            </div>
                        }
                    </div>
                    <div className='mb-3'>
                        <input 
                            className="form-control" 
                            placeholder="Enter your Password" 
                            type="password" 
                            name="password" 
                            onChange={registerForm.handleChange} 
                            value={registerForm.values.password} 
                            onBlur={registerForm.handleBlur}
                        />
                        {
                            registerForm.errors?.password && registerForm?.touched?.password && <div className='alert alert-danger p-1 my-2'>
                                <p className='p-0 m-0'>{registerForm.errors.password}</p>
                            </div>
                        }
                    </div>
                    <div className='mb-3'>
                        <input 
                            className="form-control my-2" 
                            placeholder="Password Confirmation" 
                            type="password" 
                            name="rePassword" 
                            onChange={registerForm.handleChange} 
                            value={registerForm.values.rePassword} 
                            onBlur={registerForm.handleBlur}
                        />
                        {
                            registerForm.errors?.rePassword && registerForm?.touched?.rePassword && <div className='alert alert-danger p-1 my-2'>
                                <p className='p-0 m-0'>{registerForm.errors.rePassword}</p>
                            </div>
                        }
                    </div>
                    <div className='mb-3'>
                        <input 
                            className="form-control my-2" 
                            placeholder="age" 
                            type="number" 
                            name="age" 
                            onChange={registerForm.handleChange} 
                            value={registerForm.values.age} 
                            onBlur={registerForm.handleBlur}
                        />
                        {
                            registerForm.errors?.age && registerForm?.touched?.age && <div className='alert alert-danger p-1 my-2'>
                                <p className='p-0 m-0'>{registerForm.errors.age}</p>
                            </div>
                        }
                    </div>
                    <button 
                        disabled={!registerForm.isValid || isLoading} 
                        className="btn btn-outline-dark my-4 w-100 rounded"
                        type='submit'
                    >
                        {
                            isLoading ? <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            : <span>Register</span>
                        }
                    </button>
                    <p className="btn btn-default-outline" to="/login">already have acount? <Link to='/login'>login</Link></p>
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

export default Register