import React from 'react'

const NavBar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
            <div className="logo text-2xl font-bold">
                <span className="text-green-600">&lt;</span>
                Pass
                <span className="text-green-600">/IN&gt;</span>
            </div>
            {/* <ul>
                <li className='flex gap-4'>
                    <a className='hover:font-bold' href="/">Home</a>
                    <a className='hover:font-bold' href="#">About</a>
                    <a className='hover:font-bold' href="#">Contact</a>
                </li>
            </ul> */}

            <button className='text-white bg-green-700 rounded-full my-5 flex justify-between items-center ring-2 ring-white'>

                <img className='invert w-10 p-1' src="/Icons/github.svg" alt="Github" />
                <span className='font-bold px-2'>Github</span>

            </button>

        </div>
    </nav>
  )
}

export default NavBar
