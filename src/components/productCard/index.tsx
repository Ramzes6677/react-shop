import { Link } from "react-router";
import TofavoritesButton from "../toFavoritesButton";
import ToCartButton from "../toCartButton";
import "./index.scss";
import { memo } from "react";
import { ProductType } from "../../types";

type Props = {
  product: ProductType;
};

export const Card = memo(({ product }: Props) => {
  const { img, brand, name, rating, price, id } = product;

  return (
    <div className="card">
      <Link to={`/product/${id}`}>
        <img height={200} src={img} alt="здесь было фото" />
      </Link>
      <div className="card-flex">
        <Link to={`/product/${id}`}>
          <div>
            <div>
              {brand.charAt(0).toUpperCase()+brand.slice(1)} {name}
            </div>
            <div style={{ marginTop: "10px" }}> Rating: {rating}</div>
            <h3 style={{ marginTop: "40px" }}>${price}</h3>
          </div>
        </Link>

        <div>
          <TofavoritesButton product={product} />
          <ToCartButton product={product} />
        </div>
      </div>
    </div>
  );
});
