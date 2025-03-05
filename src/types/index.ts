import { SetURLSearchParams } from "react-router";

export type ProductType = {
  id: number;
  brand: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  quantity: number;
  img: string;
  category: string;
};

export type SearchParamsProps = {
  handleChangeFilters: (a: string, b: string) => void;
  searchParams: URLSearchParams;
  setSearchParams?: SetURLSearchParams;
};
