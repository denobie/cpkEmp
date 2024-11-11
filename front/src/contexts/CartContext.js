import {createContext, useState} from "react";

export const CartContext = createContext();

function CartProvider ({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const handleAddCart = (produto, quantidade) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((item) => item.id === produto.id);

            if (itemExists) {
                return prevItems.map((item) =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + quantidade }
                        : item
                );
            } else {
                return [...prevItems, { ...produto, quantidade }];
            }
        });
    };

    return (
        console.log(cartItems),
        <CartContext.Provider value={{ cartItems, handleAddCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;