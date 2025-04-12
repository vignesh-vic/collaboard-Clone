import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface footerProps {
    isFavorite: boolean,
    title: string,
    authorLabel: string,
    createdAtlabel: string,
    onClick: () => void,
    disabled: boolean
}

export const Footer = (
    {
        isFavorite,
        title,
        authorLabel,
        createdAtlabel,
        onClick,
        disabled
    }: footerProps

) => {

const handleClick=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
    event.stopPropagation();
    event.preventDefault();

    onClick()

}


    return (
        <div className="relative bg-white p-3 ">
            <p className="truncate  max-w-[calc(100%-20px)]">
                {title}

            </p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[13px] text-muted-foreground truncate">
                {authorLabel},{createdAtlabel}
            </p>
            <button disabled={disabled} onClick={handleClick} className={cn("opacity-0 group-hover:opacity-100 transition absolute top-4 right-3 text-muted-foreground hover:text-blue-600",disabled && 'cursor-not-allowed opacity-75')}>
                <Star className={cn("w-4 h-4 cursor-pointer",isFavorite && 'fill-blue-600  text-blue-600' )} />
            </button>
        </div>
    )
}