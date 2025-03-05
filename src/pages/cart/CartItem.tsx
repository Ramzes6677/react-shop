import { useAppDispatch } from '../../reduxHooks'
import { ProductType } from '../../types'
import './index.scss'
import { deleteFromCart, updateProductCart } from './slices'
import { DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router'

export default function CartItem({ product }: { product: ProductType }) {
  const { img, brand, name, rating, price, id, quantity } = product
  const dispatch = useAppDispatch()

  const handleChangePlusQuantity = () => {
    dispatch(updateProductCart({ ...product, quantity: quantity + 1 }))
  }

  const handleChangeMinusQuantity = () => {
    if (quantity > 1) {
      dispatch(updateProductCart({ ...product, quantity: quantity - 1 }))
    }
  }

  return (
    <div className="cart-item-block">
      <div className="display-flex">
        <Link to={`/product/${id}`}>
          <div
            style={{
              width: '150px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img height={100} src={img} alt="здесь было фото" />
          </div>
        </Link>
        <Link to={`/product/${id}`}>
          <div className="cart-item-title">
            {brand.charAt(0).toUpperCase() + brand.slice(1)} {name}
          </div>
        </Link>
      </div>

      <div className="display-flex">
        <div className="cart-item-quantity">
          <button onClick={handleChangeMinusQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={handleChangePlusQuantity}>+</button>
        </div>
        <h3 style={{ width: '70px' }} className="cart-item-price">
          ${price * quantity}
        </h3>
        <DeleteOutlined
          onClick={() => dispatch(deleteFromCart(product))}
          style={{ fontSize: '30px', color: 'red' }}
        />
      </div>
    </div>
  )
}
