import { useState } from "react";

export const StoreForm = () => {
    const [form ,setForm]=useState({
        author:"",
        bookname:"",
        title: "",
        description: "",
        image: "",
        price: "",
        genre: "",

    })
    const handleForm=(e)=>{
      e.preventDefault();
        setForm({...form ,[e.target.name]:e.target.value});
    }
  return (
    <div className="bg-pink-200 min-h-screen flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-md sm:max-w-3xl  lg:max-w-4xl xl:max-w-6xl  border-gray-300 bg-white p-6 rounded-lg shadow-md">
       <div>
        <h1></h1>
       </div>
       <from>
         <div>
            <label>Author:
             <input  type="text"  name="author" value={form.author} onChange={handleForm} placeholder=""  />

            </label>
         </div>
       </from>
      </div>
    </div>
  );
};
