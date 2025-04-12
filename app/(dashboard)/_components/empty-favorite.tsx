"use client"

import React from 'react'

const Emptyfavorite = () => {
    return (
        <div className='flex flex-col items-center justify-center  h-full'>
            <img src="/search_ba.jpg" className="rounded-md" alt="not found" width={300} height={300} />
            <h2 className='text-2xl mt-2'>
                No favorites
            </h2>
            <p className="text-center text-muted-foreground">
                Try favoriting a board
            </p>
        </div>
    )
}

export default Emptyfavorite

