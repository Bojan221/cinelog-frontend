'use client'

import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
interface Props {
  placeholder: string;
}

function SearchInput({ placeholder }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(searchParam);

  useEffect(() => {
    setSearchValue(searchParam);
  }, [searchParam]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set("search", searchValue);
      params.set("page","1");
      params.delete('sort')
    } else {
      params.delete("search");
      params.delete('sort')
      params.set("page","1")
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="relative">
      <IoSearch className="absolute top-1/2 translate-y-[-50%] left-3 text-[15px] text-white/80" />
      <input
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value.trim())}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="rounded-lg w-75 bg-black/40 pl-8 py-2 focus text-white/80  focus:outline focus:outline-red-400/60"
      />
    </div>
  );
}

export default SearchInput;
