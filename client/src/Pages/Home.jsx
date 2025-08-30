import { useState } from "react";
import { BookOpen, ChevronDown ,Star,ShoppingCart, Heart, Download} from "lucide-react";
import axios from "axios"


import { useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Home = () => {
  const [books ,setBooks]=useState([]);
 const [loading ,setLoading]=useState(false);
 const [error ,setError]=useState(null);
  // post requests for filter options 
  useEffect(()=>{
    const fetchbooks=async()=>{
      setLoading(true);
      try{
        const request=await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/api/v1/user/books`,
          {  headers:{"Content-Type": "application/json", }}
        )
        const res=await request.data;
        setBooks(res.data);
      }catch(err){
        setError(err||"Someting went Wromg ")
      }finally{
        setLoading(false);
      }
    }
    fetchbooks()
  },[])

  return (
   <div className="w-full justify-center flex">
  <section className="max-w-7xl w-full px-2 mx-auto">
<div className="w-full text-center py-16  mb-10">
  <h1 className="text-4xl md:text-7xl font-extrabold  text-gray-900 dark:text-white">
     The Open Book Shelf
  </h1>
  <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
    Discover, read, and share stories with the world.  
    Explore a growing library, <span className="font-semibold">download your favorites</span>,  
    or <span className="font-semibold">upload your own books</span> to inspire others.
  </p>

  <div className="mt-8 flex justify-center gap-4">
    <Link to="/books">
      <Button size="lg" className="px-6 py-3 text-base font-semibold">
        Read Books
      </Button>
    </Link>
  </div>
</div>


    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book, index) => (
        <Card
          key={index}
          className="hover:shadow-lg transition-shadow duration-200 rounded-xl overflow-hidden h-auto"
        >
          <img
            src={book.image}
            alt={book.bookname}
            className="object-cover w-full max-h-[410px] -mt-6"  
          />
          
          <CardHeader className="px-2">
            <h3 className="text-base font-semibold line-clamp-1">
              {book.bookname}
            </h3>
            <p className="text-xs">By {book.author}</p>
          </CardHeader>
          
          <div className="px-2 flex flex-col gap-2">
            <p className="text-xs line-clamp-2">
              {book.description}
            </p>

            <Button className="cursor-pointer  w-full text-sm dark:bg-gray-900" variant="secondary">
             <a href={book.pdfUrl} download={`${book.bookname}.pdf`}  target="_blank" className="flex  items-center gap-2 ">
             <Download size={16} /> Download
              </a> 
            </Button>

            <Link to={`/book/${book._id}`}>
              <Button className="cursor-pointer w-full text-sm">
                <BookOpen size={16} /> Read
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  </section>
</div>
  );
};

export default Home;
