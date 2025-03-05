import { useAppDispatch, useAppSelector } from '../../reduxHooks'
import ButtonBack from '../../components/buttonBack'
import CartItem from './CartItem'
import { useEffect } from 'react'
import { getCart } from './slices'

export default function CartPage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCart())
  }, [])

  const cartProducts = useAppSelector((state) => state.cart.cart)

  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  )

  return (
    <div>
      {cartProducts.length ? (
        <div className="">
          {cartProducts.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <h3>Товаров в корзине нет</h3>
      )}
      <div className="total-price">
        <h3>Итого:</h3>
        <h2>${totalPrice}</h2>
      </div>
      <ButtonBack />
    </div>
  )
}
