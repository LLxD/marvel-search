import HeroPage from "@/components/pages/hero-page";
import React from "react";
import md5 from "md5";

const Index = async ({ params }: { params: { id: string } }) => {
  const source = await getData(params);
  const { data } = source;
  return <HeroPage data={data} />;
};

export default Index;

async function getData(params: { id: string }) {
  // this layer works as a BFF, fetching and formatting data for the UI
  const timestamp = new Date().getTime();
  const hash = md5(
    `${timestamp}${process.env.PRIVATE_MARVEL_KEY}${process.env.NEXT_PUBLIC_MARVEL_KEY}`
  );
  const res = await fetch(
    `http://gateway.marvel.com/v1/public/characters/${params.id}?ts=${timestamp}&apikey=${process.env.NEXT_PUBLIC_MARVEL_KEY}&hash=${hash}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return {
    data: data.data.results,
  };
}
