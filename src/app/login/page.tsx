import AuthForm from '@/components/auth/auth-form'
import { getServerAuthUser } from '@/lib/auth/server';
import Link from 'next/link'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Login() {
  const authUser = await getServerAuthUser();

  if (authUser) {
    redirect("/notes");
  }
  return (
    <div className='max-w-4xl mx-auto px-4 h-screen w-screen mt-20'>
       <div className='flex flex-col items-center justify-center mt-10'>
          <h1 className='text-2xl font-bold'>Welcome back!</h1>
          <p className='text-gray-500'>Please sign in to your account</p>
        </div>
        <AuthForm type={"sign-in"}/>
        <div>
          <p className='italic text-gray-500 text-sm '>
              Don&apos;t have an account? {" "}
            <Link href={"/sign-up"} className="maxter-text font-semibold">
              Sign up here
            </Link>
          </p>
        </div>
    </div>
  )
}
