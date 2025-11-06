"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useMemo, useRef, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useQueryParams() {
  const totalPages = 100;
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const [isSearching, startTransition] = useTransition();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const searchWordParams = searchParams.get("search")?.toString();
  const sortParams = searchParams.get("sort")?.toString() || "desc";
  const areasParams = searchParams.get("areas")?.toString() || "";

  const handleApplyAreas = useCallback(
    (selectedAreas: string[]) => {
      startTransition(() => {
        if (selectedAreas.length === 0) {
          params.delete("areas");
        } else {
          params.set("areas", selectedAreas.join(","));
        }
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
      });
    },
    [params, pathname, replace]
  );

  const handleSortChange = useCallback(
    (value: "asc" | "desc") => {
      startTransition(() => {
        params.set("sort", value);
        params.set("page", "1");
        replace(`${pathname}?${params.toString()}`);
      });
    },
    [params, pathname, replace]
  );

  const handleSearch = useDebouncedCallback((search: string) => {
    startTransition(() => {
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    });
  }, 600);

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      handleSearch("");
    }
  };

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return {
    inputRef,
    totalPages,
    sortParams,
    currentPage,
    limit,
    isSearching,
    areasParams,
    handleSearch,
    searchWordParams,
    createPageURL,
    handleSortChange,
    handleClearInput,
    handleApplyAreas,
  };
}
