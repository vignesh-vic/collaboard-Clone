import { create } from 'zustand'

const defalutValues = { id: '', title: '' }

interface IRenamemodel {
    isOpen: boolean,
    initialvalues: typeof defalutValues,
    onOpen: (id: string, title: string) => void,
    onClose: () => void
}


export const useRenameModel = create<IRenamemodel>((set) => ({
    isOpen: false,
    onOpen: (id, title) => set({
        isOpen: true,
        initialvalues: { id, title },
    }),
    onClose: () => set({
        isOpen: false,
        initialvalues:defalutValues
    }),
    initialvalues:defalutValues

}))