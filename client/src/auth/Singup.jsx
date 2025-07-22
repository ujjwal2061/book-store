import { Link } from "react-router"; 
import { useReducer } from "react";
import { LoaderIcon } from "lucide-react";

const Signup = () => {
  const initValueOfSignup = {
    username: "",
    email: "",
    password: "",
    loading: false,
    error: null,
  };


  const authSignupProcess = (state, action) => {
    switch (action.type) {
      case "SET_USERNAME":
        return { ...state, username: action.payload };
      case "SET_EMAIL":
        return { ...state, email: action.payload };
      case "SET_PASSWORD":
        return { ...state, password: action.payload };
      case "SET_SIGNUP_START":
        return { ...state, loading: true, error: null };
        case "SET_SIGNUP_DONE":
        return { ...state, loading: false, error: null };
      case "SET_SIGNUP_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(authSignupProcess, initValueOfSignup);

 
  const handleUsername = (e) => {
    dispatch({ type: "SET_USERNAME", payload: e.target.value });
  };
  const handleEmail = (e) => {
    dispatch({ type: "SET_EMAIL", payload: e.target.value });
  };
  const handlePassword = (e) => {
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
  };

  const handleSignupForm = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_SIGNUP_START" });
    try {
      console.log("Username:", state.username);
      console.log("Email:", state.email);
      console.log("Password:", state.password);
    } catch (err) {
      dispatch({ type: "SET_SIGNUP_FAIL", payload: err.message });
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={state.username}
              onChange={handleUsername}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-mycolor focus:border-mycolor transition-colors"
            />
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
