"use client"
import React from 'react'
import { Plus } from 'lucide-react'
import { OrganizationProfile } from '@clerk/nextjs'
import {
    Dialog,
    DialogContent, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button'


export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' size='sm' >
                    <Plus className='h-4 w-4' />
                    Invite members
                </Button>
            </DialogTrigger>
            {/*    <DialogContent className="flex  items-center justify-center bg-white rounded-lg shadow-lg p-6   min-h-[100px] sm:min-h-[400px] md:min-h-[500px] max-h-[90vh] ">
                <DialogTitle className='hidden'></DialogTitle>
            </DialogContent>*/}
            <DialogContent
                className="flex flex-col items-center justify-center bg-white rounded-lg  
             w-[100vw] max-w-[800px] min-h-[300px] max-h-[90vh] "
            >
                <DialogTitle className="hidden"></DialogTitle>
                <div className="w-full max-w-[850px] min-h-[250px] overflow-y-auto">
                    <OrganizationProfile routing="hash" />
                </div>
            </DialogContent> 
                    </Dialog>
    )
}
