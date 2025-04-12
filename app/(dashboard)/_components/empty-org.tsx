"use client"

import React from 'react'
import { CreateOrganization } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"

const EmptyOrg = () => {
  return (
    <>
      <div className=' h-full  flex flex-col justify-center items-center '>
        <img src="/collaboard_logo_transparent.png" alt="logo" className='h-56 py-5' />
        <h2 className='text-2xl font-semibold'>Welcome to Board</h2>
        <p className='text-muted-foreground text-sm mt-2 '>create on organization to get started</p>
        <div className='mt-6'>
          <Dialog>
            <DialogTrigger asChild>
              <Button size='lg'>
                create  organization
              </Button>

            </DialogTrigger>
             <DialogContent className="sm:max-w-[425px] bg-transparent border-none p-0  ">
                    <DialogTitle className='hidden'></DialogTitle>
                    <CreateOrganization />
                  </DialogContent>
          </Dialog>

        </div>
      </div>
    </>
  )
}

export default EmptyOrg
