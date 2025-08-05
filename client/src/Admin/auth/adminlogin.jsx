
import { Link ,useNavigate} from "react-router";
import { useReducer } from "react";
import { LoaderIcon } from "lucide-react";
import axios from "axios";

// during first redner initvalue of the form 

const AdminLogin = () => {
    // during first redner initvalue of the form 
const initValue={
    email:"",
    password:"",
    loading:false,
    error:null,
} 
 const route=useNavigate();
//  function 
const authProcess=(state ,action)=>{
    switch(action.type){
        case 'SET_EMAIL' :
            return {...state ,email:action.payload}
        case 'SET_PASSWORD':
            return {...state ,password:action.payload}    
        case 'LOGIN_START' :
            return {...state ,loading:true ,error:null}
        case 'LOGIN_FAIL':
            return {...state ,loading:false ,error:action.payload}
         default:
            return state;
        } 
}
  const [state ,dispatch]=useReducer( authProcess ,initValue)
   // function for the handling the action type
   const hadnleEmail=(e)=>{
    dispatch({type:'SET_EMAIL' ,payload:e.target.value})
   }
  const hadnlePassword=(e)=>{
    dispatch({type:'SET_PASSWORD' ,payload:e.target.value})
   }

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
     try{
    const  response=await axios.post("http://localhost:3000/api/v1/admin/admin-login",

      {
        email:state.email,
        password:state.password,
      },
      {
        headers:{
          "Content-Type":"application/json"     
          },
      }
    )
    const res=await response.data;
    if(res.status){
         localStorage.setItem("adminToken",res.token);
          return  route('/admin-dashbord')
      }
    state.email="";
    state.password="";
    return res;
     }catch(err){
        dispatch({type:"LOGIN_FAIL" ,payload:err.message})
     }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-6 sm:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        </div>
        <form  onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={state.email}
              onChange={hadnleEmail}
              placeholder="example@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1  focus:ring-mycolor focus:border-mycolor transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={state.password}
              onChange={hadnlePassword}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mycolor focus:border-mycolor transition-colors"
            />
          </div>

          <button
             type="subbmit" disabled={state.loading}
            className="w-full bg-mycolor text-white py-2 px-4 rounded-md cursor-pointer focus:outline-none focus:ring-2  transition-colors font-medium">
            {state.loading ? 
              <span className="flex items-center gap-2 justify-center">
                <p>Login</p>  <LoaderIcon className="animate-spin" />
               </span> 
                :<p>Login</p>}
          </button>
           {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 cursor-pointer  hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
          <p className="text-sm">
            <Link
              to="/restpassword"
              className=" cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
