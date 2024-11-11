import {useContext} from "react";
import {CartContext} from '../../contexts/CartContext';

function Carrinho() {
    const {cartItems} = useContext(CartContext);

    return (
        <div>
            <h1>Carrinho</h1>
            <p>{JSON.stringify(cartItems)}</p>
            {cartItems.length === 0 ? (
                <p>Carrinho está vazio.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div>
                            <p>{item.name}</p>
                            <p>Quantidade: {item.quantidade}</p>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default Carrinho;

