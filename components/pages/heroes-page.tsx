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

export default function HeroesPage({
  data,
  currentPage,
  totalPages,
}: MarvelData & { currentPage: number; totalPages: number }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data
    .filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((hero) => ({ ...hero, title: "" }));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div className="grid gap-2">
          <h1 className="text-2xl font-bold">Heroes Catalog</h1>
          <p />
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <IoIosSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search heroes..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-8 w-full sm:w-[300px]"
            />
          </div>
        </div>
      </div>
      <CardList currentCards={filteredData} />
      {searchTerm === "" && (
        <div className="flex items-center justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {currentPage > 2 && (
                  <PaginationPrevious href={`${currentPage - 1}`} />
                )}
              </PaginationItem>
              {Array.from({ length: 5 }, (_, i) =>
                currentPage > 3
                  ? currentPage < totalPages - 2
                    ? currentPage + i - 2
                    : totalPages - 4 + i
                  : i + 1
              ).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`${page}`}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                {currentPage < totalPages - 1 && (
                  <PaginationNext href={`${currentPage + 1}`} />
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
