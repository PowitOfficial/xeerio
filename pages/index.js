import React from 'react'
import NavBar from "../components/navBar";
import Header from "../components/Header/Header"
import Head from "next/head";

const Index = () => {
    return (
        <div>
            <Head>
                <title>Xeerio | Name Checker</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta name="description" content="Check the availability of your idea, upcoming product or company in terms of domain names, social media, trademarks and check the strength and originality of your name in mind." />
                <link rel="stylesheet" href="/statc/main.css" key="main" />
                <link
                    rel="stylesheet"
                    href="/static/components/header.css"
                    key="header"
                />
                <link
                    rel="stylesheet"
                    href="/static/components/inputField.css"
                    key="inputfield"
                />
                <link
                    rel="shortcut icon"
                    type="image/x-icon"
                    href="/static/favicon.ico"
                />
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=G-YP7TCN9ZEX`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-YP7TCN9ZEX', {
                    page_path: window.location.pathname,
                    });
                `,
                    }}
                />
            </Head>
            {/* Add navigation component */}
            <NavBar />

            {/* Add the header on homepage */}
            <Header />
        </div>
    )
}

export default Index;
