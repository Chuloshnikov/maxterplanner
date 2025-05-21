import AuthForm from '@/components/auth/auth-form'
import React from 'react'

export default function Login() {
  return (
    <div className='max-w-4xl mx-auto px-4 h-screen w-screen mt-20'>
        <AuthForm type={"sign-in"}/>
    </div>
  )
}
