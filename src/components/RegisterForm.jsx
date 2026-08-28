import React, { useState } from 'react'
import { useAuth } from './AuthProt'
import { getUserAPI, saveUserAPI } from '../services/apiService'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function RegisterForm() {
    
    const{isLoggedIn,toggleAuth}=useAuth()
    const [userDetails,setUserDetails]=useState({username:"",password:""})
    const navigate=useNavigate()

    const handleSaveUser = async ()=>{
        const {username,password} = userDetails
        if (username&&password){
            const checkResponse = await getUserAPI(username)
            if(checkResponse.status==200){
                if(checkResponse.data.length>0){
                    toast.error("Username is already taken!")
                }else{
                    const response = await saveUserAPI(userDetails)
                    if(response.status==201){
                        toast.success("User Details Added!")
                        navigate('/login')
                    }
                }
            }
            

        }else{
            toast.info("Please fill the form completely!")
        }
    }

  return (
    <div className="d-flex justify-content-center">
        <div className='container d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor:'#AD391F', color:'white', height:'500px', width:'500px', borderRadius:'10px', margin:'50px', gap:'20px'}}>
            <img style={{width:'50px'}} src="/gamercaveicon.png" alt="logo" />
            <h1>Register</h1>
            <form className='form'>
                <div className='container d-flex flex-column justify-content-center align-items-center' style={{gap:'20px'}}>
                    <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} className='form-control' type="text" placeholder='Enter username'/>
                    <input value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} className='form-control' type="password" placeholder='Enter password' />
                    <button type='button' onClick={handleSaveUser} className='btn btn-light' style={{color:'#AD391F'}}>Submit</button>
                    <div className='d-flex flex-row'>
                        <Link style={{textDecoration:'None', color:'white'}} to={'/login'}>Already Registered? Click here</Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm