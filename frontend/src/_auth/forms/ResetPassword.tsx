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
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PasswordResetValidation } from "@/lib/validation";
import {useNavigate, useSearchParams} from "react-router-dom";
import { resetPassword } from "@/lib/appwrite/api.ts";
import {toast} from "@/components/ui/use-toast.ts";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof PasswordResetValidation>>({
    resolver: zodResolver(PasswordResetValidation),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PasswordResetValidation>) {
    if (userId && secret) {
      await resetPassword(
        userId,
        secret,
        values.password,
        values.confirmPassword,
      );
    }
    toast({
      title:
          "Password has been reset successfully!",
    });
    navigate('/sign-in')
  }

  return (
    <>
      <Form {...form}>
        <div className="flex w-420 flex-col items-center justify-center px-4">
          <div className="m-0 flex gap-1 p-0">
            <img src="/assets/logo.png" alt="logo" height={30} width={34} />
            <p className="m-0 ml-1 text-3xl font-medium text-black">TransPod</p>
          </div>
          <h2 className="mt-5 pt-0 text-2xl font-bold">Reset password</h2>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 flex w-full flex-col gap-5"
          >
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="shad-button_primary">
              Reset password
            </Button>
          </form>
        </div>
      </Form>
    </>
  );
};
export default ResetPassword;
