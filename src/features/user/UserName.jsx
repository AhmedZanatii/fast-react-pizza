import { useSelector } from 'react-redux';

function UserName() {
  const user = useSelector((state) => state.user.userName);
  if (!user) return null;
  return (
    <div className="hidden text-sm font-semibold uppercase md:block">
      {user}
    </div>
  );
}

export default UserName;
