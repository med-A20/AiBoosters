"use client"
import Heading from '@/components/Heading'
import React, { useState } from 'react'
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

const page = () => {
  const router = useRouter()
  const [generating, setGenerating] = useState(false)
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
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

        const userMessage : ChatCompletionRequestMessage = {
          role : 'user',
          content : values.prompt
        }
        const newMessages = [...messages, userMessage]

        const text = await axios.post("/api/conversation",{
          prompt : newMessages
        }).then(res => {
          setMessages(prev => [...prev, userMessage, res.data])
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
      <div className="h-full row-span-5 overflow-auto w-full flex flex-col justify-start items-center">
        {generating && <Loading />}
        {messages.length === 0 && !generating ? <Empty text={"No Conversation started"} /> :
        messages.map(message => {
          return <div className={cn('my-2 w-full bg-gray-4 flex flex-row justify-start items-start p-1 rounded-md h-full overflow-auto', message.role === "user" ? "bg-violet-400" : "bg-violet-200")}>
            {message.role === "user" ? <UserAvatar /> : <ChatAvatar />}
            <p className={cn("m-1 ",message.role === "user" ? 'text-xl font-medium' : 'text-xl font-light italic')}>{message.content}</p>
          </div>
        })
        
        }
      </div>
      </div>
    </>
  )
}

export default page
