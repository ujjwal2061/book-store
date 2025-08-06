import axios from "axios"
import { useContext } from "react";
import { useState } from "react"
import { useEffect } from "react"
import { AdminContext } from "../Admincontext/Admin-context";
import { LoaderIcon, Star } from 'lucide-react';

export default function DashboardPage() {
  const [books,setBooks]=useState([{}]);
  const [loading ,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const {token} =useContext(AdminContext);

  useEffect(()=>{
    const adminBooks=async()=>{
      try{
        setLoading(true);
        const response=await axios.get( `http://localhost:3000/api/v1/admin/dashbord`,{
           headers:{
            Authorization:`Bearer ${token}`
         },
         withCredentials:true
        })
        const res=response.data?.data;
        setBooks(res);
      }catch(err){
        setError( "Something went Wrong  Please try again !")
      }finally{
        setLoading(false);
      }
    }
    adminBooks();
  },[])

 useEffect(()=>{
  const timeRemove=setTimeout(()=>{
       setError(null);
  },2000)
  return ()=>clearTimeout(timeRemove)
 },[error])

 const bookLenght=books.length==0;
 const deleteBook=async(bookId)=>{
  try{
   await axios.delete(`http://localhost:3000/api/v1/admin/book-delete/${bookId}`,{
   headers:{
   Authorization:`Bearer ${token}`
  },
   withCredentials:true
 })
  setBooks((prevBook)=>prevBook.filter(book=>book._id !== bookId))
}catch(err){
    console.log(err)
   setError("Flail to delete book ")
  }
 }
  return (
 <div className="min-h-screen px-5 py-4">
  {bookLenght && ((
    <div className="w-full flex justify-start px-3 py-2">
       <p className="font-semibold text-gray-600 ">Not yet add the book to store !</p>
    </div>
  ))}
  {error && (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
      {error}
    </div>
  )}

  {loading ? (
    <div>Loading ...</div>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {books.map((book, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 overflow-hidden"
        >
         
          <img
            src={book.image}
            alt={book.bookname}
            className="w-full h-64 object-cover"
          />

          {/* Book Details */}
          <div className="p-3 flex flex-col gap-1">
            <h2 className="text-sm font-semibold text-gray-900 truncate">{book.bookname}</h2>
            <p className="text-xs text-gray-600 truncate">By {book.author}</p>

            <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
              <Star size={14} fill="currentColor" />
              <span className="text-gray-800 font-medium">{book.rating}</span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-bold text-gray-900">${book.price}</span>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                className="bg-blue-500 cursor-pointer    hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-full transition"
              >
                Update
              </button>
              <button onClick={()=>deleteBook(book._id)} 
                className="bg-red-500 cursor-pointer  hover:bg-red-600 text-white text-xs px-3 py-1 rounded-full transition">
                 {loading ? 
                <>
                <span className="flex items-center gap-2 justify-center">
                <p>Delete</p>  <LoaderIcon className="animate-spin" />
               </span> 
                </> :
                <span>
                  Delete
                </span>
                }
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  )}