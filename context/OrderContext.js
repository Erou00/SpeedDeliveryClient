import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import Pusher from 'pusher-js';
import { useEffect } from "react";



const OrderContext = createContext({})

export const OrderProvider = ({children}) => {
   
    const [isLoad,setIsLoad] = useState(false)
    const [order,setOrder] = useState({})

    useEffect(() => {
        const pusher = new Pusher('ad7757b9128362fb10c9', {
          cluster: 'eu',
          encrypted: true,
        });
    
        const channel = pusher.subscribe("order-channel");
        channel.bind("order-add", (data) => {
          // Method to be dispatched on trigger.'
          console.log(data);
        });
    
        return () => {
          pusher.unsubscribe('order-channel');
        };
      }, []);

    return (
        <OrderContext.Provider value={{isLoad,setIsLoad,order}}>
          {children}
        </OrderContext.Provider>
    )

}

export const useOrderContext = () => useContext(OrderContext);
