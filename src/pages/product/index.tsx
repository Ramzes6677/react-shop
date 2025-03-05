import { useParams } from "react-router";
import { loadProduct } from "./slices";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { useEffect } from "react";
import "./index.scss";
import ToCartButton from "../../components/toCartButton";
import TofavoritesButton from "../../components/toFavoritesButton";
import ButtonBack from "../../components/buttonBack";
import ProductComments from "./comments";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { product } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(loadProduct(id));
    }
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { img, name, brand, price, rating, description } = product;

  return (
    <>
      <div className="product-page-block">
        <img height={400} src={img} alt="здесь было фото" />
        <div className="product-page-content">
          <div>
            <div>
              {brand.charAt(0).toUpperCase() + brand.slice(1)} {name}
            </div>
            <div style={{ marginTop: "10px" }}> Rating: {rating}</div>
            <h3 style={{ marginTop: "40px" }}>${price}</h3>
            <p>{description}</p>
          </div>

          <div className="product-page-icons">
            <TofavoritesButton product={product} />
            <ToCartButton product={product} />
          </div>
        </div>
        <ButtonBack />
      </div>

      <ProductComments productID={Number(id)} />
    </>
  );
}
