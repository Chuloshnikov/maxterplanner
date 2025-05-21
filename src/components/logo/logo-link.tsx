import Link from 'next/link';
import React from 'react'

const LogoLink = () => {
  return (
    <Link href={"/"}>
     <h1 className="text-4xl font-bold flex flex-col">
        <div className="text-2xl md:text-3xl font-bold">
            Ma<span className="maxter-text">X</span>ter
        </div>
        <div className="-mt-4 text-lg md:text-2xl">
            Planner
        </div>
    </h1>
    </Link>
  )
}

export default LogoLink;