import React from "react";
import Link from "next/link";
import Image from "next/image";

const CardList = ({ currentCards }: { currentCards: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {currentCards.map((card) => (
        <div
          key={card.id}
          className="relative overflow-hidden rounded-lg hover:scale-105 transition-all duration-500 hover:shadow-lg"
        >
          <Link
            href={`/hero/${card.id}`}
            className="absolute inset-0 z-10"
            prefetch={false}
          >
            <span className="sr-only">View</span>
          </Link>
          <Image
            src={card.thumbnail.path + "." + card.thumbnail.extension}
            alt={card.title}
            width={400}
            height={300}
            className="object-cover w-full h-60"
          />
          <div className="p-4 bg-background">
            <h3 className="text-lg font-semibold">{card.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
