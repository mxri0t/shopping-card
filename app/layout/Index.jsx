'use client'
import React, { useContext } from 'react'
import products from '../products'
import Image from 'next/image'
import { ContextProvider } from '../context/CardReducer';
import Card from '../components/Card';

const Index = () => {

    const context = useContext(ContextProvider);
    if (!context) {
        throw new Error('CardContext should be used within CardContextProvider');
    };
    const {handleAddToCard, isOpen} = context;

  return (
    <div className='flex flex-col gap-8 md:justify-center items-center h-screen py-12 md:pt-0'>
        {/** ========== Header ========== */}
        <div className={`text-4xl font-bold text-[#ededed]`}> 🛒 <span className='text-yellow-500'>Shop</span>piMe</div>
        {/** ========== Products ========== */}
        <section className='grid grid-cols-2 md:grid-cols-3 gap-4 overflow-x-auto md:overflow-hidden'>
            {products.map((item, index) => (
                <div key={index} className='bg-[#ededed] p-1 rounded-md shadow-md space-y-2'>
                    <section>
                        <Image src={item.image} alt='image' width={200} />
                    </section>
                    <section className='flex justify-between items-center'>
                        <article className='text-md text-[#003d6b] md:text-lg xl:text-2xl'>{item.name}</article>
                        <article className='font-bold text-green-700 text-sm md:text-lg xl:text-xl'>${item.price}</article>
                    </section>
                    <section className='max-w-[12em] text-sm text-gray-500'>
                        {item.description}
                    </section>
                    <section className='flex justify-center items-center'>
                        <button
                            className='bg-yellow-500 w-full py-2 rounded-md hover:bg-yellow-400 font-bold text-[#003d6b]'
                            onClick={() => handleAddToCard(item)}
                        >Add to card</button>
                    </section>
                </div>
            ))}
        </section>

        {/** ---------- CARD ---------- */}
        <section className={`absolute right-0 top-0 h-screen bg-yellow-600 w-[20em] p-4 space-y-4 duration-300 ${!isOpen ? 'p-[0px] w-[0px]' : ''}`}>
            <span className={`flex justify-center items-center text-2xl bg-[#003d6b] rounded-md py-4 ${!isOpen ? 'scale-x-0' : 'duration-500'}`}>🧺 SHOPPING CARD</span>
            <Card />
        </section>

    </div>
  )
}

export default Index