import { useContext, useState, useEffect } from "react";
import { Loader, X } from "lucide-react";
import axios from "axios";
import { AdminContext } from "../Admincontext/Admin-context";

export default function UpdateStorePage() {
  const { admin, token } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(null);
  const { firstName, lastName } = admin?.data || {};

  // Individual state for each form field
  const [author, setAuthor] = useState("");
  const [bookname, setBookname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Cloudinary upload function
  const uploadImageToCloudinary = async (file) => {
    try {
      setImageUploading(true);
      
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/bookimage", 
        formData,{
          headers:{
        Authorization: `Bearer ${token}`,
          },
          withCredentials:true

        }
      );
      const data=await response.data;
      if(response.status==200){
        return data.link
      }else{
       throw new Error ("Uplaoding Fail Please Try again") 
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  // Handle form submission
  const handleBookAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      // Validation
      if (!title || !author) {
        setError("Please fill in the required fields");
        return;
      }
       let image=null;
       if(imageUrl){
        image=await uploadImageToCloudinary(imageUrl)
       }
      // Prepare book data as JSON
      const bookData = {
        author: author,
        bookname: bookname,
        title: title,
        description: description,
        price: price,
        genre: genre,
        rating: rating,
        image: image,
      };
        console.log("Book Data",bookData)
      const response = await axios.post(
        "http://localhost:3000/api/v1/admin/storebooks",
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data=await response.data;
      if(response.status==200){
        return data.message
      }else{
        throw new Error ("Failed to add book. Please try again.")
      }
      resetForm();
      
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book. Please try again.");
      console.error("Error adding book:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Remove selected image
  const removeImage = () => {
    
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageUrl("");
    setImagePreview(null);
  
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Reset form function
  const resetForm = () => {
    // Cleanup the object URL to prevent memory leak
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setAuthor("");
    setBookname("");
    setTitle("");
    setDescription("");
    setPrice("");
    setGenre("");
    setRating("");
    setImageUrl("");
    setImagePreview(null);
  };

  if (!admin?.data) return <p>Loading admin info...</p>;

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Add Book to Store
        </h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleBookAdd} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <InputField
              label="Author Name *"
              name="author"
              placeholder={`${firstName} ${lastName}`}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <InputField
              label="Book Name"
              name="bookname"
              placeholder="Book Name"
              value={bookname}
              onChange={(e) => setBookname(e.target.value)}
            />
          </div>

          <InputField
            label="Title *"
            name="title"
            placeholder="Rich Dad Poor Dad"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextAreaField
            label="Description"
            name="description"
            placeholder="Book description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <InputField
              label="Price"
              name="price"
              placeholder="29.99"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <InputField
              label="Genre"
              name="genre"
              placeholder="Fiction, Non-fiction, etc."
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            <InputField
              label="Rating"
              name="rating"
              placeholder="4.5"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 ml-2">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Book Image</label>
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Book preview" 
                    className="w-32 h-40 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              
              {/* Upload Button */}
              <label className="font-semibold">
                <span className="bg-mycolor rounded-md px-2 text-white cursor-pointer py-1.5 inline-flex items-center gap-2 hover:bg-opacity-90 transition-colors">
                  {imageUploading ? (
                    <>
                      <Loader className="animate-spin w-4 h-4" />
                      Uploading...
                    </>
                  ) : (
                    imagePreview ? "Change Image" : "Upload Image"
                  )}
                </span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={imageUploading}
                  className="hidden"
                />
              </label>
              
              {/* Status Message */}
              {imageUrl && !imagePreview && (
                <p className="text-sm text-green-600">✓ Image selected successfully</p>
              )}
              {imagePreview && (
                <p className="text-sm text-blue-600">✓ Image ready for upload</p>
              )}
            </div>
          </div>

         
          
          <div className="flex justify-start sm:justify-end md:justify-end px-2 py-1.5">
            <button 
              type="submit"
              disabled={loading || imageUploading}
              className="rounded-md px-4 py-2 bg-mycolor text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin w-4 h-4" />
                  Adding...
                </>
              ) : (
                "Add to Store"
              )}
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
    <div className="flex flex-col overflow-hidden">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        rows={3}
        {...props}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-mycolor focus:outline-none resize-none"
      />
    </div>
  );
}