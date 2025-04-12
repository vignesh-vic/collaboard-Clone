"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { useRenameModel } from "@/store/use-rename-model"
import {  FormEventHandler, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

export const RenameModel = () => {

    const { pending, mutate } = useApiMutation(api.board.update)
    const { isOpen, onClose, initialvalues } = useRenameModel()
    const [title, setTitle] = useState(initialvalues.title)

    useEffect(() => {
        setTitle(initialvalues.title)
    }, [initialvalues.title])

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        mutate({
            id:initialvalues.id,
            title
        }).then(()=>{
            toast.success('Board renamed')
            onClose()
        })
        .catch(()=>toast.error('Failed to rename board'))
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit board title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">

                    <Input disabled={pending}
                        maxLength={60}
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board title"
                    />
                    <DialogFooter>
                        <DialogClose asChild>

                            <Button type="button" variant='outline'>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={pending}>
                            Save
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}