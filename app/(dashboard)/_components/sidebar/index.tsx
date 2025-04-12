"use client"

import { List } from "./list"
import { NewButton } from "./NewButton"

export const Sidebar = () => {

    return(
        <div className="fixed z-[1] h-full bg-blue-950 flex flex-col gap-y-5 text-white ">
            <List/>
            <NewButton/>
        </div>
    )

}