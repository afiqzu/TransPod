import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator.tsx";
import OAuthButtons from "@/_auth/forms/OAuthButtons.tsx";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EmailValidation } from "@/lib/validation";
import { toast } from "@/components/ui/use-toast.ts";
import { useCreateRecovery } from "@/lib/tanstack-query/queriesAndMutations.ts";

const RecoverPassword = () => {
  const { mutate, isPending } = useCreateRecovery();

  const form = useForm<z.infer<typeof EmailValidation>>({
    resolver: zodResolver(EmailValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof EmailValidation>) => {
    mutate(values.email, {
      onSuccess: () => {
        toast({
          title: "Recovery email has been sent! Please check your inbox.",
        });
      },
      onError: () => {
        toast({
          title: "An error occurred. Please try again later",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <div className="flex w-420 flex-col items-center justify-center px-4">
          <div className="flex gap-1">
            <img src="/assets/logo.png" alt="logo" height={30} width={34} />
            <p className="ml-1 text-3xl font-medium text-black">TransPod</p>
          </div>
          <h2 className="mt-5 text-2xl font-bold">Trouble with logging in?</h2>
          <p className="mt-3 text-center">
            Enter your email address and we'll send you a link to get back into
            your account.
          </p>
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

            <Button
              type="submit"
              disabled={isPending}
              className="shad-button_primary"
            >
              {isPending ? "Sending..." : "Send Recovery Email"}
            </Button>

            <Link
              to="/sign-up"
              className="ml-2 text-center font-medium text-tertiary-500"
            >
              Create a new account
            </Link>
            <div className="mb-1 flex w-full items-center justify-center gap-3">
              <Separator className="w-1/3 bg-light-4" />
              <p className="text-gray-500">or</p>
              <Separator className="w-1/3 bg-light-4" />
            </div>
            <OAuthButtons />
          </form>
        </div>
      </Form>
    </>
  );
};
export default RecoverPassword;
