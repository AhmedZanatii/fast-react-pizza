/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import Button from '../../UI/Button';
import { decItemQuantity, incItemQuantity } from './cartSlice';

function UpdateItemCard({ pizzaId, currQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => dispatch(decItemQuantity(pizzaId))}>
        -
      </Button>
      <span className="text-sm font-medium ">{currQuantity}</span>
      <Button type="round" onClick={() => dispatch(incItemQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemCard;
