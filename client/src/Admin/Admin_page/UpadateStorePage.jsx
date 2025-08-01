import { useContext, useState } from "react";
import { Usercontext } from "../../Users/context/userContext";
import { Loader } from "lucide-react";
export default function UpadateStorePage() {
  const { user } = useContext(Usercontext);
  const { firstname, lastname } = user.data;
  const [loading ,setLoading]=useState(false);
  const [error  ,setError]=useState("")
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState({
    author: "",
    bookname: "",
    title: "",
    description: "",
    image: "",
    price: "",
    genre: "",
    rating: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setForm((prev) => ({ ...prev, image: file }));
    }
  };
 const handleBookAdd=(e)=>{
 e.preventDefault()
 try{
  setLoading(true)
  console.log("All data ",form)
  setForm(" ")
}catch(err){
 setError(err || "Try again")
}finally{
  setLoading(false)
}
 }
  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Add Book to Store</h1>
        <form onSubmit={handleBookAdd} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <InputField
              label="Author Name"
              name="author"
              placeholder={`${firstname} ${lastname}`}
              value={form.author}
              onChange={handleForm}
            />
            <InputField
              label="Book Name"
              name="bookname"
              placeholder="Bookname"
              value={form.bookname}
              onChange={handleForm}
            />
          </div>

          <InputField
            label="Title"
            name="title"
            placeholder="Rich and Poor Dad"
            value={form.title}
            onChange={handleForm}
          />

          <TextAreaField
            label="Description"
            name="description"
            placeholder="Some description"
            value={form.description}
            onChange={handleForm}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <InputField
              label="Price"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleForm}
            />
            <InputField
              label="Genre"
              name="genre"
              placeholder="Genre"
              value={form.genre}
              onChange={handleForm}
            />
            <InputField
              label="Rating"
              name="rating"
              placeholder="Rating"
              value={form.rating}
              onChange={handleForm}
            />
          </div>

          <div className="flex flex-col gap-2 ml-2">
            <label className="font-semibold">
              <span className="bg-mycolor  rounded-md px-2 text-white cursor-pointer py-1.5">
              Upload Image  
              </span>
            <input
              type="file"
              name="image"
              onChange={handleImagePreview}
              className=" hidden file:px-4 file:py-2 file:rounded-md file:border-0  file:bg-mycolor file:text-white  cursor-pointer"
              />
              </label>
          </div>

          {preview && (
            <div className="w-full rounded-md overflow-hidden mt-4">
              <img src={preview} alt="Preview" className="object-cover w-full h-72" />
            </div>
          )}
          <div className=" flex  justify-start sm:justify-end md:justify-end px-2 py-1.5">
            <button  className="rounded-md px-2 py-1.5 bg-mycolor text-white cursor-pointer">
              {loading ?
              <>
              Adding
              <Loader className="animate-spin" />
              </>
              :
              <p>Addd to Store</p>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...props}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-mycolor focus:outline-none"
      />
    </div>
  );
}

function TextAreaField({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        rows={3}
        {...props}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-mycolor focus:outline-none resize-none"
      />
    </div>
  );
}
