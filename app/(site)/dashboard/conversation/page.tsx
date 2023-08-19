"use client"
import Heading from '@/components/Heading'
import React, { useEffect, useRef, useState } from 'react'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageSquare} from 'lucide-react'
import formSchema from './constants'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { on } from 'stream'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import {ChatCompletionRequestMessage} from 'openai'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import Empty from '@/components/Empty'
import UserAvatar from '@/components/UserAvatar'
import ChatAvatar from '@/components/ChatAvatar'
import { cn } from '@/lib/utils'
import { chatModel } from '../types.t'

const ConvPage = () => {
  const router = useRouter()
  const [generating, setGenerating] = useState(false)
  const [chat, setChat] = useState<chatModel[]>([]);
  const messagesRef = useRef(null);

    // Scroll to the bottom whenever messages change
    useEffect(() => {
      scrollToBottom();
    }, [chat]);
  
    // Function to scroll to the bottom of the messages container
    const scrollToBottom = () => {
      if (messagesRef.current) {
        // Ensure to have HTMLDivElement type annotation for `current`
        (messagesRef.current as HTMLDivElement).scrollTop = (messagesRef.current as HTMLDivElement).scrollHeight;
      }
    };

  // define form 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver : zodResolver(formSchema),
    defaultValues : {
      prompt : ""
    }
  })

  // define a submit handler
  const onSubmit = async (values : z.infer<typeof formSchema>)=>{
    setGenerating(true)
    try {
        setChat(prev => [...prev, {
          role: "boot",
          content: values.prompt
        }])
        const text = await axios.post("https://saas-ai.onrender.com/api/conversation",{
          prompt : values.prompt
        }).then(res => {
          setChat(prev => [...prev, {
            role: "user",
            content: res.data.data.content
          }])
          form.reset();
        }).catch(err => {
          console.log({err})
        })
      
    } catch (error) {
        console.log(error)
    } finally {
      router.refresh()
      setGenerating(false);
    }
  }
  return (
    <>
      <Heading 
        title='Conversation'
        desc = "Powerfull chat AI"
        icon={MessageSquare}
        iconColor='text-red-400'
        bgColor='bg-red-400/50'
      />
      {/* Form */}
      <section className='mt-6'>
        <Form {...form}>
          <form 
          className='w-full grid grid-cols-12 grid-rows-2 md:grid-row-1'
          onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              
              control={form.control}
              name='prompt'
              render={({field})=>(
                <FormItem  className="row-span-1 col-span-12 md:col-span-8">
                  <FormControl>
                    <Input 
                    placeholder = "How to calculate the TVA ?" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          <Button 
          disabled={generating}
          type="submit" className="row-span-1 my-2 col-span-12 md:col-span-4 md:mt-0 md:ml-2">
            {generating ? 'Generating ...' : 'Submit'}
          </Button>
          </form>
        </Form>
      </section>
      <div className='w-full h-full'>
      <div className="h-full row-span-5 overflow-auto w-full flex flex-col justify-start items-stretch">
          {chat.map((ch, key) => {
              return <div
                key={key}
                className={cn("m-1 rounded-md p-2 flex ", ch.role === "user" ? " bg-indigo-400" : "bg-indigo-400/50")}>
                {ch.role !== "user" ? <UserAvatar /> : <ChatAvatar />}
                <p className='pr-3 text-sm overflow-hidden leading-7'>
                  {ch?.content || ""}
                </p>
              </div>
            })}
            {generating && <Loading />}
      </div>
      </div>
    </>
  )
}

export default ConvPage
