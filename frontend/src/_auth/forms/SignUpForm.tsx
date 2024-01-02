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
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    // @ts-ignore
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({ title: "Sign up failed. Please try again." });
    }

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
        <h2 className="mt-10 pt-0 text-2xl font-bold">Create your account</h2>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 flex w-full flex-col gap-5"
        >
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
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            {isCreatingUser ? (
              <div className="flex-center gap-2">Creating account...</div>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-small-regular mt-2 text-center text-dark-3">
            Already have an account?
            <Link to="/sign-in" className="ml-2 font-medium text-tertiary-500">
              Log in
            </Link>
          </p>
        </form>
        <Separator className="mb-7 mt-5 bg-light-4" />
        <OAuthButtons />
      </div>
    </Form>
  );
};

export default SignUpForm;
