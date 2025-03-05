import { Button, Form, Input} from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { login, registration } from "./slices";
import { Link } from "react-router";

type UserFormType = {
  userName: string;
  login: string;
  password: string;
  phoneNumber: string;
};

export const Login = ({ closeModal }: { closeModal: () => void }) => {
  const [openRegistration, setOpenRegistration] = useState(false);
  const { user, error } = useAppSelector((state) => state.registration);

  useEffect(() => {
    if (
      error === "Пользователь с таким логином или телефоном уже зарегистрирован"
    ) {
      setOpenRegistration(false);
      form.resetFields();
    }
  }, [error]);

  // useEffect(() => {
  //   if (user) {
  //     closeModal();
  //   }
  // }, [user]);

  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const handleFinish = async (values: UserFormType) => {
    if (values.phoneNumber) {
      dispatch(registration(values));
      return;
    }
    dispatch(login(values));
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <p style={{ marginBottom: "10px", color: "red", fontSize: "14px" }}>
        {error}
      </p>
      {user ? (
        <>
          <p style={{ marginBottom: "10px", color: "green", fontSize: "14px" }}>
            {user.userName}, вы успешно авторизовались
          </p>
          <Link to="/admin">Перейти на страницу администратора</Link>
        </>
      ) : (
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="login"
            rules={[
              {
                required: true,
                min: 5,
                message: "Количество символов должно быть больше пяти",
              },
            ]}
          >
            <Input placeholder="Введите логин" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                min: 8,
                message: "Ненадежный пароль",
              },
            ]}
          >
            <Input placeholder="Введите пароль" />
          </Form.Item>
          {openRegistration && (
            <>
              <Form.Item
                name="userName"
                rules={[
                  {
                    required: true,
                    min: 1,
                    message: "Введите имя",
                  },
                ]}
              >
                <Input placeholder="Ваше имя" />
              </Form.Item>
              <Form.Item name="phoneNumber">
                <Input placeholder="Номер телефона" />
              </Form.Item>
            </>
          )}
          <Button htmlType="submit">
            {openRegistration ? "Зарегистрироваться" : "Войти"}
          </Button>
          {!openRegistration && (
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              onClick={() => setOpenRegistration(true)}
            >
              Регистрация
            </Button>
          )}
        </Form>
      )}
    </div>
  );
};
