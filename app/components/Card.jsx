'use client'
import Image from 'next/image';
import React, { useContext } from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { FaLessThan } from 'react-icons/fa';
import { ContextProvider } from '../context/CardReducer';

const Card = () => {

    const context = useContext(ContextProvider);
    if (!context) {
        throw new Error('CardContext should be used within CardContextProvider');
    };
    const {state, handleRemoveFromCard, isOpen, handleIsOpen, handleQuantity} = context;

    const calculateTotal = () => {
        return state.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

  return (
    <div className='space-y-2'>
        {/** ---------- OPEN && CLOSE SHOPPING CARD ---------- */}
        <button
            className='absolute left-[-40px] top-10 bg-white text-[#003d6b] p-2 rounded-lg'
            onClick={() => handleIsOpen()}
        >
           {isOpen ? <FaGreaterThan /> : <FaLessThan />}
        </button>

        {/** ---------- CONDITIONAL RENDERING ---------- */}
        {state.length === 0 ? (
            <div className={`text-center text-[#003d6b] font-bold ${!isOpen ? 'scale-x-0' : 'duration-500'}`}>
                Your cart is empty!
            </div>
        ) : (
            state.map((item, index) => (
                <div key={index} className={`flex gap-2 items-center justify-between bg-white p-2 rounded-md shadow-md relative ${!isOpen ? 'scale-x-0' : 'duration-500'}`}>
                    <section className='flex gap-2'>
                        <Image src={item.image} alt='image' width={50} className='rounded-lg border-2 border-[#003d6b]' />
                        <article className='flex flex-col'>
                            <span className='text-[#003d6b]'>{item.name}</span>
                            <span className='text-green-700 font-bold'>${item.price}</span>
                        </article>
                    </section>
                    <section className='space-x-2 text-sm pt-2'>
                        <button className='bg-[#003d6b] text-#ededed rounded-md px-2 hover:bg-[#1c4c70]' onClick={() => handleQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className='text-[#003d6b]'>{item.quantity}</span>
                        <button className='bg-[#003d6b] text-#ededed rounded-md px-2 hover:bg-[#1c4c70]' onClick={() => handleQuantity(item.id, item.quantity + 1)}>+</button>
                    </section>

                    {/** ---------- REMOVE ITEM ---------- */}
                    <button className='absolute top-0 right-2 text-[#003d6b]' onClick={() => handleRemoveFromCard(item)}>x</button>
                </div>
            ))
        )}

        {/** ---------- CHECKOUT BUTTON ---------- */}
        <section className={`flex justify-between items-center bg-white p-2 rounded-md shadow-md ${!isOpen ? 'scale-x-0' : 'duration-500'}`}>
            <div className='flex flex-col'>
                <span className='text-[#003d6b] font-bold'>Total: </span>
                <span className='text-green-700 font-bold'>
                    ${calculateTotal()}
                </span>
            </div>

            <button className='bg-[#003d6b] text-white px-4 py-2 rounded-md hover:bg-[#1c4c70]'>
                Checkout
            </button>
        </section>

    </div>
  )
}

export default Card;