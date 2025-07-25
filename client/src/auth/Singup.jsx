import { Link } from "react-router"; 
import { useReducer } from "react";
import { LoaderIcon } from "lucide-react";
import axios from "axios"
import { useNavigate } from "react-router";

const Signup = () => {
  const navigation=useNavigate();

  const initValueOfSignup = {
    firstname: "",
    lastname:"",
    email: "",
    password: "",
    loading: false,
    error: null,
    fieldErrors:{},
  };


  const authSignupProcess = (state, action) => {
    switch (action.type) {
      case "SET_FIRSTNAME":
        return { ...state, firstname: action.payload };
        case "SET_LASTNAME":
        return { ...state, lastname: action.payload };
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
      case "SET_SIGNUP_START":
        return { ...state, loading: true, error: null };
        case "SET_SIGNUP_DONE":
        return { ...state, loading: false, error: null };
        case "SET_FIELD_ERRORS":
      return { ...state, fieldErrors: action.payload };
      case "SET_SIGNUP_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authSignupProcess, initValueOfSignup);


  const handleUsername = (e) => {
    dispatch({ type: "SET_FIRSTNAME", payload: e.target.value });
  };
  const lastUsername = (e) => {
    dispatch({ type: "SET_LASTNAME", payload: e.target.value });
  };
  const handleEmail = (e) => {
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
  };
  const handlePassword = (e) => {
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
  };

  const handleSignupForm = async(e) => {
    e.preventDefault();
    dispatch({ type: "SET_SIGNUP_START" });
    try {
      //api call 
      const  response=await axios.post("http://localhost:3000/api/v1/user/signup",
        {
          firstname:state.firstname,
          lastname:state.lastname,
          email:state.email,
          password:state.password 
        },{
          headers:{"Content-Type":"application/json" }
        }
      )
      const res= await response.data;
      state.firstname="";
      state.lastname="";
      state.email="";
      state.password="";
      navigation('/login')
      return res;
      
      
    } catch (err) {
      if(err.response?.data?.errors){
        const zodErro=err.response.data.errors;
        const Error={};
        zodErro.forEach(element => {
          const field=zodErro.path[0];
          Error[field]=zodErro.message;
        });
        dispatch({ type: "SET_FIELD_ERRORS", payload: errorMap });
      } 
      else{
        dispatch({ type: "SET_SIGNUP_FAIL", payload: err.message });
      }
    }finally{
        dispatch({type:'SET_SIGNUP_DONE'})
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-6 sm:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Start your story today.</h2>
        </div>

        <form onSubmit={handleSignupForm} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={state.firstname}
              onChange={handleUsername}
              placeholder="Enter your firstname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mycolor focus:border-mycolor transition-colors"
            />
            {state.fieldErrors.firstname && (
            <p className="text-red-500 text-sm mt-1">{state.fieldErrors.firstname}</p> )}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={state.lastname}
              onChange={lastUsername}
              placeholder="Enter your lastname"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mycolor focus:border-mycolor transition-colors"
            />
            {state.fieldErrors.lastname && (
            <p className="text-red-500 text-sm mt-1">{state.fieldErrors.lastname}</p> )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={state.email}
              onChange={handleEmail}
              placeholder="example@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1  focus:ring-mycolor focus:border-mycolor transition-colors"
            />
            {state.fieldErrors.email && (
            <p className="text-red-500 text-sm mt-1">{state.fieldErrors.email}</p> )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={state.password}
              onChange={handlePassword}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mycolor focus:border-mycolor transition-colors"
            />
            {state.fieldErrors.password && (
            <p className="text-red-500 text-sm mt-1">{state.fieldErrors.password}</p> )}
          </div>

          <button
            type="submit" 
            disabled={state.loading}
            className="w-full bg-mycolor text-white py-2 px-4 rounded-md cursor-pointer focus:outline-none focus:ring-2 transition-colors font-medium"
          >
            {state.loading ? (
              <span className="flex items-center gap-2 justify-center">
                <p>Creating account</p> <LoaderIcon className="animate-spin" />
              </span>
            ) : (
              <p>Signup</p>
            )}
          </button>

          {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
