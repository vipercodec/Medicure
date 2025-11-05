"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AxiosError } from "axios";

interface Employee {
  id: number; // ✅ added for modal reference
  name: string;
  phone: string;
  email: string;
  department: string;
  experience: string;
  image: string;
}

interface ShowEmployeeProps {
  currentPage: string;
  items: Employee[];
  setItems: React.Dispatch<React.SetStateAction<Employee[]>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>; 
}

const ShowEmployee = ({ currentPage, items, setItems, message,setMessage }: ShowEmployeeProps) => {
  const [loading, setLoading] = useState(false);
   
  const handleDeleteDoctor = async(id: number)=>{
  setLoading(true)
  try{
     const response = await axios.delete('/api/dashboard/deleteEmployees',
    {params: { id,currentPage },})
   setMessage(response?.data?.message)
  }
    catch (err) {
    const error = err as AxiosError<{ message: string }>;
    setMessage(error.response?.data?.message || "Something went wrong");
  }
  setLoading(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("db call is made to fetch data...");
      try {
        setLoading(true);
        const response = await axios.get("/api/dashboard/getEmployees", {
          params: { currentPage },
        });
        setItems(response.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, message]);

  return (
    <>
      {/* ✅ Employee Table */}
      <section className="relative w-full h-full p-3 overflow-x-auto">
        {loading && (
          <div className="bg-white/90 absolute z-10 inset-0 flex items-center justify-center text-lg text-gray-600">
            Fetching information from database, please wait...
          </div>
        )}

        {items.length > 0 ? (
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Photo</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Experience</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Profile</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-2 py-2">
                    <div className="w-12 h-12 relative rounded-full overflow-hidden">
                      <Image
                        src={`https://res.cloudinary.com/dfxzsq5zj/image/upload/v1762148066/${item.image}.jpg`}
                        alt={item.name || "Employee"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.phone}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.department}</td>
                  <td className="px-4 py-2">{item.experience}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteDoctor(item?.id)} // ✅ opens full object
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && (
            <p className="text-center text-gray-600 text-lg mt-5">
              There are currently no {currentPage} for now!
            </p>
          )
        )}
      </section>
    </>
  );
};

export default ShowEmployee;