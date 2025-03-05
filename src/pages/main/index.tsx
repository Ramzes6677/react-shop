import { Header } from "../../components/header";
import { Card } from "../../components/productCard";
import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import Sort from "../../components/sort";
import { Drawer, Pagination, Card as CardAntd } from "antd";
import { useSearchParams } from "react-router";
import { fetchProducts } from "./slices";
import { getfavorites } from "../favorites/slices";
import { getCart } from "../cart/slices";

export default function MainPage({}) {
  const [openNavbar, setOpenNavbar] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();

  const copyParams = new URLSearchParams(searchParams);

  const { products } = useAppSelector((state) => state.products);
  const productsLoading = useAppSelector((state) => state.products.loading);

  const handleChangeFilters = (key: string, value: string) => {
    if (
      copyParams.get(key)?.toLowerCase() === value ||
      !value
    ) {
      copyParams.delete(key);
    } else if (key === "_sort") {
      copyParams.set("_sort", "price");
      if (copyParams.get("_order")?.toLowerCase() === value) {
        copyParams.delete("_sort");
        copyParams.delete("_order");
      } else {
        copyParams.set("_order", value);
      }
    } else {
      copyParams.set(key, value);
    }

    if (key !== "_page") {
      copyParams.set("_page", "1");
    }
    setSearchParams(copyParams);
  };

  useEffect(() => {
    if (searchParams) {
      dispatch(fetchProducts(searchParams.toString()));
    }
  }, [searchParams]);

  const handleOpenNavbar = () => {
    setOpenNavbar(!openNavbar);
  };

  useEffect(() => {
    copyParams.set("_page", "1");
    setSearchParams(copyParams);

    dispatch(getfavorites());
    dispatch(getCart());
  }, []);

  return (
    <div className="wrapper">
      <Header
        handleChangeFilters={handleChangeFilters}
        handleOpenNavbar={handleOpenNavbar}
        searchParams={searchParams}
      />
      <Drawer
        open={openNavbar}
        onClose={() => setOpenNavbar(false)}
        placement="left"
      >
        <Navbar
          handleChangeFilters={handleChangeFilters}
          searchParams={searchParams}
        />
      </Drawer>
      <Sort
        handleChangeFilters={handleChangeFilters}
        searchParams={searchParams}
      />
      <div className="card-block">
        {productsLoading ? (
          <div
            style={{
              display: "flex",
              margin: 50,
              gap: 30,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[...Array(5).keys()].map((i) => (
              <CardAntd
                key={i}
                loading={productsLoading}
                style={{
                  minWidth: 300,
                  minHeight: 350,
                }}
              />
            ))}
          </div>
        ) : (
          <>
            {products.map((product) => (
              <Card product={product} key={product.id} />
            ))}
          </>
        )}
      </div>
      <Pagination
        current={
          searchParams.get("_page") ? Number(searchParams.get("_page")) : 1
        }
        total={23}
        align="center"
        onChange={(page) => handleChangeFilters("_page", String(page))}
      />
    </div>
  );
}
