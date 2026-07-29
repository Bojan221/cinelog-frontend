"use client";
import Avatar from "../core/Avatar";
import { FaRegComment, FaPen, FaRegTrashCan } from "react-icons/fa6";
import { timeAgo } from "@/utils/helpers";
import { useAppSelector } from "@/reduxStore/hooks";
import { useEffect, useState } from "react";
import { Comment } from "@/types/comment";
import axiosPrivate from "@/app/api/axiosPrivate";
import { showToast } from "./Toast";

interface CommentsProps {
  mediaType: "movie" | "tv";
  mediaId: number;
}

function CommentsSection({ mediaType, mediaId }: CommentsProps) {
  const user = useAppSelector((s) => s.auth.user);
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState<string>("");
  const [editing, setEditing] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosPrivate.get(
          `/comments/${mediaId}?mediaType=${mediaType}`,
        );
        setComments(response.data.comments);
      } catch {
        showToast("error", "Error fetching comments");
      }
    };

    fetchComments();
  }, []);

  const postComment = async () => {
    try {
      if (!content.trim()) {
        return showToast("error", "Comment cant be empty");
      }
      const commentBody = {
        mediaId,
        mediaType,
        content,
      };
      const response = await axiosPrivate.post("/comments/create", commentBody);
      const optimisticComment = response.data.comment;
      setComments((prev) => [optimisticComment, ...prev]);
      showToast("success", "Comment created successfully!");
    } catch {
      showToast("error", "Error with post comment");
    } finally {
      setContent("");
    }
  };

  return (
    <section className="flex w-full flex-col gap-5">
      <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-black dark:text-white">
        <FaRegComment className="text-[18px] text-indigo-500 dark:text-red-400" />
        Comments
        <span className="text-sm font-medium text-black/40 dark:text-white/40">
          ({comments.length})
        </span>
      </h2>

      <div className="flex flex-col gap-3 max-h-120 overflow-y-auto sleek-scrollbar">
        {comments?.map((comment) => {
          const isMe = user?.id === comment.user_id;
          return (
            <div
              key={comment.id}
              className="flex flex-col gap-2 rounded-xl border border-black/10 bg-black/2 px-4 py-3 dark:border-white/10 dark:bg-white/3"
            >
              <div className="flex items-center justify-between gap-2">
                <Avatar
                  size="sm"
                  fullName={
                    comment.user.firstName + " " + comment.user.lastName
                  }
                  profilePicture={comment.user.avatar ?? undefined}
                />
                <div className="flex shrink-0 items-center gap-1">
                  <span className="text-xs text-black/40 dark:text-white/40">
                    {timeAgo(comment.created_at)}
                  </span>
                  {isMe ? (
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => {
                          setEditing(comment.id);
                          setEditingContent(comment.content);
                        }}
                        type="button"
                        aria-label="Edit comment"
                        className="grid h-7 w-7 place-items-center rounded-full text-black/40 transition-colors hover:bg-black/5 hover:text-black dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white cursor-pointer"
                      >
                        <FaPen size={12} />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete comment"
                        className="grid h-7 w-7 place-items-center rounded-full text-black/40 transition-colors hover:bg-red-500/10 hover:text-red-500 dark:text-white/40 cursor-pointer"
                      >
                        <FaRegTrashCan size={12} />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
              {editing === comment.id ? (
                <div className="flex flex-col gap-2.5">
                  <input
                    type="text"
                    autoFocus
                    value={editingContent || ""}
                    onChange={(e) => setEditingContent(e.target.value)}
                    placeholder="Edit your comment..."
                    className="w-full rounded-lg border border-black/15 bg-background px-3 py-2 text-sm text-black/80 transition-colors placeholder:text-black/30 focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-white/15 dark:text-white/90 dark:placeholder:text-white/30"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(null);
                        setEditingContent(null);
                      }}
                      className="flex-1 rounded-lg border border-black/15 px-4 py-2 text-sm font-semibold text-black/60 transition-colors hover:bg-black/5 hover:text-black cursor-pointer sm:flex-none dark:border-white/20 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={
                        !editingContent?.trim() ||
                        editingContent.trim() === comment.content
                      }
                      className="flex-1 rounded-lg bg-red-500/90 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer sm:flex-none"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-black/70 dark:text-white/80">
                  {comment.content}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-black/2 p-1.5 transition-colors focus-within:border-black/25 dark:border-white/10 dark:bg-white/3 dark:focus-within:border-white/25">
        <input
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={(e) => {
            e.key === "Enter" && postComment();
          }}
          type="text"
          placeholder="Add a comment..."
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-black/80 placeholder:text-black/30 focus:outline-none dark:text-white/90 dark:placeholder:text-white/30"
        />
        <button
          onClick={postComment}
          disabled={!content.trim()}
          className="shrink-0 rounded-lg bg-red-500/90 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          Add Comment
        </button>
      </div>
    </section>
  );
}

export default CommentsSection;
