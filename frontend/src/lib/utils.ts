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

export const sampleTranscription = `Michael Barbaro
From “The New York Times,” I’m Michael Barbaro. This is “The Daily.”

Today, a crisis of confidence is brewing inside China, where the heavy hand of the government is turning true believers in the Chinese dream into skeptics willing to flee the country. My colleague Li Yuan on how that crisis is now showing up at the US-Mexico border.

It’s Thursday, February 15.

Li, you write about China for the “Times.” Tell us how it is that you first came to this story.

Li Yuan
You know, I watch a lot of Chinese social media for my job. And in early 2023, I started seeing something quite surprising for me. I saw all these videos on social media of Chinese people crossing the US border with Mexico by taking the route, what we call the Darién Gap.

And most people taking the Darién Gap are from Venezuela, Ecuador, and Haiti. But what felt so unusual for Chinese people taking this journey is that unlike these other groups, these Chinese are fleeing the world’s second-largest economy.

Michael Barbaro
Right. They are not, in most of the public’s imagination, in the same boat as the migrants from any of the countries we think of where people are fleeing violence and poverty and taking this very dangerous route, the Darién Gap.

Li Yuan
Yeah.

Michael Barbaro
And how many Chinese migrants are we talking about here?

Li Yuan
Last year, in 2023, 24,000 Chinese crossed the Southern border.

Michael Barbaro
24,000.

Li Yuan
Yeah, that’s more than the previous 10 years combined.

Michael Barbaro
Wow.

Li Yuan
And if we step back and look at the history, China used to be a big country for migration. A lot of people were leaving, trying very hard to leave China in 1980s, when China was a very poor country. And then, as the economy grew, life became much better, the opportunities were abundant, and there were, like, hundreds of millions of Chinese middle-class.

And by 2012, very few Chinese were leaving. And about 80 percent of Chinese who studied abroad — people like me — went back to China, because why leave China, right? You could have Chinese dream.

Michael Barbaro
As a play on the American dream, right?

Li Yuan
Yeah, the American dream — we grew up watching Hollywood movies. We all know the term. And then, the Communist Party kind of —

Michael Barbaro
Co-opted it?

Li Yuan
— co-opted the term, and it became the Chinese dream, and many Chinese bought into that. But in recent years, the numbers of people leaving China have again started to go up. And actually, hundreds of thousands of Chinese citizens left the country last year.

And the Chinese migrants who cross the Darién Gap represent those who are going to the most extreme lengths to leave the country. And so I’ve been really interested in finding out, why are they doing this?

Michael Barbaro
And what do you come to understand about why thousands of Chinese migrants are making this journey? What explains it?

Li Yuan
It might be better if I can give you an example — a man I met.

Li Yuan
[SPEAKING MANDARIN]

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
His name is Gao Zhibin. He’s 39 years old. And he thought he realized the Chinese dream and ended up on the Darién Gap.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He was born in China’s eastern province, Shandong, in a poor village.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He said he grew up having, like, only two meals with meat a year. And he didn’t finish middle school, and —

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
— he worked hard labor, making very little money. But he dreamed about the world outside his village.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
So he went to work at an electronics factory in Beijing, making about $300 a month, which was a fortune for him.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And he has a lot of street smarts. You can sense it when you’re talking to him. So after a few years, he started working for, kind of, like a human resources company, recruiting factory workers just like him. And then, by 2007, he made some money. And he leased a plot of land on the outskirts of Beijing and built an apartment building, and rented it out to migrant workers.

Michael Barbaro
So he basically becomes a small-scale, almost, developer.

Li Yuan
Yeah, a very small-scale developer. And he did pretty well, you know. He was making about $30,000 a year, which was pretty good money for anybody in China at that time.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And he got married, and he had a daughter. And a few years later, he had a son.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He moved his parents from their village to Beijing, which was a big success in Chinese culture. And he really believed he kind of made it. And his life was only going to become better and better.

Michael Barbaro
What you’re describing feels like a middle-class existence in China’s capital, a success story, not exactly the kind of person you would expect to leave China.

Li Yuan
Yeah. The Chinese government likes talking about hundreds of millions of Chinese lifted out of poverty. He was one of them. But then in 2018, everything changed for Gao.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He got a notice from the local government that they wanted to take back the land he leased and tear down the apartment building he had built.

Michael Barbaro
The building he had built and subdivided?

Li Yuan
Yeah.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
[SPEAKING MANDARIN]

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
The government wanted to use the land to sell it for big bucks to bigger developers.

Michael Barbaro
Essentially, the government just wants to override the lease that he has for this land. They just don’t seem to respect it, and they’re putting up this sign and saying to him, it’s over.

Li Yuan
Yeah.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And the government ordered everyone in Gao’s building to leave.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And Gao is like, no way, and he refused to leave. But the government cut off the water, the power, and they throw away the tenants’ belongings on the street.

Michael Barbaro
Wow.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And they dumped toilets sewage in the yard, because they wanted to make it unlivable for the people. And then on that day when the government came with police and bulldozers to tear the building down, he said he stood on the roof of the building.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He said he was so angry, his eyes just blacked out.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He had a brick in his hand. He wanted —

Michael Barbaro
A brick in his hand.

Li Yuan
Yes, he wanted to throw it and fight the police, the government officials. And his mom knelt down in front of him, begged him not to fight. You can’t fight the government. Just get over with it. Carry on with your life.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And he told me he just cried.

Michael Barbaro
So what does Gao end up doing after the government takes away his land and this building?

Li Yuan
Well, Gao didn’t want to give up. He decided to go to the higher authority, the central government, to petition his case. He thought at least he could demand some compensation for what he had lost.

But during that process, he said, he and his family started getting harassed by local authorities. They even went to his children’s school to ask the students with the same last name, Gao, to stand up.

Michael Barbaro
To stand up in the classroom?

Li Yuan
Yeah, to intimidate, basically. It got so bad that he legally divorced his wife to try to trick the authorities to stop harassing her and her parents.

Michael Barbaro
Wow.

Li Yuan
And meanwhile, he had lost income from the apartment building. He was trying to make a living, doing odd jobs. And this went on for several years. And at the end of it, Gao got absolutely nothing in return for the loss of his property.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And at that time, he started to think about his world.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He said, I felt like I suddenly woke up.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He said, you know, he just found out, there is no way to pursue justice in his country.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He told me, I felt like I finally saw through this country’s reality, saw right through it.

Michael Barbaro
Hmm.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
His outlook for the country and for his own future just became very dark. That was what he said.

Michael Barbaro
So at this point, it seems safe to say that his version of the Chinese dream has collapsed. And I wonder, as he’s telling you this story, Li, what you make of it.

Li Yuan
To be honest, if you are a China correspondent, you cover China, this is the type of story you hear again and again. The space for the society just shrunk so much in the past decade or so under the government of Xi Jinping. It has become really hard for people from all kinds of socioeconomic backgrounds.

You can get into trouble for anything, for being a Uyghur, Christian, Muslim, or you’re just an ordinary online user just making a comment on social media, or you’re just a Communist Party cadre who has a copy of a banned book, and you can be in trouble. The police can show up at your door in the middle of the night to knock on the door.

Michael Barbaro
And everything goes away.

Li Yuan
Yeah. You just live in constant fear. And all of these are happening at the same time when the unemployment rate is rising and the Chinese economy is falling apart. People just can’t see where their future is going to be.

The loss of confidence is — you can feel it in the air. That’s what people told me. So this is the moment that the idea of the Chinese dream — you work very hard, and the life will become better — kind of, is clashing with the reality of the Chinese government.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And it’s this moment that Gao saw the videos I saw on social media — of people crossing the Darién Gap.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And he thought to himself that, I can do this, too.

Michael Barbaro
We’ll be right back.

Once Gao decides to leave China, why does he decide to leave this way? Why not go to a nearby neighboring country in Asia? Why not go to Europe? Why travel across the ocean to the US through such a particularly terrifyingly dangerous route as the Darién Gap?

Li Yuan
Yeah. For many Chinese people, it’s pretty obvious that the US is the country they should move to. Because it is the wealthiest country in the world, and the wages are much higher here than in most countries. And also, the US still looms large in the imagination of Chinese people. For many people, the American dream never died.

The problem is, it’s not easy for ordinary Chinese people like Gao to get any kind of visa to go directly to the US. But Chinese passport holders can fly directly to Ecuador without a visa. And from there, there’s a well-traveled path to the Darién Gap. So many Chinese people just think that going from Ecuador to the Darién Gap is actually one of the best options for them to get to the United States.

Michael Barbaro
But how aware is Gao of what is entailed in walking from Ecuador to the US border through that landscape?

Li Yuan
He was aware of the danger.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He told me he knew that people died on the route. But —

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
— he told me his life was so risky, so dangerous, so uncertain in China, he decided he might just as well leave to start a new life.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
Gao had never been out of China, and he didn’t even have a passport. He applied for a passport after he decided to leave. And he also convinced his family to let him bring his eldest child, his 13-year-old daughter, to come with him.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And they left Beijing late February last year.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
They flew to Turkey, and then to Ecuador, and got connected with smugglers, who took them to the Darién Gap.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
It was such a brutal journey, Gao told me.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
On the first day, he had sunstroke.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
On the second day, he could barely walk, and his daughter vomited and fainted on the ground.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
I asked him what was going through his mind during the journey. He said it was despair.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
But he just told his daughter, we have to keep going. We can’t get left behind. The journey took 35 days. They reached the border in late March and crossed from Mexico into Texas.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
They were taken by border control agents.

Gao told his story about what he experienced in China, and he was let go.

Michael Barbaro
This is where it feels like Gao’s story seems to intersect with a very long-running story in the United States, which is what’s going on at the border. Thousands, tens of thousands a week — migrants showing up at that Southern border, seeking asylum.

And because there’s such a backlog to process, the applications, folks are let into the US and remain here. That seems to be what happened to and his daughter.

Li Yuan
Yeah. Gao and his daughter, they were lucky. They were let go within 48 hours, and immigration agents sent them to San Francisco. And that’s where he and his daughter have been ever since.

Michael Barbaro
And what does his life look like in San Francisco?

Li Yuan
So Gao and his daughter are living in a studio apartment at a housing shelter there.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He got a work permit and has been working, delivering packages for $2 per package.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He gets up at 6:00 AM every morning. And his daughter has to get up around the same time, because she cannot be at the family shelter alone.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
So she would stay at the KFC until it’s school time.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He works really, really long hours.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And he told me he cries when he thinks about leaving her alone.

Michael Barbaro
This sounds like a very difficult existence. I mean, the kind of difficult existence that might make somebody wonder if they had made the right decision.

Li Yuan
You know, life isn’t easy for him and his daughter, but Gao is focusing on what the US is giving him.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He said the Chinese government took away his building, and he can’t believe the US government gave him an apartment to live for free.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And one thing he emphasized is the freedom he has here. He doesn’t need to fear for the knock on the door anymore.

Li Yuan
[SPEAKING MANDARIN]

Li Yuan
I asked him, are you idolizing the US too much?

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And he kept telling me, no, no, no. I never regretted my decision of coming here.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And he told me a story of one afternoon in November when Xi Jinping was in San Francisco to meet with President Biden.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And Gao saw on social media that there would be a protest in San Francisco. So he actually took the day off and went downtown.

[CROWD PROTESTING IN MANDARIN]

He said he joined a group of protesters and started chanting, “Xi Jinping, step down.”

[CROWD PROTESTING IN MANDARIN]

And he was actually interviewed by a Chinese media outlet at the scene.

Archived Recording 1
[SPEAKING MANDARIN]

Archived Recording (Gao Zhibin)
[SPEAKING MANDARIN]

Li Yuan
He sent me the clip. And the reporter asked him, Why are you here? He said, freedom is great.

Archived Recording (Gao Zhibin)
[SPEAKING MANDARIN]

Li Yuan
Then he shouted, “Long live freedom. Xi Jinping, step down.”

Archived Recording (Gao Zhibin)
[SPEAKING MANDARIN]

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He told me he felt amazing.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He said, in China, I wouldn’t dare say that.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
But these were heartfelt words, and I could finally shout them out.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
He said he felt like a completely different person after that.

Michael Barbaro
So what’s the most likely outcome of this story for Gao? What do you think is going to happen to him?

Li Yuan
So Gao applied for political asylum in May, and he’s waiting to see if it will be granted.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
In the meantime, he dreams of one day settling down again in his own house, not in a shelter.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And he also wants to be reunited with his family.

Michael Barbaro
Right, which, of course — the majority of which is still back in China.

Li Yuan
Yeah.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
For now, he tells his wife that he’ll be able to get a green card soon —

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
— which he says is a lie.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
In reality, he’s not certain what will happen to him.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
And a lot of people like him who made a similar journey here ended up going back to China. When I talked to them, they said things are just too hard.

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
But Gao said, even if he can’t make it here —

Gao Zhibin
[SPEAKING MANDARIN]

Li Yuan
— he will never go back to China as long as the Communist Party is in power.

Michael Barbaro
Mm.

Li Yuan
[SPEAKING MANDARIN]

Gao Zhibin
[SPEAKING MANDARIN] Bye-bye. Bye-bye.

Michael Barbaro
Gao would seem to be exactly the kind of person on paper that China wouldn’t want to lose, somebody who made the journey that, as you said, China is so proud of — from rural China to urban China, who tried to create a business, a development, did so, brought his family to the big city. And yet, he’d rather risk his life and flee to the United States through the jungle than endure this version of China’s government.

And based on your reporting, hundreds of thousands of others are doing the same thing. And yet, the reality is that China is a country of huge numbers. I mean —

Li Yuan
1.4 billion people.

Michael Barbaro
Right. So even if hundreds of thousands of Chinese people are leaving, that’s still a pretty small proportion of the population. So is what we’re experiencing here, what you’re documenting, a threat to China’s future and something that it’s going to be taking seriously? Or is this just the cost of the authoritarian political model that China now has under Xi? And can it therefore tolerate this outflow?

Li Yuan
I don’t think any country should take this lightly. It is a serious problem for any government. In the past year, I wrote about Chinese entrepreneurs, young professionals, intellectuals, artists, filmmakers, all kinds of people leaving, because they couldn’t suffer it anymore.

There’s even a term for that, called “runxue.” Running away from China is among the most popular buzzwords in China last year. Everybody talks about where they should move to what their options are. My friends told me that it’s also one of the hottest topics on dinner tables in China.

Michael Barbaro
When people sit around and really get to talking and they get into their cups, you’re saying, they talk about fleeing.

Li Yuan
Yeah. People are obsessed with this. I think what Gao and many people are doing is starting to look like a beginning of a great exodus of China. When the government became so harsh on its people, when the economy is not doing well and people can’t vote for their leaders, some people decided there’s only one way to vote, and that’s with their feet.

That was what Gao and many people did. And I believe many more people are going to do that.

Michael Barbaro
Well, Li, thank you very much. We appreciate it.

Li Yuan
Thank you.

Michael Barbaro
We’ll be right back.

Here’s what else you need to know today. On Wednesday, a rocket fired from Lebanon struck a base in Israel, killing an Israeli soldier and wounding eight others, and prompting a massive response from the Israeli government. Hours later, Israel carried out extensive airstrikes on southern Lebanon that killed at least four people. The exchanges represent the kind of deadly tit for tat that could quickly spiral into a direct conflict between Israel and Lebanon, which Israel has twice invaded in the past.

And a celebration of the Kansas City Chiefs Super Bowl victory has turned into America’s latest mass shooting. One person was killed, and at least 21 others were injured — nine of them, children. Kansas City police said they had detained three people in connection with the shooting but offered few details and no motive.

Today’s episode was produced by Stella Tan, Shannon Lin, and Jessica Cheung. It was edited by MJ Davis Lin with help from Michael Benoist and Paige Cowett, contains original music by Marion Lozano, Rowan Niemisto, and Dan Powell, and was engineered by Chris Wood.

That’s it for “The Daily.” I’m Michael Barbaro. See you tomorrow.`;
