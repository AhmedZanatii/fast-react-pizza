import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Button({ disabled, children, to, type, onClick }) {
  const base =
    ' inline-block uppercase rounded-full text-sm bg-yellow-400  font-semibold text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ';
  const styles = {
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
    secondary:
      ' px-4 py-2.5 text-sm md:px-6 md:py-3.5 inline-block rounded-full   font-semibold text-stone-400 transition-colors focus:text-stone-800 hover:text-stone-800 duration-300 hover:bg-stone-300 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 border-2 corder-stone400 focus:ring-offset-2 disabled:cursor-not-allowed ',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button disabled={disabled} onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
