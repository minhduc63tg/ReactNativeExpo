import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { loginFake, logout } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  return {
    isLoggedIn,
    user,
    login: () => dispatch(loginFake()),
    logoutUser: () => dispatch(logout()),
  };
};
