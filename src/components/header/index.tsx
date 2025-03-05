import { Link } from 'react-router'
import {
  HeartOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import './index.scss'
import { debounce } from 'lodash'
import { Button, Input, Modal } from 'antd'
import { useAppSelector } from '../../reduxHooks'
import { useState } from 'react'
import { Login } from '../login'

type SearchParamsProps = {
  handleChangeFilters: (a: string, b: string) => void
  handleOpenNavbar: () => void
  searchParams: URLSearchParams
}

export const Header = ({
  handleChangeFilters,
  handleOpenNavbar,
  searchParams,
}: SearchParamsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const debouncedHandler = debounce(
    (e) => handleChangeFilters('q', e.target.value),
    500
  )

  const cartProducts = useAppSelector((state) => state.cart.cart)
  const favoritesProducts = useAppSelector((state) => state.favorites.favorites)

  const cartProductQuantity = cartProducts.length
  const favoritesProductQuantity = favoritesProducts.length

  const filters =
    searchParams.get('category') ||
    searchParams.get('price_gte') ||
    searchParams.get('price_lte') ||
    searchParams.get('brand')

  return (
    <header className="header">
      <Button
        size="large"
        type="text"
        icon={<UserOutlined style={{ fontSize: 30, color: '#fff' }} />}
        onClick={() => {
          setIsModalOpen(true)
        }}
      />
      <h1 className="logo">AM</h1>
      <div className="menu-icon" onClick={handleOpenNavbar}>
        <MenuOutlined />
        <div className={filters ? 'header-filters-on' : 'header-filters-off'} />
      </div>

      <Input
        onChange={debouncedHandler}
        defaultValue={searchParams.get('q') || ''}
      />

      <div className="header-icons">
        <div className="header-icon">
          <UserOutlined
            style={{ fontSize: '30px', color: '#fff' }}
          ></UserOutlined>

          <p>Войти</p>
        </div>

        <Link to="/favorites">
          <div className="header-icon">
            <HeartOutlined
              style={{ fontSize: '30px', color: '#fff' }}
            ></HeartOutlined>
            <p
              className={
                favoritesProductQuantity
                  ? 'header-icons-notification-on'
                  : 'header-icons-notification-off'
              }
            >
              {favoritesProductQuantity ? favoritesProductQuantity : ''}
            </p>
            <p>Избранное</p>
          </div>
        </Link>

        <Link to="/cart">
          <div className="header-icon">
            <ShoppingCartOutlined
              style={{ fontSize: '30px', color: 'white' }}
            />
            <p
              className={
                cartProductQuantity
                  ? 'header-icons-notification-on'
                  : 'header-icons-notification-off'
              }
            >
              {cartProductQuantity ? cartProductQuantity : ''}
            </p>
            <p>Корзина</p>
          </div>
        </Link>
      </div>

      <Modal
        footer={null}
        destroyOnClose
        open={isModalOpen}
        onCancel={closeModal}
      >
        <Login closeModal={closeModal} />
      </Modal>
    </header>
  )
}
