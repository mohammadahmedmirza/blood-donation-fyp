import React, {useState} from 'react'
import axios from 'axios'
import {BASE_URL} from '../utils'
import {Link, useNavigate} from 'react-router-dom'
import {message, Spin} from 'antd'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, isLoading] = useState(false)
    const [password, setPassword] = useState({
        password: '',
        re_password: '',
    })
    const [step, setStep] = useState(0)

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            if (step === 0) {
                if (email === '') {
                    message.info('Please enter your email first.')
                    return
                }
                isLoading(true)
                const res = await axios.post(`${BASE_URL}/user/check`, {
                    email: email,
                })

                if (res.data.status) {
                    isLoading(false)
                    setStep(1)
                } else {
                    isLoading(false)
                    message.info(res.data.message)
                }
            } else if (step == 1) {
                isLoading(true)
                setStep(1)
                if (password.password !== password.re_password) {
                    console.log('here', password)
                    message.error("password doesn't match")
                    isLoading(false)
                    return
                }
                const res = await axios.post(`${BASE_URL}/user/changepassword`, {
                    password: password.password,
                    email: email,
                })
                if (res.data.status) {
                    isLoading(false)
                    message.info('Password updated')
                    setStep(0)
                    setTimeout(() => {
                        navigate('/')
                    }, 2000)
                } else {
                    message.error('something went wrong')
                }

                if (res.data.status) {
                    isLoading(false)
                    setStep(1)
                }
            }
        } catch (error) {
            message.error(error)
            isLoading(false)
        }
    }
    return (
        <div style={{height: '100vh'}}>
            <div className="container h-100 d-flex">
                <div className="auth-form">
                    <div className="auth-head">
                        <img src="/favicon.ico" width={80}/>
                    </div>
                    <Spin spinning={loading}>
                        {step === 0 ? (
                            <form onSubmit={handleClick}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    submit
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleClick}>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        minLength="8"
                                        value={password.password}
                                        onChange={(e) => {
                                            setPassword({
                                                ...password,
                                                password: e.target.value,
                                            })
                                        }}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Re-enter your password</label>
                                    <input
                                        type="password"
                                        name="re-password"
                                        minLength="8"
                                        value={password.re_password}
                                        onChange={(e) =>
                                            setPassword({
                                                ...password,
                                                re_password: e.target.value,
                                            })
                                        }
                                        className="form-control"
                                        id="exampleInputEmail1"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    submit
                                </button>
                            </form>
                        )}
                    </Spin>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
