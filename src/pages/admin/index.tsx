import { Button, Form, Input, message, Select } from "antd";
import { useAppDispatch } from "../../reduxHooks";
import { ProductType } from "../../types";
import { AddProduct } from "../main/slices";
import ButtonBack from "../../components/buttonBack";

export const AdminPage = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const handleFinish = (values: ProductType) => {
    dispatch(AddProduct(values));
    form.resetFields();
    message.success("Товар добавлен");
  };

  return (
    <>
      <div style={{ marginLeft: 100 }}>
        <h1 style={{ marginBottom: 20 }}>Добавление товара</h1>
        <Form
          onFinish={handleFinish}
          layout="vertical"
          wrapperCol={{
            span: 10,
          }}
        >
          <Form.Item
            name="brand"
            label="Брэнд"
            required
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="name"
            label="Название"
            required
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            name="price"
            label="Цена в долларах"
            required
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="category"
            label="Категория"
            required
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Select
              options={[
                { value: "laptop", label: "ноутбук" },
                { value: "phone", label: "телефон" },
                { value: "monitor", label: "монитор" },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Описание"
            required
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input.TextArea></Input.TextArea>
          </Form.Item>
          <Form.Item name="rating" label="Рейтинг" initialValue={1} noStyle>
            <Input type="hidden"></Input>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Количество"
            initialValue={1}
            noStyle
          >
            <Input type="hidden"></Input>
          </Form.Item>
          <Form.Item
            name="img"
            label="Ссылка на фото"
            required
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input></Input>
          </Form.Item>

          <Button htmlType="submit">Добавить товар</Button>
        </Form>
      </div>
      <ButtonBack />
    </>
  );
};
