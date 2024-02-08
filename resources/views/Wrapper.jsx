
import Header from '@/components/Header';
import React from "react";
import { Outlet } from "react-router-dom";


export const AppWrapper = () => {
    return (
        <div className='min-h-svh'>
            <Header/>
            <div>
                <Outlet />
            </div>
        </div>
    );
};
