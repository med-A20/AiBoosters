"use client"
import Heading from '@/components/Heading'
import React, { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageSquare, Music2Icon } from 'lucide-react'
import formSchema from './constants'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { on } from 'stream'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ChatCompletionRequestMessage } from 'openai'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import Empty from '@/components/Empty'
import UserAvatar from '@/components/UserAvatar'
import ChatAvatar from '@/components/ChatAvatar'
import { cn } from '@/lib/utils'

const MusicPage = () => {
  const router = useRouter()
  const [generating, setGenerating] = useState(false)
  const [music, setMusic] = useState<string>();
  // define form 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  // define a submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setGenerating(true)
    try {

      setMusic(undefined)
      const res = await axios.post("/api/music", values)
      setMusic(res.data)
      console.log(res.data)
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
        title='Music'
        desc="Generate A Creative Music With Ai"
        icon={Music2Icon}
        iconColor='text-pink-400'
        bgColor='bg-pink-400/50'
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
              render={({ field }) => (
                <FormItem className="row-span-1 col-span-12 md:col-span-8">
                  <FormControl>
                    <Input
                      placeholder="Pioano ..." {...field} />
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
          {!music && !generating && <Empty text={"No music generated"} />}
          {music && <audio controls className='w-full'>
            <source src={music}></source>
          </audio>
          }
        </div>
      </div>
    </>
  )
}

export default MusicPage
