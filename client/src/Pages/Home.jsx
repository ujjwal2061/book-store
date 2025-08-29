import { useState } from "react";
import { BookOpen, ChevronDown ,Star,ShoppingCart, Heart, Download} from "lucide-react";
import axios from "axios"


import { useEffect } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Home = () => {
 const [loading ,setLoading]=useState(false);
 const [error ,setError]=useState(null);
  const bookss = [
    {
      id:1,
      bookname: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      image: "https://m.media-amazon.com/images/I/81BE7eeKzAL._SL1500_.jpg",
      description:
        "A classic personal finance book that challenges traditional views on money and investing.",
    },
    {
      id:2,
      bookname: "Atomic Habits",
      author: "James Clear",
      image: "https://m.media-amazon.com/images/I/91bYsX41DVL._SL1500_.jpg",
      description:
        "Learn how small daily habits compound into massive results over time.",
    },
    {
         id:3,
      bookname: "The Alchemist",
      author: "Paulo Coelho",
      image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
      description:
        "An inspiring tale about following your dreams and finding your personal legend.",
    },
     {
         id:3,
      bookname: "The Alchemist",
      author: "Paulo Coelho",
      image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
      description:
        "An inspiring tale about following your dreams and finding your personal legend.",
    },
  ];





 

  // post requests for filter options 
  useEffect(()=>{
    const fetchbooks=async()=>{
      setLoading(true);
      try{
        const request=await axios.post(`http://localhost:3000/api/v1/user/books-filter`,
          { name:selectedGenre},
          {  headers:{"Content-Type": "application/json", }}
        )
        const res=await request.data;
        setTopBooks(res.data.data);
      }catch(err){
        
        setError(err||"Someting went Wromg ")
      }finally{
        setLoading(false);
      }
    }
    fetchbooks()
  },[])

  return (
    <div className=" w-full justify-center flex ">
     <section className="max-w-7xl w-full px-2 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {bookss.map((book, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow  duration-200 rounded-2xl overflow-hidden"
              >
                <img
                  src={book.image}
                  alt={book.bookname}
                  className="object-cover -mt-6 w-full h-full"
                />
                <CardHeader className="">
                  <h3 className="text-lg font-semibold">{book.bookname}</h3>
                  <p className="text-sm ">By {book.author}</p>
                </CardHeader>
                <div className="px-3 pb-2 flex flex-col gap-2">
                  <p className="text-sm  line-clamp-2">{book.description}</p>
                   <Button className="cursor-pointer w-full" variant="secondary">
                    <Download size={18} /> Download Book
                   </Button>
                   <Link to={`/book/${book.id}`}  >
                    <Button className="cursor-pointer w-full" ><BookOpen   />Read Book</Button>
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
