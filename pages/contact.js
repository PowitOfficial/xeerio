import NavBar from "../components/navBar";
import Head from "next/head";

const Contact = () => {
    return (
        <div>
            <Head>
                <title>Xeerio | Contact us</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta name="description" content="Check the availability of your idea, upcoming product or company in terms of domain names, social media, trademarks and check the strength and originality of your name in mind." />
                <link rel="stylesheet" href="/static/main.css" key="main" />
                <link
                    rel="stylesheet"
                    href="/static/contact.css"
                    key="contact"
                />
                <link
                    rel="shortcut icon"
                    type="image/x-icon"
                    href="/static/favicon.ico"
                />
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-YP7TCN9ZEX"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());
                    gtag('config', 'G-YP7TCN9ZEX');
                </script>
            </Head>
            <NavBar />
            <div className="container">
                <h2>Wanna get in touch?</h2>
                <p>Contact us directly below</p>
                <a href="mailto:powit.be@gmail.com" className="button">Send an email</a>
            </div>
        </div>
    );
};

export default Contact;
