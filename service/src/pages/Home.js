import { useEffect } from "react";
import { useOrderDetailsContext } from "../hooks/useOrderDetailsContext";
import OrderDetails from "../components/OrderDetail";
import OrderDetailForm from "../components/OrderDetailForm";
import "./Home.css";

const Home = () => {
  const { orderdetails, dispatch } = useOrderDetailsContext();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch('/api/orderDetails'); // Remove trailing slash
        if (response.ok) {
          const json = await response.json();
          dispatch({ type: 'SET_ORDERDETAILS', payload: json });
        } else {
          console.error("Failed to fetch order details:", response.status);
        }
      } catch (error) {
        console.error("Error while fetching order details:", error);
      }
    };
    fetchOrderDetails();
  }, [dispatch]); // Add 'dispatch' to the dependency array

  return (
    <div className="home">
      <div className="orderdetails-container">
        <OrderDetailForm />
      </div>
      <div className="orderdetails">
        {orderdetails && orderdetails.map((orderdetail) => (
          <OrderDetails orderdetail={orderdetail} key={orderdetail._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
