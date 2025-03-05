import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { addToCart, deleteFromCart } from "../../pages/cart/slices";
import { ProductType } from "../../types";

export default function ToCartButton({ product }: { product: ProductType }) {
  const cartProducts = useAppSelector((state) => state.cart.cart);

  const dispatch = useAppDispatch();

  const onClickAddToCart = () => {
    if (cartProducts.some((el) => el.id === product.id)) {
      dispatch(deleteFromCart(product));
    } else {
      dispatch(addToCart(product));
    }
  };

  const color = cartProducts.some((item) => item.id === product.id)
    ? "#4AE957"
    : "#c7c7c7";

  return (
    <ShoppingCartOutlined
      onClick={onClickAddToCart}
      style={{ fontSize: "40px", color: color }}
    />
  );
}
