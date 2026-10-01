'use client'
import React from 'react';
import { Providers } from './Provider'

const RootLayouts = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <Providers>
            {children}
        </Providers>
    );
};

export default RootLayouts;


