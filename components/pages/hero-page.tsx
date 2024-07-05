import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type HeroPageProps = {
  data: {
    id: number;
    name: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
    comics: {
      items: {
        name: string;
      }[];
    };
    series: {
      items: {
        name: string;
      }[];
    };
    stories: {
      items: {
        name: string;
      }[];
    };
    events: {
      items: {
        name: string;
      }[];
    };
    urls: {
      type: string;
      url: string;
    }[];
  }[];
};

export default function HeroPage({ data }: HeroPageProps) {
  const hero = data[0];
  const comics = hero.comics.items.map((comic) => comic.name);
  const series = hero.series.items.map((serie) => serie.name);
  const stories = hero.stories.items.map((story) => story.name);
  const events = hero.events.items.map((event) => event.name);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10">
      <Link href={"/"} passHref>
        <Button className="py-4" variant={"outline"}>
          Back
        </Button>
      </Link>
      <div className="grid gap-8">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-32 h-32">
            <AvatarImage
              data-cy="hero-thumbnail"
              src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            />
            <AvatarFallback>{hero.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 data-cy="hero-name" className="text-2xl font-bold">
              {hero.name}
            </h1>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">About</h2>
            <p data-cy="hero-description" className="text-muted-foreground">
              {hero.description === "" ? "No description" : hero.description}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Comics</h2>
        <ul className="list-disc list-inside">
          {comics.map((comic) => (
            <li data-cy="hero-comics" key={comic}>
              {comic}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4">Series</h2>
        <ul className="list-disc list-inside">
          {series.map((serie) => (
            <li data-cy="hero-series" key={serie}>
              {serie}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4">Stories</h2>
        <ul className="list-disc list-inside">
          {stories.map((story) => (
            <li data-cy="hero-stories" key={story}>
              {story}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4">Events</h2>
        <ul className="list-disc list-inside">
          {events.map((event) => (
            <li data-cy="hero-events" key={event}>
              {event}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
