import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { deletefavorites, addfavorites } from "../../pages/favorites/slices";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { ProductType } from "../../types";

export default function TofavoritesButton({
  product,
}: {
  product: ProductType;
}) {
  const { favorites } = useAppSelector((state) => state.favorites);

  const dispatch = useAppDispatch();

  const addTofavorites = () => {
    if (favorites.some((el) => el.id === product.id)) {
      dispatch(deletefavorites(product));
    } else {
      dispatch(addfavorites(product));
    }
  };

  const isfavorite = favorites.some((item) => item.id === product.id);

  return (
    <div onClick={addTofavorites}>
      {isfavorite ? (
        <HeartFilled
          style={{ fontSize: "40px", color: "rgb(248, 16, 75)" }}
        />
      ) : (
        <HeartOutlined style={{ fontSize: "40px", color: "#c7c7c7" }} />
      )}
    </div>
  );
}
