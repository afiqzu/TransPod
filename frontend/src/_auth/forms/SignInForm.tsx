import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast.ts";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SignInValidation } from "@/lib/validation";
import { Input } from "@/components/ui/input.tsx";
import { useUserContext } from "@/context/AuthContext.tsx";
import { useSignInAccount } from "@/lib/tanstack-query/queriesAndMutations.ts";

export const SignInForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();
  const {
    mutateAsync: signInAccount,
    isPending: isSigningIn,
    isSuccess,
  } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again." });
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "Sign in failed. Please try again." });
    }
  }

  return (
    <Form {...form}>
      <div className="flex w-420 flex-col items-center justify-center px-4">
        <div className="m-0 flex gap-1 p-0">
          <img src="/assets/logo.png" alt="logo" height={30} width={34} />
          <p className="m-0 ml-1 text-3xl font-medium text-black">TransPod</p>
        </div>
        <h2 className="mt-10 pt-0 text-2xl font-bold">Welcome back!</h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex w-full flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isSuccess || isSigningIn ? "Signing in..." : "Sign In"}
          </Button>
          <p className="text-small-regular mt-2 text-center text-dark-3">
            Don't have an account?
            <Link to="/sign-up" className="ml-2 font-medium text-tertiary-500">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
