/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { selectUserInfo } from "./../store/slices/authSlice";
import fetchMyOrder from "./../apis/GET/fetchMyOrders";
import { GetOrderResponse } from "./../apis/types";
import { useEffect, useState } from "react";
import OrderDisplay from "./OrderDisplay";
import EmptyCart from "./EmptyCart";
import { RotateCw } from "lucide-react";
const MyOrders = () => {
  const [order, setOrder] = useState<GetOrderResponse | null>(null);
  const { user_id } = useSelector(selectUserInfo);
  const [error, setError] = useState(false);
  const [, setLoading] = useState(true);

  const getOrder = async () => {
    setLoading(true);
    try {
      const orderGET = await fetchMyOrder(user_id);
      setOrder(orderGET);
      console.log(orderGET);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  const recheckOrders = () => {
    getOrder();
  };

  return (
    <div className="flex flex-col gap-4 w-full p-3 h-screen bg-gray-50">
      <RotateCw
        onClick={recheckOrders}
        className="fixed right-4 bg-gray-500 text-white font-bold p-[2px] rounded-full h-[1.6rem] w-[1.6rem] z-60"
      />
      {error ? (
        <div className="flex flex-col gap-4">
          <EmptyCart />
          <div className="flex justify-center">
            <button onClick={getOrder}>Retry</button>
          </div>
        </div>
      ) : order && order.success ? (
        <OrderDisplay data={order.data} />
      ) : (
        <div className="pt-2 sticky top-[52px] z-50">
          <EmptyCart />
          <div className="pt-10 fixed z-60 bottom-10 right-10">
            <a
              className="group flex items-center justify-between gap-4 rounded-lg border border-red-600 bg-red-600 px-3 py-1 transition-colors hover:bg-transparent focus:outline-none focus:ring w-36"
              href="/ordercheckout"
            >
              <span className="font-semibold text-white transition-colors group-hover:text-red-600 group-active:text-red-500 text-md">
                Checkout
              </span>
              <span className="shrink-0 rounded-full border border-current bg-white p-1.5 text-red-600 group-active:text-red-500">
                <svg
                  className="h-3 w-3 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
