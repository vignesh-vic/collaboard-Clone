import { Loader } from 'lucide-react'
import React from 'react'
import { InfoSkeleton } from './info'
import { ParticipantsSkeleton } from './participants'
import { ToolbarSkeleton } from './toolbar'

const convasLoading = () => {
    return (
        <main className="h-full w-full relative flex items-center justify-center bg-neutral-100 touch-none">
            <Loader className='h-6 w-6 text-muted-foreground animate-spin' />
            <InfoSkeleton />
            <ParticipantsSkeleton />
            <ToolbarSkeleton />
        </main>
    )
}

export default convasLoading
