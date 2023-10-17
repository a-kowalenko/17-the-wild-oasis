import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();

    const filteredValue = searchParams.get("status");
    const filter =
        !filteredValue || filteredValue === "all"
            ? null
            : { field: "status", value: filteredValue };
    // : { field: "totalPrice", value: 5000, method: "gte" };

    const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortByRaw.split("-");
    const sortBy = {
        field,
        direction,
    };

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

    return { isLoading, error, bookings, count };
}
