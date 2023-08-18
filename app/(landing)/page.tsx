"use client"
import LandingHero from '@/components/LandingHero'
import LandingNavbar from '@/components/LandingNavbar'
import {useAuth} from '@clerk/nextjs'
import {useRouter} from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const {isSignedIn}  = useAuth();
  const router = useRouter()
  useEffect(() => {
    if (isSignedIn) {
      router.push('/dashboard');
    }
  }, [isSignedIn]);
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