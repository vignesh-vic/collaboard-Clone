"use client"

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs"
import SearchInput from "../search-input"
import { InviteButton } from "./invite-button"
export const Navbar = () => {
    const { organization } = useOrganization(); // Get active organization

    return (
        <div className="flex items-center px-4 gap-2  ">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher hidePersonal appearance={{
                    elements: {
                        rootBox: {
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '376px'
                        },
                        organizationSwitcherTrigger: {
                            padding: "6px",
                            width: "100%",
                            borderRadius: "8px",
                            border: "1px solid #E5E7EB",
                            justifyContent: 'space-between',
                            backgroundColor: 'white'
                        }
                    }
                }} />
            </div>
            {
                organization &&
                <InviteButton />
            }
            <UserButton />
        </div>
    )
}