import React from 'react'
import { Metadata } from 'next';
import ResumeEditor from './resumeEditor';
const metadata = {
    title: 'Design Your Resume',
}
const page = () => {
  return (
    <ResumeEditor/>
  )
}

export default page