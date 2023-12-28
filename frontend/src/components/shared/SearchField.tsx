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

export function SearchField() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset();
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
                <div className="flex w-full rounded-full bg-black px-2 py-1 shadow-[3px_10px_20px_2px_rgba(0,0,0,0.25)]">
                  <Input
                    placeholder="Search podcasts..."
                    className="mr-3 w-full rounded-md border-none bg-transparent text-white"
                    autoComplete="off"
                    {...field}
                  />
                  <HoverCard>
                    <HoverCardTrigger>
                      <Button
                        type="submit"
                        className="bg-transparent text-white"
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
