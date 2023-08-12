import LandingHero from '@/components/LandingHero'
import LandingNavbar from '@/components/LandingNavbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
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