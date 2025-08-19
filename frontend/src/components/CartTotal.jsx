import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = ({ shippingCharge = 0 }) => {
  const { currency, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const total = subtotal + shippingCharge;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"TOTAL"} text2={"AMOUNT"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-l ">
        <div className="flex justify-between">
          <p>Product Price</p>
          <p>
            {currency}
            {subtotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Charge</p>
          <p>
            {currency}
            {shippingCharge}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total </b>
          <b>
            {currency}
            {subtotal === 0 ? 0 : total.toFixed(2)}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
