import React from 'react'

export default function Banner() {
    return (
        <div className='bg-primary-100 py-10 shadow-inner max-[520px]:mt-4'>
            <div className='container py-0 lg:px-10 md:px-10 mt-0 mb-0 mr-auto ml-auto'>
                <div className='flex flex-col items-center text-white'>
                    <h2 className='font-bold text-5xl mb-3 drop-shadow-md'>Conduit</h2>
                    <p className='text-xl'>A place to share your knowledge.</p>
                </div>
            </div>
        </div>
    )
}
