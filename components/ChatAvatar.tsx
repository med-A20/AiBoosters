import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const ChatAvatar = () => {
  return (
    <Avatar className="w-8 h-8 m-3">
            <AvatarImage src={"/logo.png"}/>
            <AvatarFallback>
                AI
            </AvatarFallback>
        </Avatar>
  )
}

export default ChatAvatar