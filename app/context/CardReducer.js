'use client'
import { createContext, useReducer, useState } from "react";

export const ContextProvider = createContext();

export const CardContextProvider = ({children}) => {

    function cardReducer(state, action) {
        switch(action.type) {
            case 'ADD_TO_CARD':
                return [
                    ...state,
                    action.payload
                ]

            case 'REMOVE_FROM_CARD':
                return state.filter((item) => item.id !== action.payload.id);

            case 'UPDATE_QUANTITY':
                return state.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                );

            return state;
        }
    }

    const [state, dispatch] = useReducer(cardReducer, []);

    // ---------- HANDLE ADD_TO_CARD ----------
    const handleAddToCard = (item) => {
        const itemWithQuantity = { ...item, quantity: item.quantity || 1 };

        const itemExists = state.some(cartItem => cartItem.id === itemWithQuantity.id);

        if (itemExists) {
            alert('Item already in SHOPPING CARD');
        } else {
            dispatch({
                type: 'ADD_TO_CARD',
                payload: itemWithQuantity
            });
            console.log('Added to cart: ', itemWithQuantity);
        }
    }

    const handleRemoveFromCard = (item) => {
        dispatch({
            type: 'REMOVE_FROM_CARD',
            payload: item
        });
        console.log('Removed item: ', item);
    }

    const handleQuantity = (id, quantity) => {
        if (isNaN(quantity) || quantity < 1) {
            return;
        }
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id, quantity }
        });
    }

    // ---------- HANDLE OPEN && CLOSE SHOPPING CARD ----------
    const [isOpen, setIsOpen] = useState(false);
    const handleIsOpen = () => {
        setIsOpen(prevOpen => prevOpen = !isOpen);
    }

    return <ContextProvider.Provider
        value={{
            state, handleAddToCard, handleRemoveFromCard,
            isOpen, handleIsOpen, handleQuantity
        }}
    >
        {children}
    </ContextProvider.Provider>
}