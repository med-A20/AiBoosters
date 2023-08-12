"use client"
import Heading from '@/components/Heading'
import React, { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { VideoIcon } from 'lucide-react'
import formSchema from './constants'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import Empty from '@/components/Empty'

const page = () => {
  const router = useRouter()
  const [generating, setGenerating] = useState(false)
  const [video, setVideo] = useState<string>();
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

      setVideo(undefined)
      const res = await axios.post("/api/video", values)
      setVideo(res.data[0])
      console.log(res.data[0])
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
        title='Video'
        desc="Generate A Creative Video With Ai"
        icon={VideoIcon}
        iconColor='text-cyan-400'
        bgColor='bg-cyan-400/50'
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
          {!video && !generating && <Empty text="No video generated" />}
          {video && <video controls className='w-full aspect-video'>
            <source src={video}/>
          </video>
          }
        </div>
      </div>
    </>
  )
}

export default page
