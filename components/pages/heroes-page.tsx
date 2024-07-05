"use client";

import { SetStateAction, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import CardList from "@/components/ui/cardlist";
import { MarvelData } from "@/app/heroes/[pagination]/page";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function HeroesPage({
  data,
  currentPage,
  totalPages,
  comicsPerCharacter,
}: MarvelData & {
  currentPage: number;
  totalPages: number;
  comicsPerCharacter: [
    {
      name: string;
      comicsCount: number;
    }
  ];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div className="grid gap-2">
          <Link href="/">
            <h1 className="text-2xl font-bold">Heroes Catalog</h1>
          </Link>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push(`/heroes/1?query=${searchTerm}`);
          }}
          className="flex items-center gap-4 w-full sm:w-auto"
        >
          <div className="relative flex-1 items-center sm:flex-initial">
            <IoIosSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search heroes..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-8 w-full sm:w-[300px]"
            />
          </div>
          <Button type="submit" className="sm:block" variant={"outline"}>
            Search
          </Button>
        </form>
      </div>
      <CardList currentCards={data} />
      <section className="max-w-2xl mx-auto pt-20">
        <h2 className="text-2xl font-bold pb-12">
          Comics per character on this page
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={600}
            height={400}
            data={comicsPerCharacter}
            margin={{
              top: 5,
              right: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar
              type="monotone"
              dataKey="comicsCount"
              fill="#A50000"
              label={{ position: "top", fontSize: 14 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
      <div className="flex items-center justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {currentPage > 1 && (
                <PaginationPrevious
                  href={`${currentPage - 1}?query=${searchTerm}`}
                />
              )}
            </PaginationItem>
            <PaginationLink isActive={currentPage === currentPage}>
              {currentPage}
            </PaginationLink>
            <PaginationItem>
              {currentPage < totalPages && (
                <PaginationNext
                  href={`${currentPage + 1}?query=${searchTerm}`}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
