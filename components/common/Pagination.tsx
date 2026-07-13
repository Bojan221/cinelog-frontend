"use client";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  
  const isMobile = useMediaQuery("(max-width:640px)");

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value.toString());
    navigate(`${pathname}?${params.toString()}`);
  };
  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Pagination
        count={totalPages > 500 ? 500 : totalPages}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        size={isMobile ? "small" : "medium"}
        siblingCount={isMobile ? 0 : 1}
        boundaryCount={1}
        sx={{
          "& .MuiPagination-ul": {
            flexWrap: "nowrap",
          },
          "& .MuiPaginationItem-root": {
            color: "currentColor",
            borderColor: "currentColor",
            opacity: 0.55,
            fontWeight: 500,
            transition: "all .15s ease",
            minWidth: { xs: 28, sm: 32 },
            height: { xs: 28, sm: 32 },
            margin: { xs: "0 2px", sm: "0 3px" },
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
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
