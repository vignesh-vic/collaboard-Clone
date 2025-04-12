"use client"

import { Sidebar } from "./_components/sidebar"
import { OrgSidebar } from "./_components/OrgSidebar"
import { Navbar } from "./_components/Navbar"

interface DashboardLayoutPros{
    children:React.ReactNode
}


const DashboardLayout = ({ children }: DashboardLayoutPros)=>{

    return(
        <main className="h-full">
            <Sidebar/>
            <div className="h-full pl-[60px] ">
                <div className="flex gap-x-3 h-full">
                    <OrgSidebar />
                    <div className="flex-1 h-full">
                        <Navbar />

                        {children}

                    </div>

                </div>

            </div>
        </main>
    )

}


export default DashboardLayout