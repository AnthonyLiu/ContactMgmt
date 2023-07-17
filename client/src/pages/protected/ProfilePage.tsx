import { useAppSelector } from "src/store/hooks";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { attemptGetUser } from "../../store/thunks/user";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.user.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attemptGetUser())
      .then((userData) => {
        console.log(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [dispatch]);

  return (
    <div className='container'>
      <p>
        Profile Name: <b>{user?.username}</b>:
      </p>
    </div>
  );
}
