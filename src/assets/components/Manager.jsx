import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

const Manager = () => {

    // declarations 
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    // passwords being taken from local storage into passwordArry if they are stored
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        let passwordArray
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    // logic to show list of passwords
    const showPassword = () => {

        if (ref.current.src.includes("/icons/eyecross.png")) {
            ref.current.src = "/icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "/icons/eyecross.png"
            passwordRef.current.type = "text"
        }
    }

    // logic to save password in localstorage when add password button is clicked
    const savePassword = () => {
        if (form.site.length>3 && form.username.length>3 && form.password.length>3) {
            
            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            console.log([...passwordArray, form]);
            toast('Password Saved!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                
            });
        }
        else{
            toast('Error!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                
            });
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you Really want to delete this Password")
        if (c) {
            toast('Password Deleted!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            
        });
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }
    }

    const editPassword = (id) => {

        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }

    // logic to copy text and show a toast
    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            
        });
        navigator.clipboard.writeText(text)
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            {/* html for toast */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"  
            />


            {/* background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="p-2 mycontainer min-h-[88.2vh]">

                {/* top heading */}
                <h1 className="logo text-2xl font-bold text-center">
                    <span className="text-green-600">&lt;</span>
                    Pass
                    <span className="text-green-600">/IN&gt;</span>
                </h1>
                <p className='text-green-600 text-center text-lg'>Password Manager</p>

                {/* input field */}
                <div className="text-black flex flex-col items-center p-4 gap-5">

                    {/* site name */}
                    <input value={form.site} onChange={handleChange} placeholder='Enter the Website URL' className='rounded-full border w-full border-green-700 p-4 py-1' type="text" name="site" id="site" />

                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">

                        {/* username */}
                        <input value={form.username} onChange={handleChange} placeholder='Enter UserName' className='rounded-full border w-full border-green-700 p-4 py-1' type="text" name="username" id="username" />

                        {/* password with show password button */}
                        <div className="relative">
                            <input type='password' ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border w-full border-green-700 p-4 py-1' name="password" id="password" />
                            <span className='absolute right-1 top-1 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src="/icons/eye.png" alt="eye" />
                            </span>
                        </div>

                    </div>

                    {/* Save password button */}
                    <button onClick={savePassword} className='flex items-center justify-center gap-2 bg-green-400 hover:bg-green-300 rounded-full border-2 border-green-900 px-8 py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>
                        Save Password
                    </button>

                </div>

                {/* password list */}
                <div className='passwords'>
                    <h2 className='font-bold text-2xl py-4'>My Passwords</h2>

                    {/* check to see if passwords are there in local storage and then displaying it */}
                    {passwordArray.length == 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">

                            {/* table headers */}
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Sites</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>

                                {passwordArray.map((item, index) => {

                                    return <tr key={index}>
                                        
                                        {/* site name */}
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center lordiconcopy' onClick={() => { copyText(item.site) }}>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='size-7 cursor-pointer px-1'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        {/* username */}
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center lordiconcopy' onClick={() => { copyText(item.username) }}>
                                                {item.username}
                                                <div className='size-7 cursor-pointer px-1'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        {/* password */}
                                        <td className='py-2 border border-white text-center'>
                                            <div className='flex items-center justify-center lordiconcopy' onClick={() => { copyText(item.password) }}>
                                                {item.password}
                                                <div className='size-7 cursor-pointer px-1'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        {/* actions */}
                                        <td className='py-2 border border-white text-center'>

                                            {/* edit button */}
                                            <span className='mx-2 cursor-pointer' onClick={() => { editPassword(item.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </span>

                                            {/* delete button */}
                                            <span className='mx-2 cursor-pointer' onClick={() => { deletePassword(item.id)}}>
                                                <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover" >
                                                </lord-icon>
                                            </span>
                                        </td>

                                    </tr>

                                })
                                }

                            </tbody>
                        </table>}

                </div>

            </div>
        </>
    )
}

export default Manager
