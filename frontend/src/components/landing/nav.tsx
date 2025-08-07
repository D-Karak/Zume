"use client";
import React from 'react'
import Link from 'next/link'
import {Button} from '../ui/button'
import SignIn from '../../app/auth/Signin/[[...signin]]/page'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
const Nav = () => {


  return (
    <header className="flex items-center justify-between px-6 py-4 lg:px-12 fixed top-0 w-full bg-white z-50 border-b-teal-300">
        <div className="text-3xl font-bold text-teal-700">Zume</div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-teal-600 hover:text-teal-700/80 transition-colors">
            Home
          </Link>
          <Link href="#about" className="text-teal-600 hover:text-teal-700/80 transition-colors">
            About
          </Link>
          <Link href="#features" className="text-teal-600 hover:text-teal-700/80 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-teal-600 hover:text-teal-700/80 transition-colors">
            Pricing
          </Link>
        </nav>
        
         <SignedOut>
              <SignUpButton>
                <button className="bg-teal-600 text-white hover:bg-teal-700 transition-colors px-4 py-2 rounded-md">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        
      </header>
    )
}

export default Nav