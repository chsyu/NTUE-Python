import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Radio, Button } from "antd";
import { savePaymentMethod } from "../actions/orderActions"

export default function PaymentMethodCard() {

   const { paymentMethod } = useSelector((state) => state.cart);
   const dispatch = useDispatch();

   const history = useHistory()
   const [form] = Form.useForm();

   const handleSubmit = (values) => {
      dispatch(savePaymentMethod(values));
      history.push('/placeorder');
   };

   return (
      <Form
         onFinish={handleSubmit}
         name="normal_login"
         className="register-form"
         initialValues={{paymentMethod}}
         form={form}
      >

         <Form.Item name="paymentMethod" label="Payment Method: ">
            <Radio.Group>
               <Radio value="Google">Google</Radio>
               <Radio value="PayPal">PayPal</Radio>
               <Radio value="Line">Line</Radio>
            </Radio.Group>
         </Form.Item>

         <Form.Item>
            <Button
               type="primary"
               htmlType="submit"
               className="login-form__button"
            >
               Continue
        </Button>
         </Form.Item>
      </Form>
   );
}

