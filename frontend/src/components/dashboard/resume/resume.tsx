import React from 'react'
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusSquare } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Your Resume',
}
export const Resume = () => {
  return (
    <main className='mx-auto w-full max-w-7xl space-y-6 px-3 py-6'>
        <Button asChild className='mx-auto flex w-fit gap-2'>
            <Link href='/dashboard/resume/editor' className="flex items-center gap-2">
                Create New Resume
                <PlusSquare className='size-5'/>
            </Link>
        </Button>
    </main>
  )
}

