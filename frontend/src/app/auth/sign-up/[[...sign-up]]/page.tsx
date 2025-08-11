import React from "react"
import { SignUp } from "@clerk/nextjs";
export default function page(){
    return(
        <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-300 to-cyan-300 flex items-center justify-center">
              <SignUp />
            </div>
    )
}