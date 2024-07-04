import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
  const comics = data[0].comics.items.map((comic) => comic.name);
  const series = data[0].series.items.map((serie) => serie.name);
  const stories = data[0].stories.items.map((story) => story.name);
  const events = data[0].events.items.map((event) => event.name);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10">
      <div className="grid md:grid-cols-[200px_1fr] gap-8">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="w-32 h-32">
            <AvatarImage
              src={`${data[0].thumbnail.path}.${data[0].thumbnail.extension}`}
            />
            <AvatarFallback>{data[0].name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="text-2xl font-bold">{data[0].name}</h1>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">About</h2>
            <p className="text-muted-foreground">
              {data[0].description === ""
                ? "No description"
                : data[0].description}
            </p>
          </div>
        </div>
      </div>
      {/* create beautiful sections for each one of the data a hero has */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Comics</h2>
        <ul className="list-disc list-inside">
          {comics.map((comic) => (
            <li key={comic}>{comic}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4">Series</h2>
        <ul className="list-disc list-inside">
          {series.map((serie) => (
            <li key={serie}>{serie}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4">Stories</h2>
        <ul className="list-disc list-inside">
          {stories.map((story) => (
            <li key={story}>{story}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-4">Events</h2>
        <ul className="list-disc list-inside">
          {events.map((event) => (
            <li key={event}>{event}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
