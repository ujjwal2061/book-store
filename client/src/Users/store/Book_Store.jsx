import { Star, ShoppingCart, Heart,  } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export const BookStore = () => {
 

  const books = [
    {
      author: "George Orwell",
      bookname: "1984",
      title: "dystopia1984",
      description: "A novel about a dystopian future where Big Brother watches all.",
      image: "https://i.pinimg.com/1200x/24/9c/c4/249cc4deb76e9ec56712f7f1179bb315.jpg",
      price: "299",
      rating: 4.8,
      genre: "Dystopian",
    },
        {
      author: "George Orwell",
      bookname: "1984",
      title: "dystopia1984",
      description: "A novel about a dystopian future where Big Brother watches all.",
      image: "https://i.pinimg.com/1200x/24/9c/c4/249cc4deb76e9ec56712f7f1179bb315.jpg",
      price: "299",
      rating: 4.8,
      genre: "Dystopian",
    },
        {
      author: "George Orwell",
      bookname: "1984",
      title: "dystopia1984",
      description: "A novel about a dystopian future where Big Brother watches all.",
      image: "https://i.pinimg.com/1200x/24/9c/c4/249cc4deb76e9ec56712f7f1179bb315.jpg",
      price: "299",
      rating: 4.8,
      genre: "Dystopian",
    },
          {
      author: "George Orwell",
      bookname: "1984",
      title: "dystopia1984",
      description: "A novel about a dystopian future where Big Brother watches all.",
      image: "https://i.pinimg.com/1200x/24/9c/c4/249cc4deb76e9ec56712f7f1179bb315.jpg",
      price: "299",
      rating: 4.8,
      genre: "Dystopian",
    },
          {
      author: "George Orwell",
      bookname: "1984",
      title: "dystopia1984",
      description: "A novel about a dystopian future where Big Brother watches all.",
      image: "https://i.pinimg.com/1200x/24/9c/c4/249cc4deb76e9ec56712f7f1179bb315.jpg",
      price: "299",
      rating: 4.8,
      genre: "Dystopian",
    },
          {
      author: "George Orwell",
      bookname: "1984",
      title: "dystopia1984",
      description: "A novel about a dystopian future where Big Brother watches all.",
      image: "https://i.pinimg.com/1200x/24/9c/c4/249cc4deb76e9ec56712f7f1179bb315.jpg",
      price: "299",
      rating: 4.8,
      genre: "Dystopian",
    },
  ];



 

  return (
  <div className="min-h-screen  bg-neutral-200 px-2 py-5  md:px-16  md:py-12">
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 '>
      {books.map((book,idx)=>(
        <div  key={idx} className=' flex flex-col sm:max-w-md w-auto   sm:flex-row rounded-xl bg-neutral-50 hover:bg-neutral-300 transition-all duration-300  ease-in-out  cursor-pointer shadow px-1 py-2'>
        <div className='sm:w-52 w-full p-1 '>
          <img src="https://i.pinimg.com/1200x/24/9c/c4/249cc4deb76e9ec56712f7f1179bb315.jpg"  className='object-cover rounded-xl w-full h-full'/>
        </div>
            <div className="flex flex-col gap-3  px-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{book.bookname}</h1>
              <p className="text-sm text-gray-600 font-medium">
                By <span className="text-gray-900 font-semibold">{book.author}</span>
              </p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={18} fill="currentColor" className="text-yellow-400" />
              <span className="text-gray-800 text-sm font-semibold">{book.rating}</span>
              <span className="ml-2 text-xs bg-red-100 text-red-600 font-semibold px-2 py-0.5 rounded-full">-20% OFF</span>
            </div>
          <div className='flex flex-col gap-2  text-start'>
                 <div className="text-lg font-bold text-gray-900">
                ${book.price} <span className="line-through text-sm text-gray-400 ml-2">${book.originalPrice}</span>
               </div>
            <p className='text-sm leading-snug text-start tracking-tight font-semibold'>
             {book.description}
            </p>
            <div className='flex flex-col gap-2  w-full '>
              <button className="bg-mycolor cursor-pointer hover:bg-red-700 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <p className="text-sm text-gray-600 font-medium">
                Categories: <span className="text-gray-900 font-semibold">{book.genre}</span></p>
            </div>
          </div>
        </div>
       </div>
      ))}
    </div>
  </div>
  );
};