import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

function Header() {
  return (
    <header className="font-pizza flex items-center justify-between border-b border-stone-200 bg-yellow-500 p-4 px-4 py-3">
      <Link to="/" className="tracking-widest">
        Fast react pizza co.{' '}
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
