import { Link, useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
function LinkButton({ to, children }) {
  const className = 'text-sm text-blue-500 hover:text-blue-900 hover:underline';
  const navigate = useNavigate();

  if (to === '-1')
    return (
      <button className={className} type="primary" onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
