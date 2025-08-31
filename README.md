# Perlrgo

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/API-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-06B6D4?logo=tailwindcss)
![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?logo=cloudinary)

A full-stack web app where users can **upload, read, and download books**.  
Each book includes a **PDF file** and a **cover image**, creating a personal digital library.  

---

## 🚀 Features
- 🔐 User authentication with **JWT** (secure login/register)  
- 📤 Upload **book PDFs** + **cover images** (stored on Cloudinary)  
- 📖 Read books online (embedded PDF viewer)  
- ⬇️ Download books in PDF format  
- 🎨 Responsive design with **TailwindCSS** & **shadcn/ui**  
- ✅ Form validation using **Zod**  
- ⚡ Fast backend built with **Express.js** & **MongoDB**  

---

## 🛠️ Tech Stack
**Frontend**  
- ⚛️ React  
- 🎨 TailwindCSS  
- 🧩 shadcn/ui  
- 🛡️ Zod  

**Backend**  
- 🟢 Node.js  
- 🚏 Express.js  
- 🍃 MongoDB (Mongoose ORM)  
- 🔑 JWT  

**Cloud Services**  
- ☁️ Cloudinary (File/Image Storage)  

---

## 📂 Project Structure
perlrgo

│── client/ # React frontend

│── server/ # Express backend

│── README.md

``` bash
git clone https://github.com/your-username/book-haven.git
cd perlrgo

```
2️⃣ Install dependencies

Frontend
```
cd client
npm install
```
Backend
```
cd server
npm install
```
3️⃣ Setup Environment Variables
```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```