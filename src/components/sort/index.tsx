import { SearchParamsProps } from "../../types";
import "./index.scss";

export default function Sort({
  handleChangeFilters,
  searchParams,
}: SearchParamsProps) {
  const selectedSort = searchParams.get("_order");

  return (
    <div className="sort">
      <span>Сортировка по цене:</span>
      <span
        onClick={() => handleChangeFilters("_sort", "asc")}
        className={selectedSort === "asc" ? "sort-active" : ""}
      >
        По возрастанию
      </span>
      <span
        onClick={() => handleChangeFilters("_sort", "desc")}
        className={selectedSort === "desc" ? "sort-active" : ""}
      >
        По убыванию
      </span>
    </div>
  );
}
