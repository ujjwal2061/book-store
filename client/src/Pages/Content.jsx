import React from "react";

const Content = () => {
  return (
    <div className="px-2 md:px-4 lg:px-12 py-6 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="bg-gradient-to-br from-[#cccfff] to-[#b8bbff] rounded-2xl overflow-hidden  ">
          <div className="flex flex-col sm:flex-row items-center justify-between h-full min-h-[280px]">
            <div className="flex flex-col gap-4 px-6 py-8 flex-1 order-2 sm:order-1">
              <p className="font-light text-gray-700 text-sm tracking-wide uppercase">
                SALE UP TO 30%
              </p>
              <h1 className="font-bold text-gray-800 text-2xl sm:text-3xl lg:text-4xl leading-tight">
                Reading is The <br />
                Leading Authority
              </h1>
              <button className="bg-mycolor cursor-pointer text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors duration-200 w-fit shadow-md hover:shadow-lg">
                SHOP NOW
              </button>
            </div>
            <div className="flex items-center justify-center px-4 py-4 order-1 sm:order-2">
              <div className="w-40 h-32 sm:w-44 sm:h-36 rounded-lg flex items-center justify-center ">
                <img src="content_book.png" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#fe7b13] to-[#e66b00] rounded-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between h-full min-h-[280px]">
            <div className="flex flex-col gap-4 px-6 py-8 text-white flex-1 order-2 sm:order-1">
              <p className="font-light text-orange-100 text-sm tracking-wide uppercase">
                LIMITED TIME OFFER
              </p>
              <h1 className="font-bold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight">
                Learn Everything
                <br />
                In Our Books
              </h1>
              <button className="bg-white hover:bg-gray-100 cursor-pointer text-gray-800 text-sm font-semibold px-6 py-3 rounded-lg transition-colors duration-200 w-fit shadow-md hover:shadow-lg">
                SHOP NOW
              </button>
            </div>
            <div className="flex items-center justify-center px-4 py-4 order-1 sm:order-2">
              <div className="w-40 h-32 sm:w-44 sm:h-36 rounded-lg flex items-center justify-center ">
                <img src="second_book.png" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          <div className="w-full h-80 sm:h-80 md:h-96 ">
            <img
              src="background_image.png"
              className="object-cover h-full w-full"
              alt="Books background"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent flex items-center justify-center">
            <div className="text-center px-4 sm:px-6 py-6 sm:py-8 z-10">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 drop-shadow-2xl leading-tight">
                We Live And Breathe Books
              </h2>
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl lg:max-w-3xl mx-auto leading-relaxed drop-shadow-lg mb-6 opacity-95">
                Are you ready to make your book irresistible for readers?{" "}
                <br className="hidden sm:block" />
                Understand how to write a description for a book in 6 easy steps!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center ">
                <button className="w-full sm:w-auto rounded-lg bg-mycolor cursor-pointer  text-white font-semibold px-6 md:px-8 py-3">
                  Buy Now
                </button>
                <button className="w-full sm:w-auto rounded-lg  text-mycolor cursor-pointer  border-2 border-mycolor px-6 md:px-8 py-3 ">
                  Learn More
                </button>
              </div>
            </div>
          </div>
          <div className="absolute left-0 bottom-0 h-24 sm:h-32 md:h-40 w-full bg-gradient-to-t from-black/80 via-gray-900/60 to-transparent" />
          <div className="absolute left-1/4 sm:left-1/3 bottom-0 h-20 sm:h-32 md:h-40 w-32 sm:w-64 md:w-96 bg-gradient-to-tr from-black/50 via-gray-800/30 to-gray-700/20 blur-xl rounded-full transform -translate-x-1/2" />
          <div className="absolute right-1/4 sm:right-1/3 bottom-0 h-16 sm:h-28 md:h-36 w-28 sm:w-56 md:w-80 bg-gradient-to-tl from-gray-900/50 via-black/30 to-gray-800/20 blur-xl rounded-full transform translate-x-1/2" />
          <div className="absolute top-0 right-0 h-32 sm:h-40 md:h-48 w-32 sm:w-40 md:w-48 bg-gradient-to-bl from-gray-800/25 via-black/15 to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 h-28 sm:h-36 md:h-44 w-28 sm:w-36 md:w-44 bg-gradient-to-tr from-gray-900/25 via-black/15 to-transparent rounded-tr-full" />
        </div>
      </div>
      <div>
       <div className="px-6 py-8 flex flex-col gap-4">
  <h2 className="text-2xl font-semibold font-sans">Deals of the Week</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 
    <div className="flex flex-col  rounded-lg overflow-hidden shadow-md   bg-white">
      <img
        src="background_image.png"
        alt="Girl reading"
        className="w-full h-72 object-cover"
      />
      <div className="p-2 flex flex-col gap-2">
        <p className="font-semibold text-[14px]">
          Red shoes can make quite a statement! <br />
          They're bold, eye-catching.
        </p>
        <a href="#" className="hover:underline cursor-pointer text-gray-500 font-serif font-light" >
          Read more
        </a>
      </div>
    </div>


    <div className="flex flex-col rounded-lg r overflow-hidden  shadow-md  bg-white">
      <img
        src="book2.png" 
        alt="Girl reading"
        className="w-full h-72 object-cover"
      />
      <div className="p-2 flex flex-col gap-2">
        <p className="font-semibold text-[14px]">
         Books don't just tell stories—they share souls <br />
         Find yours between the lines.
        </p>
        <a
          href="#"
          className="hover:underline cursor-pointer text-gray-500 font-serif font-light"
        >
          Read more
        </a>
      </div>
    </div>


    <div className="flex flex-col rounded-lg  overflow-hidden shadow-md  bg-white">
      <img
        src="book3.png" 
        alt="Girl reading"
        className="w-full h-72 object-cover"
      />
      <div className="p-2 flex flex-col gap-2">
        <p className="font-semibold text-[14px]">
          She turned the page, and the world changed! <br />
          That’s the power of a great story
        </p>
        <a
          href="#"
          className="hover:underline cursor-pointer text-gray-500 font-serif font-light"
        >
          Read more
        </a>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Content;
