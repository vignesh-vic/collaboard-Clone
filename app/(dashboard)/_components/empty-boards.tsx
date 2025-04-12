"use client"

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api';

import React from 'react'
import { useOrganization } from '@clerk/nextjs';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Emptyboards = () => {
    const router = useRouter()
    const { organization } = useOrganization()
    const { mutate, pending } = useApiMutation(api.board.create)

    const onclick = () => {
        if (!organization) return
        mutate({
            title: 'untitled',
            orgId: organization.id
        }).then((id: string) => {
            toast.success("Board created ")
            router.push(`/board/${id}`)
        }).catch(
            () => {
                toast.error("failed to create board")
            })
    }

    return (
        <div className='flex flex-col items-center justify-center  h-full'>
            <img src="/search_ba.jpg" className="rounded-md" alt="not found" width={300} height={300} />
            <h2 className='text-2xl mt-2'>
                Create your first board!
            </h2>
            <p>
                Start by creating a board for your organization
            </p>
            <div className='mt-6'>
                <Button size='lg' disabled={pending} onClick={onclick}>
                    Create board
                </Button>
            </div>
        </div>
    )
}

export default Emptyboards

