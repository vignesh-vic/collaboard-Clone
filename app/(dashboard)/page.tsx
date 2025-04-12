"use client"

import { useOrganization } from "@clerk/nextjs";
import EmptyOrg from "./_components/empty-org"
import BoardList from "./_components/board-List";


// interface DashboardPageProps {
//     searchParams: {
//         search?: string,
//         favorites?: string,

//     }
// }

const DashboardPage = ({ searchParams }: any) => {

    const { organization } = useOrganization(); // Get active organization


    return (
        <div className=" flex-1 h-[calc(100%-80px)]  p-2">
            {
                !organization
                    ? <EmptyOrg />
                    : <BoardList orgId={organization.id} query={searchParams} />
            }
        </div>
    )

}


export default DashboardPage

