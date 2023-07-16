import { useAppSelector } from "src/store/hooks";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className='container'>
      <p>
        Profile Name: <b>{user?.username}</b>:
      </p>
    </div>
  );
}
