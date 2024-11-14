import {createContext, useEffect, useMemo, useState} from "react";

export const CarrinhoContext = createContext();

function CarrinhoProvider ({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const itensLocalStorage = localStorage.getItem('cartItems');

        return itensLocalStorage ? JSON.parse(itensLocalStorage) : [];
    })

    useEffect(() => {
        if (cartItems !== undefined) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

     }, [cartItems]);

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

    const handleRemoveFromCart = (produto) => {
        setCartItems((prevItems) => {
            return prevItems.filter((item) => item.id !== produto.id);
        })
    }

    const handleClearCart = () => {
        setCartItems([]);

        localStorage.removeItem(cartItems);
    }

    const cartCount = useMemo(() => {
        return cartItems?.reduce((count, item) => count + item.quantidade, 0);
    }, [cartItems]);

    const cartTotal = useMemo(() => {
        return cartItems?.reduce((total, item) => total + item.preco * item.quantidade, 0);
    }, [cartItems]);

    return (
        <CarrinhoContext.Provider value={{ cartItems: cartItems ?? [], handleAddCart, handleRemoveFromCart, handleClearCart, cartCount, cartTotal }}>
            {children}
        </CarrinhoContext.Provider>
    );
}

export default CarrinhoProvider;