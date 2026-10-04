import React, { FC } from 'react';

interface IHeadProps {
    title?: string,
    description?: string;
    keywords?: any;
}

const Heading: FC<IHeadProps> = ({ title, description, keywords }) => {
    return (
        <>
            <title>{title}</title>
            <link rel="icon" type="image/x-icon" href="/public/logo-qsg.png"></link>
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="viewport" content='width=device-width, initial-scale=1' />
            <meta property="og:site_name" content="Quizzy" data-rh="true"></meta>
        </>
    );
};

export default Heading;