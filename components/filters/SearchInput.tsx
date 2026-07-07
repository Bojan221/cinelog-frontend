'use client'

import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useSearchParams, usePathname } from "next/navigation";
import { useNavigation } from "@/components/common/NavigationContext";
interface Props {
  placeholder: string;
}

function SearchInput({ placeholder }: Props) {
  const { navigate } = useNavigation();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(searchParam);

  useEffect(() => {
    setSearchValue(searchParam);
  }, [searchParam]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    setSearchValue(searchValue.trim())
    if (searchValue) {
      params.set("search", searchValue);
      params.set("page","1");
      params.delete('sort')
      params.delete('genre')
    } else {
      params.delete("search");
      params.delete('sort')
      params.delete('genre')
      params.set("page","1")
    }
    navigate(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => { 
    setSearchValue('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search')
    navigate(`${pathname}?${params.toString()}`)
  }
  return (
    <div className="relative w-full sm:w-auto">
      <IoSearch className="absolute top-1/2 left-3 translate-y-[-50%] text-[15px] text-black/50 dark:text-white/50" />
      <input
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="w-full rounded-lg bg-black/5 py-2 pr-8 pl-8 text-black placeholder:text-black/40 focus:outline focus:outline-red-400/60 sm:w-64 md:w-75 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
      />
      {searchValue && (
        <IoMdClose
          className="absolute top-1/2 right-3 translate-y-[-50%] cursor-pointer text-[15px] text-black/50 dark:text-white/50"
          onClick={() => handleClear()}
        />
      )}
    </div>
  );
}

export default SearchInput;
