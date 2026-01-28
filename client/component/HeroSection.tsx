
import { LandingButton } from './LandingButton'

const HeroTitle = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full px-4 md:px-6 mb-40 '>
        <h1 className='text-5xl font-bold'>Reminders, Done the Smart Way</h1>
        <p className='text-xl mt-5 text-gray-500'>Just say what you need. RemindMe handles the rest — no commands, no friction.</p>
        <LandingButton navigateLink="https://discord.com/oauth2/authorize?client_id=1465395715655209062&scope=bot%20applications.commands&permissions=0" variant="outline" content = "Add to Discord" hidden={false}/>
    </div>
    )
}

export default HeroTitle