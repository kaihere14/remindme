import React from 'react'
import { LandingButton } from './LandingButton'
import Image from "next/image";


const Navbar = () => {
  return (
    <div className='bg-background-100 flex flex-row lg:justify-around justify-between items-center w-full h-20 md:py-4 py-2 px-4 md:px-6 sticky top-0'>
        <div className="left flex items-end">
            <div className="logo rounded-full overflow-hidden ">
                <Image
                    src="/favicon.webp"
                    alt="RemindMe logo"
                    width={40}
                    height={40}
                    priority
                    />
            </div>
            <div className='title'>
                <h1 className='text-2xl font-bold'><span className='text-zinc-200'>/</span> RemindMe</h1>
            </div>
        </div>
        <div className="right flex items-center">
            <div className="Invite">
                <LandingButton navigateLink="https://discord.com/oauth2/authorize?client_id=1465395715655209062&scope=bot%20applications.commands&permissions=0" variant="default" content = "Invite" hidden={true}/>
            </div>
        </div>
    </div>
  )
}

export default Navbar