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
  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

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
      <div className="w-420 px-4 flex justify-center items-center flex-col">
        <div className="flex gap-1 m-0 p-0">
          <img src="/assets/logo.png" alt="logo" height={30} width={34} />
          <p className="text-3xl font-medium text-black m-0 ml-1">TransPod</p>
        </div>
        <h2 className="pt-0 font-bold text-2xl mt-10">Welcome back!</h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
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
            {isSigningIn ? (
              <div className="flex-center gap-2">Signing in...</div>
            ) : (
              "Sign in"
            )}
          </Button>
          <p className="text-small-regular text-dark-3 text-center mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-tertiary-500 font-medium ml-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
