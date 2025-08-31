import { useState, useEffect } from "react";
import { Loader, X, Upload, FileText } from "lucide-react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function BookStore() {
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [author, setAuthor] = useState("");
  const [bookname, setBookname] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const uploadBookpdf = async (file) => {
    if (!file) {
      toast.error("Please select a PDF file first");
      return;
    }
    try {
      setPdfUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_PORT}/api/v1/user/bookpdf`,
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      if (response.status === 200) {
        setPdfUrl(data.file?.url || data.link);
        toast.success("PDF uploaded successfully!");
        return data.file?.url || data.link;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload PDF");
    } finally {
      setPdfUploading(false);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    try {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_PORT}/api/v1/user/bookimage`,
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true,
        }
      );

      const data = response.data;
      if (response.status === 200) {
        toast.success("Image uploaded successfully!");
        return data.link;
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  const handleBookAdd = async (e) => {
    e.preventDefault();
    
    if (!bookname || !author) {
      toast.error("Please fill in the required fields");
      return;
    }

    try {
      setLoading(true);
      let image = null;
      let finalPdfUrl = pdfUrl;
      if (imageUrl) {
         const finalImageUrl = await uploadImageToCloudinary(imageUrl);
          image=finalImageUrl
      }
      if (pdfFile && !finalPdfUrl) {
        finalPdfUrl = await uploadBookpdf(pdfFile);
      }

      const bookData = {
        author,
        bookname,
        description,
        pdfUrl: finalPdfUrl,
        image: image,
      };
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_PORT}/api/v1/user/book-store`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data?.message || "Book added successfully!");
        setAuthor("");
        setBookname("");
        setDescription("");
        setPdfFile(null);
        setPdfUrl("");
        setImageUrl("");
        setImagePreview(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please select a valid PDF file");
        return;
      }
      setPdfFile(file);
      setPdfUrl("");
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

  const removePdf = () => {
    setPdfFile(null);
    setPdfUrl("");
  };

  return (
    <div className="flex justify-center items-start p-6">
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
                  required
                />
              </div>
              <div>
                <Label>Book Name *</Label>
                <Input
                  value={bookname}
                  onChange={(e) => setBookname(e.target.value)}
                  placeholder="Book name"
                  required
                />
              </div>
            </div>      
            <div>
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Book description..."
                rows={4}
              />
            </div>
            <div className="space-y-3">
              <Label>Book PDF <span className=" text-sm text-gray-700">(Less then 10 MB)</span></Label>
              {pdfFile && (
                <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-600" />
                    <span className="text-sm">{pdfFile.name}</span>
                    {pdfUrl && <span className="text-xs text-green-600">(Uploaded)</span>}
                  </div>
                  <button
                    type="button"
                    onClick={removePdf}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <Input 
                  type="file" 
                  accept="application/pdf"  
                  onChange={handlePdfChange}
                  disabled={pdfUploading}
                />
                <Button 
                  type="button"  
                  onClick={() => uploadBookpdf(pdfFile)}
                  disabled={!pdfFile || pdfUploading || !!pdfUrl}
                  variant="outline"
                >
                  {pdfUploading ? (
                    <>
                      <Loader className="animate-spin w-4 h-4 mr-2" />
                      Uploading...
                    </>
                  ) : (
                    "Upload PDF"
                  )}
                </Button>
              </div>
            </div>
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
                <label className="flex items-center justify-center gap-2 w-fit px-4 py-2 rounded-md bg-black/90 text-white cursor-pointer hover:bg-black">
                  {imageUploading ? (
                    <>
                      <Loader className="animate-spin w-4 h-4" /> Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
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
                disabled={loading || imageUploading || pdfUploading}
                className={cn(
                  "text-white",
                  (loading || imageUploading || pdfUploading) && "opacity-50"
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
          <p className="text-gray-400 hover:text-gray-700 text-sm">For pdf Compress <a href="https://pdf.pi7.org/compress-pdf-to-10mb" target="_blank" className="text-blue-500 hover:underline cursor-pointer">Check here</a></p>
        </CardContent>
      </Card>
    </div>
  );
}

