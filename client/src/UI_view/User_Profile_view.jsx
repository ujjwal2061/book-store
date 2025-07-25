export default function User_Profile_view({firstname,lastname,email}) {
  return (
    <div className=' '>
     <div>
        <div className="flex gap-1">
        <h3>{firstname}</h3>
        <h3>{lastname}</h3>
        </div>
         <span>{email}</span>
     </div>
    </div>
  )
}
