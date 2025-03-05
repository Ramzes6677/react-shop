import { Card } from "../../components/productCard";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import ButtonBack from "../../components/buttonBack";
import { useEffect } from "react";
import { getfavorites } from "./slices";

export default function favoritePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getfavorites());
  }, []);

  const favorites = useAppSelector((state) => state.favorites.favorites);
  return (
    <div>
      {favorites.length ? (
        <div className="card-block">
          {favorites.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <h3>Товаров в избранном нет</h3>
      )}
      <ButtonBack />
    </div>
  );
}
