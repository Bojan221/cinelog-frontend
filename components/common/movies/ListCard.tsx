"use client";

import { List } from "@/types/list";
import { FaTrashCan, FaRegRectangleList } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import IOSSwitch from "@/components/common/IOSSwitch";
import { useState } from "react";
import { showToast } from "../Toast";
import EditListNamePopup from "./EditListNamePopup";
import ConfirmModal from "../ConfirmModal";
import axiosPrivate from "@/app/api/axiosPrivate";
import { useRouter } from "next/navigation";
interface Props {
  list: List;
  onView?: () => void;
  onDelete?: () => void;
}

function ListCard({ list, onView, onDelete }: Props) {

  const [isPublic, setIsPublic] = useState<boolean>(list.is_public === 1);
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const typeLabel = list.media_type === "tv" ? "TV" : "Movie";
  const router = useRouter()
  const noun =
    list.media_type === "tv"
      ? "series"
      : list.item_count === 1
        ? "movie"
        : "movies";

        const onTogglePublic = async(target:boolean) => { 
          try {
            await axiosPrivate.patch(`/movies/lists/update/${list.id}`,{isPublic: target ? 1 : 0})
            setIsPublic(target)
            showToast("success",`Now list is ${target ? "public":"private"}`)      
          }catch  { 
            showToast("error","Error changing list status")
          }
        }

        const onSave = async(name:string) => { 
          try {
            await axiosPrivate.patch(`/movies/lists/update/${list.id}`,{name})
            showToast("success","List name updated successfully")
            setShowEditPopup(false)
            router.refresh()
          }catch (err) {
            const res = (err as { response?: { status?: number; data?: { message?: string } } })?.response;
            if(res?.status === 409) {
              showToast("error", res.data?.message ?? "List name already exists")
            } else {
              showToast("error","Error changing list name")
            }
          }
        }
  const handleDelete = async () => {
    setDeleting(true)
    try {
      await axiosPrivate.delete(`/movies/lists/delete/${list.id}`)
      showToast("success", "List deleted successfully")
      setShowDeleteConfirm(false)
      onDelete?.()
      router.refresh()
    } catch {
      showToast("error", "Error deleting list")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-black/10 bg-black/2 p-4 transition duration-200 hover:border-black/20 hover:shadow-lg hover:shadow-black/5 dark:border-white/10 dark:bg-white/2 dark:hover:border-white/20 dark:hover:shadow-black/30">

      <span className="absolute right-4 top-4 text-[11px] font-medium uppercase tracking-wide text-black/30 dark:text-white/30">
        {typeLabel}
      </span>

      <div className="flex items-center gap-3 pr-12">
        <span className="shrink-0 text-black/30 dark:text-white/30">
          <FaRegRectangleList size={18} />
        </span>
        <div className="flex min-w-0 items-center gap-4">
          <h3 className="truncate text-lg font-bold leading-snug tracking-tight text-black/90 dark:text-white/90">
            {list.name}
          </h3>
          <FaPen
            size={16}
            className="mb-1 shrink-0 cursor-pointer text-white/30"
            onClick={() => setShowEditPopup(true)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-black/50 dark:text-white/50">
          {list.item_count} {noun}
        </span>

        <label className="flex cursor-pointer items-center gap-2 select-none">
          <span className="text-xs font-medium text-black/50 dark:text-white/50">
            {isPublic ? "Public" : "Private"}
          </span>
          <IOSSwitch
            checked={isPublic}
            onChange={(e) => onTogglePublic?.(e.target.checked)}
            slotProps={{ input: { "aria-label": "Toggle list visibility" } }}
          />
        </label>
      </div>

      <div className="border-t border-black/5 dark:border-white/5" />

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowDeleteConfirm(true)}
          aria-label="Delete list"
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-black/40 opacity-0 transition hover:bg-red-500/10 hover:text-red-500 focus-visible:opacity-100 group-hover:opacity-100 dark:text-white/40 max-md:opacity-100 cursor-pointer"
        >
          <FaTrashCan size={12} />
          Delete
        </button>

        <button
          type="button"
          onClick={() =>
            onView ? onView() : router.push(`/movies/lists/${list.id}`)
          }
          className="inline-flex items-center justify-center rounded-md bg-red-500/90 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600 cursor-pointer"
        >
          View list
        </button>
      </div>

        <EditListNamePopup
        isOpen={showEditPopup}
        onClose={() => setShowEditPopup(false)}
        currentName={list.name}
        onSave={onSave}
        />

        <ConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleDelete}
          loading={deleting}
          title="Delete list"
          message={`"${list.name}" will be permanently deleted. This action cannot be undone.`}
          confirmLabel="Delete list"
        />
    </div>
  );
}

export default ListCard;
