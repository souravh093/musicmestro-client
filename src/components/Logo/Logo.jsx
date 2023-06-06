import React from 'react';
import logo from "../../assets/logo.png"

const Logo = () => {
    return (
        <div className='flex items-center gap-2'>
            <img className='w-12' src={logo} alt="logo" />
            <h2 className='text-2xl font-semibold'>MusicMaestro</h2>
        </div>
    );
};

export default Logo;
