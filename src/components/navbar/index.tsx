import { Flex, Input, Select, Slider } from 'antd'
import './index.scss'
import { debounce } from 'lodash'
import { SearchParamsProps } from '../../types'
import { Form } from 'antd'
import { useGetPostsQuery } from '../../services/apiSlice'

export default function Navbar({
  handleChangeFilters,
  searchParams,
}: SearchParamsProps) {
  const { data: brands, error, isLoading } = useGetPostsQuery()

  const selectedCategory = searchParams.get('category')

  const debouncedHandlerPrice = debounce(
    (key: string, value: string) => handleChangeFilters(key, value),
    500
  )

  const handleChange = (value: string) => {
    handleChangeFilters('brand', value)
  }

  return (
    <div className="navbar">
      <div className="category-block">
        <div
          onClick={() => handleChangeFilters('category', 'phone')}
          className={selectedCategory === 'phone' ? 'active' : ''}
        >
          Телефоны
        </div>
        <div
          onClick={() => handleChangeFilters('category', 'laptop')}
          className={selectedCategory === 'laptop' ? 'active' : ''}
        >
          Ноутбуки
        </div>
        <div
          onClick={() => handleChangeFilters('category', 'monitor')}
          className={selectedCategory === 'monitor' ? 'active' : ''}
        >
          Мониторы
        </div>
      </div>
      <p>Брэнды</p>
      <Form.Item layout="vertical">
        <Select
          options={brands?.map((brand) => ({ value: brand, label: brand }))}
          loading={isLoading}
          onChange={handleChange}
          allowClear
        />
      </Form.Item>

      <div className="price-block">
        <p>Цена</p>
        <Flex gap="middle">
          <Input
            onChange={(e) => debouncedHandlerPrice('price_gte', e.target.value)}
            defaultValue={searchParams.get('price_gte') || ''}
          />
          -
          <Input
            onChange={(e) => debouncedHandlerPrice('price_lte', e.target.value)}
            defaultValue={searchParams.get('price_lte') || ''}
          />
        </Flex>
        {/* <Slider range defaultValue={[0, 10000]} max={10000} /> */}
      </div>
    </div>
  )
}
