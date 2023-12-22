import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";

const FormSchema = z.object({
  chatInput: z.string().min(1),
});
const ChatInput = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      chatInput: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="chatInput"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Message TransPod..."
                  className="rounded-xl mr-3"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default ChatInput;
