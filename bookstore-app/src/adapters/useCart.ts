import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * Number(item.price),
    0
  );

  return {
    items,
    totalQuantity,
    totalPrice: Math.round(totalPrice * 100) / 100,
    addItem: (book: { id: string; title: string; price: number }) =>
      dispatch(addToCart(book)),
    removeItem: (id: string) => dispatch(removeFromCart(id)),
    changeQty: (id: string, delta: number) =>
      dispatch(updateQuantity({ id, delta })),
    emptyCart: () => dispatch(clearCart()),
  };
};
