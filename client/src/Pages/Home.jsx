import { useState } from "react";
import { Menu, BookOpen, ChevronDown } from "lucide-react";
import axios from "axios"

const Home = () => {
  const genrestype = [
    "Fiction",
    "Non-Fiction",
    "Fantasy",
    "Science Fiction",
    "Thriller",
    "Historical Fiction",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [isActive, setActive] = useState(null);
  const [loading ,setLodaing]=useState(false);

  const handleGenreSelect = (genre, idx) => {
    setSelectedGenre(genre);
    setActive(idx);
    setIsOpen(false); 
  };
  // post requests for filter options 
   const FilterRquest=async(genere)=>{
    console.log("The gener is ",genere)
       setLodaing(true);
       try{
         const request=await axios.post(`http://localhost:3000/api/v1/user/books-filter`,
          { name:genere},
          {  headers:{"Content-Type": "application/json", }}
         )
         
        const res=   await request.data;
        console.log(res);
      }catch(err){
        console.log("Error from the Forntend",err)
      }finally{
        setLodaing(false);
      }
   }
  return (
    <div className="w-full px-4 md:px-6 py-7">
      <div className="  flex flex-wrap justify-center md:justify-between items-center gap-4 px-4 md:px-8">
        <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-mycolor/10 rounded-md font-semibold text-gray-800">
          <Menu size={18} />
          All Categories
        </button>
        <div className="hidden   md:flex gap-2 flex-wrap">
          {genrestype.map((genre, idx) => (
            <button
              key={idx}
              onClick={() => {
                FilterRquest(genre);
                handleGenreSelect(genre, idx)
              }}
              className="relative px-3 py-1.5 font-medium transition-colors cursor-pointer"
            >
              <span
                className={`relative z-10 ${
                  isActive === idx ? "text-white" : "text-gray-600"
                }`}
              >
                {genre}
              </span>
              <div
                className={`absolute inset-0 rounded-md transition-all duration-300 ease-in-out ${
                  isActive === idx ? "bg-mycolor opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="md:hidden  w-full sm:w-96 flex justify-center">
          <div className="flex items-center gap-3 bg-gradient-to-r from-mycolor/20 to-purple-100 rounded-lg p-3 w-full">
            <BookOpen className="text-purple-600 w-5 h-5" />
            <h1 className="text-base font-semibold text-gray-800 hidden sm:block">
              Find your genres
            </h1>
            <div className="relative ml-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/50 rounded-lg font-semibold text-sm hover:bg-white/80 transition-all duration-200 min-w-[140px] justify-between"
              >
                <span className="text-gray-700">{selectedGenre}</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-600 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white/90 backdrop-blur-sm border border-white/50 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {genrestype.map((genre, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleGenreSelect(genre, idx)}
                      className="w-full px-4 py-2 text-left hover:bg-purple-100/50 transition-colors duration-150 text-sm font-medium text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 rounded-md bg-[rgb(218,245,255)] px-4 md:px-10 py-3">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="text-start space-y-3">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold text-gray-700">
                Enchanting designs <br />
                for the refined
              </h1>
              <p className="text-gray-500 font-medium">
                Fresh herbs, spices, and natural seasoning add flavor without extra
                calories or sodium. Try combinations like garlic, ginger.
              </p>
            </div>
            <button className="w-32 bg-mycolor rounded-md px-4 py-3 text-white font-semibold hover:bg-mycolor/90 transition-all duration-200">
              SHOP NOW
            </button>
          </div>
          <div className="flex justify-center items-center">
            <img
              src="book1.png"
              alt="Book"
              className="object-cover drop-shadow-[0_8px_12px_rgba(245,213,8,0.5)] w-auto sm:h-96 md:h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
