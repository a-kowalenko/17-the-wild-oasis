import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // FILTERING
    const filteredValue = searchParams.get("status");
    const filter =
        !filteredValue || filteredValue === "all"
            ? null
            : { field: "status", value: filteredValue };
    // : { field: "totalPrice", value: 5000, method: "gte" };

    // SORTING
    const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = {
        field,
        direction,
    };

    // PAGINATION
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const {
        data: { data: bookings, count } = {},
        isLoading,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, currentPage],
        queryFn: () => getBookings({ filter, sortBy, currentPage }),
    });

    // PRE-FETCHING
    const pageCount = Math.ceil(count / PAGE_SIZE);
    if (currentPage < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, currentPage + 1],
            queryFn: () =>
                getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
        });
    }

    if (currentPage > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, currentPage - 1],
            queryFn: () =>
                getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
        });
    }

    return { isLoading, error, bookings, count };
}
