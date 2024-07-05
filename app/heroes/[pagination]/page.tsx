import HeroesPage from "@/components/pages/heroes-page";
import md5 from "md5";

export type MarvelData = {
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

const PAGE_SIZE = 20;

const Index = async ({
  params,
  searchParams,
}: {
  params: { pagination: string };
  searchParams: { query: string };
}) => {
  console.log(searchParams.query);
  const source = await getData(
    params.pagination
      ? { offset: (Number(params.pagination) - 1) * PAGE_SIZE }
      : { offset: 0 },
    searchParams.query || ""
  );
  const { data, currentPage, totalPages } = source;
  return (
    <HeroesPage currentPage={currentPage} data={data} totalPages={totalPages} />
  );
};

export default Index;

async function getData({ offset }: { offset: number }, query: string) {
  // this layer works as a BFF, fetching and formatting data for the UI
  const timestamp = new Date().getTime();
  const hash = md5(
    `${timestamp}${process.env.PRIVATE_MARVEL_KEY}${process.env.NEXT_PUBLIC_MARVEL_KEY}`
  );

  const offsetUrl = offset ? `offset=${offset}` : "";
  const queryUrl = query ? `nameStartsWith=${query}` : "";
  const apiUrl = `${process.env.NEXT_PUBLIC_MARVEL_API}/characters?ts=${timestamp}&apikey=${process.env.NEXT_PUBLIC_MARVEL_KEY}&hash=${hash}`;

  const res = await fetch(`${apiUrl}&${offsetUrl}&${queryUrl}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return {
    data: data.data.results,
    currentPage: offset / PAGE_SIZE + 1,
    totalPages: Math.ceil(data.data.total / PAGE_SIZE),
  };
}
