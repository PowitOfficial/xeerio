import React from 'react'
import NavBar from "../components/navBar";
import Head from "next/head";
import fetch from "isomorphic-fetch"
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Dashboard = ({ query, domainExtensions, localDomainExtension, socialMedia }) => {

    var url = "http://localhost:8080/checkDomains?name=" + query.name + "&domain=" + localDomainExtension;
    const { data, error } = useSWR(url, fetcher)

    function arrayDiff(a1, a2) {
        var a = [], diff = [];
        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
        for (var k in a) {
            diff.push(k);
        }
        return diff;
    }

    if (error) {
        return (
            <div><h2>An error ocurred: {error}</h2></div>
        )
    }
    if (!data) {
        return (
            <div>
                <Head>
                    <title>Xeerio | Dashboard</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                    <meta name="description" content="Check the availability of your idea, upcoming product or company in terms of domain names, social media, trademarks and check the strength and originality of your name in mind." />
                    <link rel="stylesheet" href="/static/main.css" key="main" />
                    <link
                        rel="stylesheet"
                        href="/static/dashboard.css"
                        key="header"
                    />
                    <link
                        rel="shortcut icon"
                        type="image/x-icon"
                        href="/static/favicon.ico"
                    />
                </Head>
                {/* Add navigation component */}
                <NavBar loading={true} />

                {/* Add the header on homepage */}
                <div className="container">
                    <h2>Generating your report ...</h2>
                    <p>Sit back while we're searching off the internet.</p>

                    <div className="cards">
                        <div className="domainCard">
                            <h3>Domain</h3>
                            <p>Domain names that are (un)available.</p>
                            <div className="domains">
                                {domainExtensions.map((domainExtension) => (
                                    <p className="domain loading">{domainExtension}</p>
                                ))}
                            </div>
                        </div>

                        <div className="socialmediaCard">
                            <h3>Social Media</h3>
                            <p>Social Media platforms that are (un)available.</p>
                            <div className="socialmedia">
                                {socialMedia.map((platform) => (
                                    <p className="account unavailable">{platform}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Head>
                <title>Xeerio | Dashboard</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="stylesheet" href="/static/main.css" key="main" />
                <link
                    rel="stylesheet"
                    href="/static/dashboard.css"
                    key="header"
                />
                <link
                    rel="shortcut icon"
                    type="image/x-icon"
                    href="/static/favicon.ico"
                />
            </Head>
            {/* Add navigation component */}
            <NavBar loading={false} />

            {/* Add the header on homepage */}
            <div className="container">
                {data.domains.length > 3 ? <h2>Great choice!</h2> : <h2>Oops, bad news</h2>}
                <p>Here's your personal report for <span className="name">{query.name}</span>.</p>

                <div className="cards">
                    <div className="domainCard">
                        <h3>Domain</h3>
                        <p>Domain names that are (un)available.</p>
                        <div className="domains">
                            {data.domains.map((domainExtension) => (
                                <p className="domain available">.{domainExtension}</p>
                            ))}
                            {arrayDiff(domainExtensions, data.domains).map((domainExtension) => (
                                <p className="domain unavailable">.{domainExtension}</p>
                            ))}
                        </div>
                    </div>

                    <div className="socialmediaCard">
                        <h3>Social Media</h3>
                        <p>Social Media platforms that are (un)available.</p>
                        <div className="socialmedia">
                            {data.usernames.map((platform) => (
                                <p className={"account " + platform}>{platform}</p>
                            ))}
                            {arrayDiff(socialMedia, data.usernames).map((platform) => (
                                <p className="account unavailable">{platform}</p>
                            ))}
                        </div>
                    </div>

                    <div className="registerCard">
                        <div className="content">
                            <p className="subtitle">Register your idea</p>
                            <p className="title">Want to register your name?</p>
                        </div>
                        <div className="actions">
                            <a className="button">Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


Dashboard.getInitialProps = async ({ query }) => {
    var domainExtensions = ["com", "net", "io", "shop", "org", "co", "me"];
    var socialMedia = ["facebook", "instagram", "youtube", "twitter", "tumblr", "pinterest"];
    var localDomainExtension = await fetch("http://localhost:3000/getLocalExtension")
    localDomainExtension = await localDomainExtension.json()
    domainExtensions.push(localDomainExtension)
    console.log(localDomainExtension);
    return { query, domainExtensions, localDomainExtension, socialMedia }
}

export default Dashboard;
