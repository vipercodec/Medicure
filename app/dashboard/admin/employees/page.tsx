"use client"

import React from 'react';
import { admin_employees_items } from '@/data/Doctor';
import { useState } from 'react';
import AddEmployee from '@/ui/AddEmployee';
import FindEmployee from '@/ui/FindEmployee';
import ShowEmployee from '@/ui/ShowEmployee';
import { Employee } from '@/types/Employee';

const Page = () => {
const [currentPage,setCurrentPage] = useState('Doctors')  
const [message,setMessage] = useState<string>('')  
const [items, setItems] = useState<Employee[]>([]);

console.log("i am in employees main page and message is",message)

return (
<section className='min-h-screen w-full  flex  flex-col gap-5 p-3 relative'>

{/**for posts */}
<div className='w-full h-auto gap-5 flex flex-col md:flex-row'>
{admin_employees_items.map((item,index)=>{
    return(
<div onClick={()=>setCurrentPage(item.name)} key={index} className={`${item.name == currentPage ? 'bg-blue-900 text-white': 'bg-sky-50 text-gray-700'} w-full md:w-1/4 h-30 border border-gray-300  flex items-center justify-center rounded-sm shadow-sm hover:cursor-pointer hover:bg-blue-900 hover:text-white duration-700`}>
<div className='flex items-center justify-center gap-4'>
<p>{item.name}</p>
<p className='p-2 bg-blue-900 rounded-sm'>{item.icon}</p>
</div>
</div>
    )
})}
</div>
{/**for adding employees*/}
<AddEmployee currentPage = {currentPage} setMessage = {setMessage}/>
<FindEmployee currentPage = {currentPage} items={items} setItems={setItems}/>
<ShowEmployee currentPage = {currentPage} items={items} setItems={setItems} message={message} setMessage = {setMessage}/>

      {message && (
        <div className="fixed top-5 right-5 z-50 flex items-center justify-between bg-green-600 text-white px-6 py-3 rounded-md shadow-lg min-w-[250px]">
          <span className="mr-4">{message}</span>
          <button
            onClick={() => setMessage("")}
            className="text-white text-lg font-bold hover:text-gray-200 focus:outline-none"
          >
            X
          </button>
        </div>
      )}
</section>
  )
}

export default Page