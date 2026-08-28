import React, { useState } from 'react'
import { useAuth } from './AuthProt'
import { Link, useNavigate } from 'react-router-dom'
import { getUserAPI } from '../services/apiService'
import { toast } from 'react-toastify'

function LoginForm() {
    const{login}=useAuth()
    const [userDetails,setUserDetails]=useState({username:"",password:""})
    const navigate=useNavigate()

    const handleLoginUser = async ()=>{
        const {username,password}=userDetails
        if(username&&password){
            const response = await getUserAPI(username)
            if(response.status==200){
                if(response.data.length>0){
                    if(response.data[0].password==password){
                        toast.success("Logged In Successfully!")
                        login(response.data[0])
                        navigate('/')
                    }else{
                        toast.error("Wrong Password!")
                    }
                }else{
                    toast.error("Please enter valid username!")
                }
            }
        }

    }

  return (
    <div className="d-flex justify-content-center">
        <div className='container d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor:'#AD391F', color:'white', height:'500px', width:'500px', borderRadius:'10px', margin:'50px', gap:'20px'}}>
            <img style={{width:'50px'}} src="/gamercaveicon.png" alt="logo" />
            <h1>Login</h1>
            <form className='form'>
                <div className='container d-flex flex-column justify-content-center align-items-center' style={{gap:'20px'}}>
                    <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} className='form-control' type="text" placeholder='Enter username'/>
                    <input value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} className='form-control' type="password" placeholder='Enter password' />
                    <button type='button' onClick={handleLoginUser} className='btn btn-light' style={{color:'#AD391F'}}>Submit</button>
                    <div className='d-flex flex-row'>
                        <Link style={{textDecoration:'None', color:'white'}} to={'/register'}>Not registered yet? Click here</Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginForm