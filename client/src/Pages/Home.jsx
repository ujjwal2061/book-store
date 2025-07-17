import { Link } from "react-router";
const Home=()=>{
    return(
        <div className="border-2 p-2 ">
            <nav className="w-full border-2 flex  gap-2  items-center justify-between  px-16 ">
                <div>
                    <h1>Hello</h1>
                </div>
                <div className="flex  font-sans font-semibold gap-2  items-center">
                    <button className="rounded-md border-2 px-4  "><Link>Login</Link></button>
                    <button className="rounded-md border-2 px-4 bg-"><Link>Singup</Link></button>
                </div>
            </nav>
        </div>
    )
}
export default Home;