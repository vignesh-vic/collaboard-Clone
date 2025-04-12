"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


interface BoardCartprops {
    id: string;
    title: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    createdAt: number;
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    createdAt,
    orgId,
    isFavorite,
}: BoardCartprops) => {
    const { userId } = useAuth();
    // const handleFavorite = useMutation(api.board.favorite)
    const { pending: pendingFav, mutate: onFavorite } = useApiMutation(api.board.favorite)
    const { pending: pendingUnFav, mutate: onUnFavorite } = useApiMutation(api.board.unfavorite)

    const authorLabel = userId === authorId ? "You" : authorName;
    const createdAtlabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    const toggleFavorite = () => {
        if (isFavorite) {
            onUnFavorite({ id })
                .catch(() => toast.error('Failed to unfavotite'))
        } else {
            onFavorite({ id, orgId })
                .catch(() => toast.error('Failed to favotite'))

        }
    }


    return (
        <Link href={`/board/${id}`}>
            <div
                className="group aspect-[100/127] border rounded-lg  flex flex-col justify-between overflow-hidden"
                key={id}
            >
                <div className="relative flex-1 bg-amber-50">
                    <Image src={imageUrl} alt={title} fill className="object-fit" />
                    <Overlay />
                    <Actions
                        side="right"
                        id={id}
                        title={title}>
                        <button className="absolute top-1 right-1  opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none cursor-pointer">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity " />
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtlabel={createdAtlabel}
                    onClick={toggleFavorite}
                    disabled={pendingFav || pendingUnFav}
                />
            </div>
        </Link>
    );
};


BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className=" aspect-[100/127] rounded-lg  overflow-hidden"
        >
            <Skeleton className="w-full h-full" />
        </div>
    )
}