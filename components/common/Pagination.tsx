"use client";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams, usePathname } from "next/navigation";
import { useNavigation } from "@/components/common/NavigationContext";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function PaginationRounded({
  totalPages,
  currentPage,
}: PaginationProps) {
  const { navigate } = useNavigation();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value.toString());
    navigate(`${pathname}?${params.toString()}`);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages > 500 ? 500 : totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "currentColor",
            borderColor: "currentColor",
            opacity: 0.55,
            fontWeight: 500,
            transition: "all .15s ease",
            "&:hover": {
              opacity: 1,
              backgroundColor: "rgba(127,127,127,0.12)",
            },
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            opacity: 1,
            color: "#fff",
            backgroundColor: "var(--pg-accent, #6366f1)",
            borderColor: "var(--pg-accent, #6366f1)",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "var(--pg-accent-hover, #4f46e5)",
            },
          },
          "& .MuiPaginationItem-ellipsis": {
            color: "currentColor",
            opacity: 0.55,
          },
        }}
      />
    </Stack>
  );
}
