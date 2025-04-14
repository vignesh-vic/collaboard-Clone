"use client"

import { useOrganization } from "@clerk/nextjs";
import EmptyOrg from "./_components/empty-org"
import BoardList from "./_components/board-List";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";


// interface DashboardPageProps {
//     searchParams: {
//         search?: string,
//         favorites?: string,

//     }
// }

const DashboardPage = ({ }: any) => {

    const { organization } = useOrganization(); // Get active organization
    const searchParams = useSearchParams();

    const search = searchParams.get("search");
    const favorites = searchParams.get("favorites");

    const query = useMemo(() => {
        return {
            search: search || undefined,
            favorites: favorites || undefined,
        };
    }, [search, favorites]);


    return (
        <div className=" flex-1 h-[calc(100%-80px)]  p-2">
            {
                !organization
                    ? <EmptyOrg />
                    : <BoardList orgId={organization.id} query={query} />
            }
        </div>
    )

}


export default DashboardPage

