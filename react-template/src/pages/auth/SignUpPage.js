import React, { useState } from 'react'

import { connect } from 'react-redux'
import { authenticate, fetchPost } from '../../redux/actions/auth.action';
import { SIGNUP } from '../../redux/constants/auth';
export const SignUpPage = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNo, setPhoneNo] = useState()
    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(name,email,password,phoneNo);
        // fetchPost()
        props.authenticate(SIGNUP,{name,email,password,phoneNo})
    }
  return (
    <div>
        <form>
        <h1>SignUp</h1>
      <div>
        Email:
        <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email'/>
      </div>
      <div>
        Phone:
        <input onChange={(e)=>setPhoneNo(e.target.value)}  type='tel' placeholder='0000000000'/>
      </div>
      
      <div>
        Name:
        <input onChange={(e)=>setName(e.target.value)}  type='text' placeholder='Name'/>
      </div>
      <div>
        Password:
        <input onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='********'/>
      </div>
      <button type='submit' onClick={onSubmit}>Submit</button>
        </form>
      
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    authenticate,fetchPost
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
