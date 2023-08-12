"use client"
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card'
import React from 'react'
import { MessageSquare, ImageIcon, Music2Icon, VideoIcon, CodeIcon } from "lucide-react"
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const tools = [
    {
      label: "Text Generation",
      href: "/dashboard/conversation",
      icon: MessageSquare,
      color: "text-red-400",
      bgcolor: "bg-red-400/40",
    },
    {
      label: "Image Generation",
      href: "/dashboard/image",
      icon: ImageIcon,
      color: "text-slate-700",
      bgcolor: "bg-slate-700/40",
    },
    {
      label: "Video Generation",
      href: "/dashboard/video",
      icon: VideoIcon,
      color: "text-cyan-400",
      bgcolor: "bg-cyan-400/40",
    },
    {
      label: "Music Generation",
      href: "/dashboard/music",
      icon: Music2Icon,
      color: "text-pink-400",
      bgcolor: "bg-pink-400/40",
    },
    {
      label: "Code Generation",
      href: "/dashboard/code",
      icon: CodeIcon,
      color: "text-orange-400",
      bgcolor: "bg-orange-400/40",
    },
  ]
  return (
    <section className='px-2'>
      <h2 className='text-2xl font-bold text-center pt-4'>Explore the power of AI tools</h2>
      <p className='text-muted-foreground text-sm italic text-center p-7'>Welcome to AIBoosters, your gateway to the future of business optimization and growth. We are thrilled to present our cutting-edge AI-powered services designed to revolutionize your company's performance and take you to new heights. With AIBoosters by your side, the possibilities are limitless, and the results are extraordinary.</p>

      <article className='w-full m-auto flex flex-row justify-around items-center flex-wrap gap-y-6'>
        {tools.map((tool) => {
          return <Card 
          onClick={()=>{
            router.push(tool.href)
          }}
          className={cn('w-[250px] flex flex-col justify-between items-center p-4 cursor-pointer', ` hover:shadow-lg hover:shadow-[${tool.bgcolor}]`)}>
            <Button className={cn(tool.bgcolor)}>
              <tool.icon className={cn(tool.color)} />
            </Button>
            <CardTitle className='my-3 text-xl'>
              {tool.label}
            </CardTitle>
          </Card>
        })}
      </article>
    </section>
  )
}

export default page