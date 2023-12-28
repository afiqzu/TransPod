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
import { Message } from "@/types";
import { generateChatMessage } from "@/lib/openai/api.ts";

const FormSchema = z.object({
  chatInput: z.string().min(1),
});

type ChatInputProps = {
  onNewInput: (message: Message) => void;
  onNewResponse: (message: Message) => void;
};

const ChatInput = ({ onNewInput, onNewResponse }: ChatInputProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      chatInput: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset();
    onNewInput({
      role: "user",
      content: data.chatInput,
    });
    const response = await generateChatMessage(data.chatInput);
    if (response)
      onNewResponse({ role: response.role, content: response.content });
  }

  return (
    <div className="border-t-2 p-3">
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
                    className="mr-3 rounded-xl"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
export default ChatInput;
