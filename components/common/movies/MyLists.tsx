"use client";

import { FaLayerGroup } from "react-icons/fa6";
import NoDataIndicator from "@/components/common/NoDataIndicator";
import { useState } from "react";
import CreateList from "../CreateList";
import MyListsHeader from "./MyListsHeader";
import ListCard from "./ListCard";
import { List } from "@/types/list";
interface Props {
  lists: { lists?: List[] };
}

function MyLists({ lists }: Props) {
  const items = Array.isArray(lists) ? lists : (lists?.lists ?? []);
  const count = items.length;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="w-full">
      <MyListsHeader count={count} onCreateClick={() => setIsPopupOpen(true)} />

      {count > 0 ? (
        <div className="grid w-full gap-3 p-3 grid-cols-[repeat(auto-fill,minmax(min(260px,100%),1fr))] sm:gap-5 sm:p-5 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {items.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      ) : (
        <NoDataIndicator
          title="You don't have any lists yet"
          text="Create your first custom list to start organizing movies your own way."
          icon={<FaLayerGroup size={30} />}
        />
      )}

      <CreateList
        type="movie"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}

export default MyLists;
