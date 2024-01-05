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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast.ts";
import { useForm } from "react-hook-form";
import { SignUpValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext.tsx";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/tanstack-query/queriesAndMutations.ts";
import { Separator } from "@/components/ui/separator.tsx";
import OAuthButtons from "@/_auth/forms/OAuthButtons.tsx";

export const SignUpForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({ title: "Sign up failed. Please try again." });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({ title: "Sign in failed. Please try again.", variant: 'destructive' });
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      toast({ title: "Sign in failed. Please try again.", variant: 'destructive' });
    }
  }

  return (
    <div className="flex w-420 flex-col items-center justify-center gap-5 px-4">
      <div className="flex gap-1">
        <img src="/assets/logo.png" alt="logo" height={30} width={34} />
        <p className="ml-1 text-3xl font-medium text-black">TransPod</p>
      </div>
      <h2 className="mb-2 text-2xl font-bold">Create your account</h2>
      <OAuthButtons />
      <div className="mt-4 mb-1 flex w-full items-center justify-center gap-3">
        <Separator className="w-1/3 bg-light-4" />
        <p className="text-gray-500">or</p>
        <Separator className="w-1/3 bg-light-4" />
      </div>
      <Form {...form}>
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className="flex-center gap-2">Creating account...</div>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </Form>
      <p className="font-medium mt-2 text-center text-dark-3">
        Already have an account?
        <Link to="/sign-in" className="ml-2 font-medium text-tertiary-500">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
