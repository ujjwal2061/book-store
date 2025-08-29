import { useState, useEffect } from "react";
import { Loader, X, Upload } from "lucide-react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import e from "cors";

function BookStore() {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [author, setAuthor] = useState("");
  const [bookname, setBookname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdf ,setPdf]=useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
const token = localStorage.getItem("authToken");
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // Upload Image
  const uploadImageToCloudinary = async (file) => {
    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/bookimage",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const data = response.data;
      if (response.status === 200) {
        return data.link;
      } else {
        toast.error("Uploading failed .Please try again")
      }
    } catch (error) {
     if(err){
         toast.error(err.response?.data?.message || "Faild to add book")
     }
    } finally {
      setImageUploading(false);
    }
  };

  // Handle Form Submit
  const handleBookAdd = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!bookname || !author) {
        setError("Please fill in the required fields");
        return;
      }
      let image = null;
      if (imageUrl) {
        image = await uploadImageToCloudinary(imageUrl);
      }
      const bookData = {
        author,
        bookname,
        title,
        description,
        pdf,
        image,
      };
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/book-store",
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      if (response.status === 200) {
        setSuccess(data?.message || "Book added successfully!");
        setBookname("");
        setTitle("");
        setDescription("");
        setImageUrl("");
        setImagePreview(null);
        return;
      }
    } catch (err) {
       if(err){
        toast.error(err.response?.data?.message || "Faild to add book")
       }else{
        toast.err("Something went wrong")
       }
    } finally {
      setLoading(false);
    }
  };

  // Handle Image Select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };
  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageUrl("");
    setImagePreview(null);
  };
  return (
    <div className=" flex justify-center items-start p-6">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add Book to Store
          </CardTitle>
        </CardHeader>
        <CardContent>
         
          <form onSubmit={handleBookAdd} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Author *</Label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                />
              </div>
              <div>
                <Label>Book Name *</Label>
                <Input
                  value={bookname}
                  onChange={(e) => setBookname(e.target.value)}
                  placeholder="Book name"
                />
              </div>
            </div>
            <div>
              <Label>Title *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Book Title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Book description..."
              />
            </div>
            <Label>Book pdf:</Label>
            <Input type="file" accept="application/pdf"  onChange={(e)=>setPdf(e.target.file[0])} />
            <Button>
              Uplaod
            </Button>
            <div className="space-y-2">
              <Label>Book Image</Label>
              {imagePreview && (
                <div className="relative w-32">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-40 rounded-md border shadow-sm object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <div>
                <label className="flex items-center justify-center gap-2 w-fit px-4 py-2 rounded-md bg-black/90 text-white cursor-pointer">
                  {imageUploading ? (
                    <>
                      <Loader className="animate-spin w-4 h-4" /> Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />{" "}
                      {imagePreview ? "Change Image" : "Upload Image"}
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={imageUploading}
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={loading || imageUploading}
                className={cn(
                  " text-white ",
                  (loading || imageUploading) && "opacity-50"
                )}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin w-4 h-4 mr-2" /> Adding...
                  </>
                ) : (
                  "Add to Store"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
export default BookStore;
