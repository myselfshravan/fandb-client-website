/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  selectDishItems,
  clearItems as DishClear,
} from "../store/slices/cartDishSlice";
import {
  selectDrinkItems,
  clearItems as DrinkClear,
} from "../store/slices/cartDrink";
import { resetCartItems } from "./../store/slices/menuSlice";
import { selectUserInfo } from "../store/slices/authSlice";
import { addOrder } from "./../store/slices/myOrdersSlice";
import {
  Orders,
  OrderDish,
  OrderDrink,
  ResponseDataOrders,
} from "./../apis/types";
import CartCard from "./CartCard";
import EmptyCart from "./EmptyCart";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./../src/components/ui/table";
import { Button } from "@/components/ui/button";
import axios, { AxiosResponse } from "axios";
import { TEST_URL } from "./../URL";

const Cart = () => {
  const dishItems = useSelector(selectDishItems);
  const drinkItems = useSelector(selectDrinkItems);
  const { tableNo, user_id , otp} = useSelector(selectUserInfo);
  const [isLoading,setIsLoading]=useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    const orderDishes: OrderDish[] = dishItems.map((item) => ({
      foodName: item.foodName,
      food_id: item.food_id,
      quantity: item.quantity_bought.toString(),
    }));

    const orderDrinks: OrderDrink[] = drinkItems.map((item) => ({
      drinkName: item.drinkName,
      quantity: item.quantity_bought.toString(),
      drink_id: item.drink_id,
    }));

    const order: Orders = {
      tableNo: tableNo,
      user_id: user_id,
      otp:otp,
      drinks: orderDrinks.length > 0 ? orderDrinks : undefined,
      dishes: orderDishes.length > 0 ? orderDishes : undefined,
    };

    const placeOrder = async (data: Orders) => {
      try {
        setIsLoading(true)
        const response: AxiosResponse<ResponseDataOrders> = await axios.post(
          `${TEST_URL}/api/client/setOrders`,
          data
        );
        dispatch(addOrder(response.data));
        dispatch(DishClear());
        dispatch(DrinkClear());
        dispatch(resetCartItems());
      } catch (error:any) {
        toast.error(`${error.response.data.message}`,{
          autoClose:1500
        });
      }  finally{
        setIsLoading(false)
      }
    };
    placeOrder(order);
  };

  return (
    <div className="w-full p-3 h-screen bg-gray-50">
      <ToastContainer
      toastClassName={() => 
        " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-800 text-sm p-4 m-4"
      }
      
    />
      {dishItems.length !== 0 && (
        <>
          <div className="text-xl font-bold text-gray-800">Dishes</div>
          <Table className="my-4 bg-white">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Dish</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dishItems.map((item) => {
                return (
                  <CartCard
                    key={item._id}
                    foodName={item.foodName}
                    foodPrice={item.foodPrice}
                    quantity_bought={item.quantity_bought}
                    food_id={item.food_id}
                    _id={""}
                    foodCategories={""}
                    food_category_id={""}
                    type={""}
                  />
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
      {drinkItems.length !== 0 && (
        <>
          <div className="text-xl font-bold text-gray-800 mt-4">Drinks</div>
          <Table className="bg-white my-4">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Dish</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drinkItems.map((item) => {
                return (
                  <TableRow>
                    <TableCell className="font-medium">
                      {item.drinkName}
                    </TableCell>
                    <TableCell>{item.drinkNamePrice}</TableCell>
                    <TableCell className="text-center">
                      {item.quantity_bought}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity_bought * parseInt(item.drinkNamePrice)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
      {dishItems.length === 0 && drinkItems.length === 0 ? (
        <div className="pt-2 sticky top-[52px] z-50">
          <EmptyCart />
        </div>
      ) : (
        <Button
        className="rounded-lg my-4 border-2 text-md bg-blue-600 font-semibold justify-center w-full"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Place order
      </Button>
      )}
      
    </div>
  );
};

export default Cart;
