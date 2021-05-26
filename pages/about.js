import NavBar from "../components/navBar";
import Head from "next/head";

const About = () => {
    return (
        <div>
            <Head>
                <title>Xeerio | About us</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta name="description" content="Check the availability of your idea, upcoming product or company in terms of domain names, social media, trademarks and check the strength and originality of your name in mind." />
                <link rel="stylesheet" href="/statc/main.css" key="main" />
                <link
                    rel="stylesheet"
                    href="/static/about.css"
                    key="contact"
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
            <NavBar />
            <div className="container">
                <h2>What is xeerio?</h2>
                <p>Xeerio is an innovative web application, built with the newest <span className="bold">open-source technologies</span> on the market. Together with <a href="https://www.youtubedld.com" target="_blank" className="link">YouTubeDLD</a> it is part of the powit.io organisation, operated by Jens Brehmen. <br /> </p>

                <h2>We value people like <span className="highlight">you</span></h2>
                <p>We refuse to use any third-party implementations that might invade our customers' privacy. Everything you do on our website is <span className="bold">anonymously</span> logged and won't be shared.</p>
                <p>This web app doesn't make use of <span className="bold">cookies</span> and none of your information is been stored or captured.</p>

                <h2>Yes, Xeerio is a free product.</h2>
                <p>Our main focus is to offer our technologies to as much people as possible. With both Xeerio and YouTubeDLD being free to use, our audience has never been so broud.</p>
            </div>
        </div>
    );
};

export default About;
