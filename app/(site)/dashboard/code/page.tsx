"use client"
import Heading from '@/components/Heading'
import React, { useState } from 'react'
import { CodeIcon } from 'lucide-react'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import formSchema from '../conversation/constants'
import axios from 'axios'
import Loading from '@/components/Loading'
import Empty from '@/components/Empty'
import UserAvatar from '@/components/UserAvatar'
import ChatAvatar from '@/components/ChatAvatar'
import { cn } from '@/lib/utils'
import { ChatCompletionRequestMessage } from 'openai'
import ReactMarkdown from "react-markdown"

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

        const text = await axios.post("/api/code",{
          prompt : newMessages
        }).then(res => {
          setMessages(prev => [userMessage, res.data, ...prev])
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
    <div className=''>
      <Heading 
        title='Code Generator'
        desc='Generate an efficient code'
        icon={CodeIcon}
        bgColor='bg-orange-400'
        iconColor='bg-orange-400/40'
      />
      {/* prompt */}
      <div className='h-[70vh] grid grid-rows-6'>
        {/* response */}
        <div className='row-span-5 overflow-y-auto'>
        <div className="h-full row-span-5 overflow-auto w-full flex flex-col justify-start items-center">
          {generating && <Loading />}
          {messages.length === 0 && !generating ? <Empty text={"No code generated"} /> :
          messages.map(message => {
            return <div className={cn('my-2 w-full text-xl font-medium  flex flex-row justify-start items-start p-1 rounded-md ', message.role === "user" ? "bg-violet-400" : "bg-violet-200")}>
              {message.role === "user" ? <UserAvatar /> : <ChatAvatar />}
              <ReactMarkdown components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    )
                  }} className="text-sm overflow-hidden leading-7">
                    {message.content || ""}
                  </ReactMarkdown>
            </div>
          })
          
          }
        </div>
        </div>
      {/* Form */}
        <section className='mt-6 row-span-1'>
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
      </div>
    </div>
  )
}

export default page