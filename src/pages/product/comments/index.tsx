import { Button, Input, Form } from "antd";
import "./index.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { createComment, loadComments } from "../slices";

type CommentFormType = {
  userName: string;
  text: string;
};

export default function ProductComments({ productID }: { productID: number }) {
  const dispatch = useAppDispatch();

  const { comments } = useAppSelector((state) => state.product);

  const [form] = Form.useForm();

  const handleFinish = (values: CommentFormType) => {
    dispatch(
      createComment({ ...values, productID, date: new Date().toLocaleString() })
    );

    form.resetFields();
  };

  useEffect(() => {
    dispatch(loadComments(productID));
  }, [productID]);

  return (
    <div className="product-page-comments">
      <h2>Комментарии</h2>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item name="userName">
          <Input placeholder="Укажите имя" />
        </Form.Item>
        <Form.Item name="text">
          <Input.TextArea placeholder="Комментарий" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form>

      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="product-comments-block">
            <span>{comment.userName}</span>
            <span>{comment.date}</span>
            <div>{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
