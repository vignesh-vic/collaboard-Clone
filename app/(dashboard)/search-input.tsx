"use client"

import qs from 'query-string'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useDebounceValue } from 'usehooks-ts'

const SearchInput = () => {
    const router = useRouter()
    const [value, setValue] = useState("")
    const [debounceValue] = useDebounceValue(value, 500)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: '/',
            query: {
                search: debounceValue
            },
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }, [debounceValue, router])


    return (
        <div className='w-full px-3 relative py-2 '>
            <Search className='absolute top-1/2 left-4 transform -translate-y-1/2 text-muted-foreground' />
            <Input className='w-full max-w-[516] pl-9' onChange={handleChange} value={value} />
        </div>
    )
}

export default SearchInput
