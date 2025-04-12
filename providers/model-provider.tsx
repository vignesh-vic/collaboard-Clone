"use client"

import { RenameModel } from "@/components/models/use-rename-model"
import { useEffect, useState } from "react"

export const ModelProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])


    if (!isMounted) {
        return null
    }

    return (
        <>
            <RenameModel />
        </>
    )
}