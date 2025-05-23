"use client"

import React from "react";
import EmptySearch from "./empty-search";
import Emptyfavorite from "./empty-favorite";
import Emptyboards from "./empty-boards";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "./board-cart";
import { NewBoardButton } from "./NewBoardButton";

interface boardListProps {
    orgId: string;
    query?: {
        search?: string;
        favorites?: string;
    };
}

const BoardList = ({ orgId, query }: boardListProps) => {

    const data = useQuery(api.boards.get, { orgId, ...query })
    if (data === undefined) {
        return (
            <div>
                <h2>
                    {query?.favorites ? 'Favorite boards' : 'Team boards'}
                </h2>
                <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-8 ">
                    <NewBoardButton orgId={orgId} disabled />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                </div>
            </div>
        )

    }

    if (!data?.length && query?.search) {
        return <EmptySearch />
    }

    if (!data?.length && query?.favorites) {
        return <Emptyfavorite />
    }

    if (!data?.length) {
        return <Emptyboards />;
    }

    return <div>
        <h2>
            {query?.favorites ? 'Favorite boards' : 'Team boards'}
        </h2>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-8 ">
            <NewBoardButton orgId={orgId} />
            {

                data && data?.map((board) => (
                    <BoardCard
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageUrl={board.imageUrl}
                        authorId={board.authorId}
                        authorName={board.authorName}
                        createdAt={board._creationTime}
                        orgId={board.orgId}
                        isFavorite={board.isFavorite}

                    />
                ))
            }

        </div>
    </div>;
};

export default BoardList;
