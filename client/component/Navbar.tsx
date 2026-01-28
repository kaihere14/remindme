import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-20 p-5'>
        <div className="left flex items-end">
            <div className="logo rounded-full overflow-hidden ">
                <img src="favicon.webp" alt="icon"  height={40} width={40}/>
            </div>
            <div className='title'>
                <h1 className='text-2xl font-bold'><span className='text-zinc-200'>/</span> RemindMe</h1>
            </div>
        </div>
        <div className="right pr-5 flex items-center gap-2">
            
            <div className="Invite">
                <button className='bg-black px-8 py-2 rounded-md text-white cursor-pointer hover:bg-gray-800'>Invite</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar