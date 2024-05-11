/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import store from '../../store';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalPrices } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const formError = useActionData();
  const navigate = useNavigation();
  const price = useSelector(getTotalPrices);
  const dispatch = useDispatch();
  const priorityPrice = withPriority ? price * 0.2 : 0;
  const totalPrice = price + priorityPrice;
  const isSubmitting = navigate.state === 'submitting';
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === 'loading';
  if (!cart.length) return <EmptyCart />;

  return (
    <div className=" px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold ">Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div className="mb-5 flex  flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-32">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              defaultValue={userName}
              className="input "
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-32">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input" required />
            {formError?.phone && (
              <p className=" mt-2 w-fit rounded-md  bg-red-300 px-3 py-1 text-xs text-red-700">
                {' '}
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-32">Address</label>
          <div className="grow">
            <input type="hidden" value={JSON.stringify(cart)} name="cart" />
            <input
              type="hidden"
              value={
                position.latitude && position.longitude
                  ? `${position.latitude}${position.longitude}`
                  : ''
              }
              name="position"
            />

            <input
              type="text"
              name="address"
              className="input "
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className=" mt-2 w-fit rounded-md  bg-red-300 px-3 py-1 text-xs text-red-700">
                {' '}
                {addressError}
              </p>
            )}
          </div>
          <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]    ">
            {!position.longitude && !position.latitude && (
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  dispatch(fetchAddress());
                  e.preventDefault();
                }}
              >
                {' '}
                get position
              </Button>
            )}
          </span>
        </div>

        <div className=" mb-16 flex items-center  gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 cursor-pointer accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 "
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting
              ? 'placing order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  console.log('🚀 ~ action ~ order:', order);

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Invalid phone number';
  }
  if (Object.keys(errors).length) {
    return errors;
  }
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
  // return null;
}

export default CreateOrder;
