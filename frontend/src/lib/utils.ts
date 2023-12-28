import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number | undefined): string {
  if (!seconds) {
    return "0 min";
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes} min`;
  } else {
    return `${hours} h ${minutes} min`;
  }
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function removeHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, " ");
}

export const sampleTranscription = `Host (Sarah Johnson): [00:00:00]
  Hello and welcome back to The Everyday Balance Show. I'm your host, Sarah Johnson. In today's episode, we're diving into a topic that resonates with so many of us: Work-Life Balance. We've got an exciting line-up today, including an interview with renowned work-life balance coach, David Miller. But first, let's talk about what work-life balance really means in today's world.

  [Transition Music]

  Sarah: [00:01:30]
  Work-life balance is this ever-elusive concept, isn't it? We all strive for it, but what does it actually look like? Is it a perfect split between career and personal life, or is it more about satisfaction in both areas? To explore this, we're bringing in David Miller, who has been coaching professionals on achieving work-life harmony for over a decade. Welcome to the show, David.

  David Miller: [00:02:00]
  Thanks, Sarah. It's great to be here.

  Sarah: [00:02:03]
  So, David, let's jump right in. What's your take on work-life balance?

  David: [00:02:08]
  Well, Sarah, I like to think of it as work-life harmony rather than balance. It's not about dividing your time equally but finding a rhythm that suits your personal and professional life. It's about making choices that align with your values and priorities.

  Sarah: [00:02:25]
  That's an interesting perspective. Can you share some practical tips for our listeners?

  David: [00:02:30]
  Absolutely. First, it's essential to set boundaries. Know when to switch off from work and be present in your personal life. Secondly, prioritize self-care. You can't pour from an empty cup. And finally, communicate your needs clearly, both at work and home.`;

