import { Link, useNavigate } from "react-router";
import { LoaderIcon } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// ✅ Zod schema for validation
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Login = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/api/v1/user/login`, values, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("authToken", res.data.token); 
        navigate("/");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed!";
      toast.error(errorMsg);
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-6 sm:p-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  Logging in <LoaderIcon className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
          <p className="text-sm">
            <Link
              to="/resetpassword"
              className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
