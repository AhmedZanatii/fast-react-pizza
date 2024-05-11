import { useSelector } from 'react-redux';
import Button from '../../UI/Button';
import { getTotalItems, getTotalPrices } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalItems);
  const totalCartPrice = useSelector(getTotalPrices);
  if (!totalCartQuantity) return;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-6">
      <p className="space-x-4 text-sm font-semibold text-stone-300 sm:space-x-6 md:text-base">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Button to="/cart">Open cart &rarr;</Button>
    </div>
  );
}

export default CartOverview;
