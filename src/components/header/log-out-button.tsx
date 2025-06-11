"use client"

import { DoorClosed } from "lucide-react";
import { signOut } from "@/lib/auth/client";

const LogOutButton = () => {

const handleSignOut = async () => {
    try {
        await signOut();
        window.location.reload()
    } catch (error) {
        console.error("Error signing out:", error);
    }
}
  return (
    <button
        onClick={handleSignOut}
        className="maxter-bg px-2 py-1.5 rounded-md text-white"
        >
            <DoorClosed className="w-6 h-6"/>
    </button>
  )
}

export default LogOutButton;