"use client"
import React from 'react'
import { Plus } from 'lucide-react'
import { CreateOrganization } from '@clerk/nextjs'

import { Dialog,  DialogContent,  DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Hint } from '@/components/hint'

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='aspect-square'>
          <Hint label='Create Organization' side='right' algin='start' sideOffset={8}>
            <button className='bg-white/25 h-full w-full rounded-md opacity-60 hover:opacity-100 transition flex items-center justify-center'>
              <Plus className='text-white' />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-transparent border-none p-0  ">
        <DialogTitle className='hidden'></DialogTitle>
        <CreateOrganization />
      </DialogContent>

    </Dialog>
  )
}
