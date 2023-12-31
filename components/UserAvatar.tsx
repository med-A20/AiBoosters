import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {useUser} from "@clerk/nextjs"


const UserAvatar = () => {
    const {user} = useUser()
    return (
        <Avatar className="w-8 h-8 m-1">
            <AvatarImage src={user?.profileImageUrl}/>
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar