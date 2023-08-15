"use client"
import LandingHero from '@/components/LandingHero'
import LandingNavbar from '@/components/LandingNavbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {useAuth} from '@clerk/nextjs'
import {useRouter} from 'next/navigation'

export default function Home() {
  const {isSignedIn}  = useAuth();
  const router = useRouter()
  if(isSignedIn){
   router.push("/dashboard")
  }
  return (
    <div>
      {/* Nav Bar */}
      <LandingNavbar />
      <LandingHero />
    </div>
  )
}

{/* <Link href='/sign-in'>
  <Button >
    Sign In
  </Button>
</Link>
<Link href='/sign-up'>
  <Button >
    Register
  </Button>
</Link> */}