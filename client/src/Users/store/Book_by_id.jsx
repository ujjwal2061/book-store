import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export default function Book_by_id() {
  const { id } = useParams();
  const [book, setBook] = useState({});
 const [pdfText, setPdfText] = useState("Loading PDF text...");

  useEffect(() => {
    const fetchbookbyId=async()=>{
        try{
       const res= await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/api/v1/user/books/${id}`)
        const data= res.data.data;
        setBook(data);
          const pdfRes = await axios.get(data.pdfUrl, { responseType: "arraybuffer" });

        // Load PDF
        const pdf = await pdfjsLib.getDocument({ data: pdfRes.data }).promise;

        let fullText = "";
        for (let pageNum = 15; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n\n\n";
        }

        setPdfText(fullText || "No text found in PDF.");
        }catch(error){
             setPdfText("Error loading PDF text.");
         console.error(error);
        }
    }      
      fetchbookbyId();
  }, [id]);

  if (!book) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-lg font-semibold">
        Loading book <LoaderIcon  className="animate-spin"/>
      </div>
    );
  }

  return (
    <div className=" w-full border-2 p-2 ">
        <div className="max-w-7xl w-full mx-auto flex gap-2 ">
      <div className=" flex-col items-start  hidden md:flex bg-slate-200 shadow rounded-2xl">
        <img
          src={book.image}
          alt={book.bookname}
          className="w-72 h-[400px] object-cover rounded-t-xl shadow-lg"
          />
        <h1 className="mt-4 text-base font-semibold px-1 ">{book.bookname}</h1>
        <p className="text-gray-700 text-sm mt-1 px-2 ">By {book.author}</p>
      </div>
      <div className=" w-full bg-gray-50 border rounded-xl p-4 shadow-inner">
        <h2 className="text-lg font-semibold mb-3">Book Content</h2>
        <div className="h-[400px] overflow-y-scroll text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
        {pdfText}
        </div>
          </div>
      </div>
    </div>
  );
}
