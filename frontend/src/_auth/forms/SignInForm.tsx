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
import { Separator } from "@/components/ui/separator.tsx";
import OAuthButtons from "@/_auth/forms/OAuthButtons.tsx";

export const SignInForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();
  const {
    mutateAsync: signInAccount,
    isPending: isSigningIn,
    isError,
  } = useSignInAccount();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
      toast({
        title: "Sign in failed. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex w-420 flex-col items-center justify-center gap-5 px-4">
      <div className="flex gap-1">
        <img src="/assets/logo.png" alt="logo" height={30} width={34} />
        <p className="ml-1 text-3xl font-medium text-black">TransPod</p>
      </div>
      <h2 className=" mb-2 pt-0 text-2xl font-bold">Welcome back!</h2>
      <OAuthButtons />
      <div className="my-3 flex w-full items-center justify-center gap-3">
        <Separator className="w-1/3 bg-light-4" />
        <p className="text-gray-500">or</p>
        <Separator className="w-1/3 bg-light-4" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isSigningIn ? "Signing in..." : isError ? "Sign In" : "Sign In"}
          </Button>
        </form>
      </Form>
      <Link
        to="/recover-password"
        className=" ml-2 self-center underline underline-offset-4"
      >
        Forgotten your password?
      </Link>
      <p className="text-center font-medium">
        Don't have an account?
        <Link to="/sign-up" className="ml-2 font-medium text-tertiary-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
