"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";

const FormSchema = z.object({
  searchTerm: z.string().min(1),
});

interface SearchFieldProps {
  inTopbar?: boolean;
}

export function SearchField({ inTopbar }: SearchFieldProps) {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset();
    document.getElementById("closeSheet")?.click();
    navigate(`/search/${data.searchTerm}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="searchTerm"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={`flex rounded-full px-2 ${
                    inTopbar
                      ? "border-2 bg-white "
                      : "bg-black py-1 text-white shadow-[3px_10px_20px_2px_rgba(0,0,0,0.25)]"
                  }`}
                >
                  <Input
                    placeholder="Search podcasts..."
                    className="mr-3 rounded-md border-none bg-transparent"
                    autoComplete="off"
                    {...field}
                  />
                  <HoverCard>
                    <HoverCardTrigger>
                      <Button
                        type="submit"
                        className={`bg-transparent text-white ${
                          inTopbar && "hidden"
                        }`}
                      >
                        <Search />
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="hover-card_animation mt-2 rounded-md border-light-3 bg-black px-2 py-1 text-[14px] font-light text-white">
                      Search
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
