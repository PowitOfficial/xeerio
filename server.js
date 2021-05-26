const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const publicIp = require('public-ip')
const geoip = require('geoip-country')
var whoiser = require('whoiser')
const socialScanner = require('social-scanner')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        server.set('trust proxy', true);

        server.use(bodyParser.json())

        // Dashboard prepare
        server.get("/dashboard", async (req, res) => {
            // Get the local domain extension of the user from their ip address
            async function getLocalExtension() {
                // Get the public ip
                console.log(req.ip);
                var ipAddress = req.ip;

                // Get the country code
                var countryCode = geoip.lookup(ipAddress).country;
                console.log("Found country code: " + countryCode + " From ip address: " + ipAddress);
                if (countryCode == "gb") {
                    countryCode = "co.uk";
                }
                return countryCode;
            }

            var domain = await getLocalExtension()
            domain = domain.toLowerCase()
            app.render(
                {
                    ...req,
                    localDomainExtension: domain
                },
                res,
                '/dashboard',
                req.query
            )
        })

        // server.get("/getLocalExtension", async (req, res) => {
        //     // Get the local domain extension of the user from their ip address
        //     async function getLocalExtension() {
        //         // Get the public ip
        //         console.log(req.ip);
        //         var ipAddress = req.ip;

        //         // Get the country code
        //         var countryCode = geoip.lookup(ipAddress).country;
        //         console.log("Found country code: " + countryCode + " From ip address: " + ipAddress);

        //         return countryCode;
        //     }
        //     var domain = await getLocalExtension()
        //     domain = domain.toLowerCase()
        //     res.json(domain)
        // })

        server.get("/checkDomains", async (req, res) => {

            // Function to check for available domain names
            async function checkDomainNames(domainExtensions, name) {
                var availableDomains = [];

                for (var domain of domainExtensions) {
                    var url = name + "." + domain;

                    // Check domain name
                    let domainLookup = await whoiser(url);
                    domainLookup = domainLookup[Object.keys(domainLookup)[0]];
                    let registrar = domainLookup.Registrar;
                    domainLookup = domainLookup[Object.keys(domainLookup)[0]];

                    if (domainLookup.length == 0 && registrar == undefined || domainLookup[0] === "AVAILABLE" && registrar == undefined) {
                        // Domain is available
                        console.log("www." + name + "." + domain + ": is available!");
                        availableDomains.push(domain);
                    } else {
                        // Domain is unavailable
                        console.log("www." + name + "." + domain + ": is UNavailable!");
                    }
                };

                return availableDomains;
            }

            // Function to check for available usernames
            async function getSocialMedia(response) {
                var availableUsernames = [];

                const getHostname = (url) => {
                    // use URL constructor and return hostname
                    return new URL(url).hostname;
                }

                for (var username of response) {
                    // Get the error response
                    var error = username.error;

                    if (error === false) {
                        // availableUsernames.push(username);
                        console.log("This is false: " + username.address);
                    } else if (error.status == 200) {
                        console.log("This is status 200: " + username.address);
                    } else {
                        // Get address of available username
                        var address = username.address;
                        // Get the hostname
                        var hostname = getHostname(address);
                        if (hostname.includes("facebook.com")) {
                            hostname = "facebook";
                        } else if (hostname.includes("instagram.com")) {
                            hostname = "instagram";
                        } else if (hostname.includes("youtube.com")) {
                            hostname = "youtube";
                        } else if (hostname.includes("twitter.com")) {
                            hostname = "twitter";
                        } else if (hostname.includes("tumblr.com")) {
                            hostname = "tumblr";
                        } else if (hostname.includes("pinterest.com")) {
                            hostname = "pinterest";
                        }
                        // Push it to the array
                        availableUsernames.push(hostname);
                    }
                }

                return availableUsernames
            }

            // Get name from form
            var name = req.query.name;
            name = name.replace(" ", "");
            console.log(name);
            var domainExtensions = ["com", "net", "io", "shop", "org", "co", "me"];
            domainExtensions.push(req.query.domain)
            console.log(name);

            // Check domain names

            // // Get the local domain extension
            // var localExtension = await getLocalExtension();
            // localExtension = localExtension.toLowerCase();

            // console.log(localExtension);
            // // Add the local domain extension to the domain array
            // domainExtensions.push(localExtension);

            var usernames = []

            // Check social media
            socialScanner(name, {
                restrict: ["facebook", "instagram", "youtube", "twitter", "tumblr", "pinterest"]
            }, async (err, response) => {
                // Handle the error
                if (err) throw err;
                console.log(response);

                // Get the available usernames on all social media platforms
                var getUsernames = await getSocialMedia(response);
                usernames = getUsernames
            });

            // Get the available domain names
            var domains = await checkDomainNames(domainExtensions, name);
            console.log(domains);
            console.log(usernames);
            res.json({ domains: domains, usernames: usernames });
        })

        // server.post("/checkDomains", async (req, res) => {
        //     // Get the local domain extension of the user from their ip address
        //     async function getLocalExtension() {
        //         // Get the public ip
        //         var ipAddress = await publicIp.v4();

        //         // Get the country code
        //         var countryCode = geoip.lookup(ipAddress).country;
        //         console.log("Found country code: " + countryCode + " From ip address: " + ipAddress);

        //         return countryCode;
        //     }

        //     // Function to check for available domain names
        //     async function checkDomainNames(domainExtensions, name) {
        //         var availableDomains = [];

        //         for (var domain of domainExtensions) {
        //             var url = name + "." + domain;

        //             // Check domain name
        //             let domainLookup = await whoiser(url);

        //             domainLookup = domainLookup[Object.keys(domainLookup)[0]];
        //             domainLookup = domainLookup[Object.keys(domainLookup)[0]];

        //             if (domainLookup.length == 0 || domainLookup[0] === "AVAILABLE") {
        //                 // Domain is available
        //                 console.log("www." + name + "." + domain + ": is available!");
        //                 availableDomains.push(domain);
        //             } else {
        //                 // Domain is unavailable
        //                 console.log("www." + name + "." + domain + ": is UNavailable!");
        //             }
        //         };

        //         return availableDomains;
        //     }

        //     // Function to check for available usernames
        //     async function getSocialMedia(response) {
        //         var availableUsernames = [];

        //         const getHostname = (url) => {
        //             // use URL constructor and return hostname
        //             return new URL(url).hostname;
        //         }

        //         for (var username of response) {
        //             // Get the error response
        //             var error = username.error;

        //             if (error === false) {
        //                 // availableUsernames.push(username);
        //                 console.log("This is false: " + username.address);
        //             } else if (error.status == 200) {
        //                 // availableUsernames.push(username);
        //                 console.log("This is status 200: " + username.address);
        //             } else {
        //                 // Get address of available username
        //                 var address = username.address;
        //                 // Get the hostname
        //                 var hostname = getHostname(address);
        //                 // Push it to the array
        //                 availableUsernames.push(hostname);
        //             }
        //         }

        //         return availableUsernames
        //     }

        //     // Get name from form
        //     const name = req.body.name;
        //     console.log(name);
        //     var domainExtensions = ["com", "net", "io", "shop", "org", "co", "me"];
        //     console.log(name);

        //     // Check domain names

        //     // Get the local domain extension
        //     var localExtension = await getLocalExtension();
        //     localExtension = localExtension.toLowerCase();

        //     console.log(localExtension);
        //     // Add the local domain extension to the domain array
        //     domainExtensions.push(localExtension);

        //     var usernames = []

        //     // Check social media
        //     socialScanner(name, {
        //         restrict: ["facebook", "instagram", "youtube", "twitter", "tumblr", "pinterest"]
        //     }, async (err, response) => {
        //         // Handle the error
        //         if (err) throw err;

        //         // Get the available usernames on all social media platforms
        //         var getUsernames = await getSocialMedia(response);
        //         usernames = getUsernames
        //     });

        //     // Get the available domain names
        //     var domains = await checkDomainNames(domainExtensions, name);
        //     console.log(domains);
        //     res.json({ domains, usernames });
        // })

        server.get("/checkSocialMedia", async (req, res) => {
            // Function to check for available usernames
            async function getSocialMedia(response) {
                var availableUsernames = [];

                const getHostname = (url) => {
                    // use URL constructor and return hostname
                    return new URL(url).hostname;
                }

                for (var username of response) {
                    // Get the error response
                    var error = username.error;

                    if (error === false) {
                        // availableUsernames.push(username);
                        console.log("This is false: " + username.address);
                    } else if (error.status == 200) {
                        // availableUsernames.push(username);
                        console.log("This is status 200: " + username.address);
                    } else {
                        // Get address of available username
                        var address = username.address;
                        // Get the hostname
                        var hostname = getHostname(address);
                        // Push it to the array
                        availableUsernames.push(hostname);
                    }
                }

                return availableUsernames
            }

            const name = req.query.name;
            // Check social media
            socialScanner(name, {
                restrict: ["facebook", "instagram", "youtube", "twitter", "tumblr", "pinterest"]
            }, async (err, response) => {
                // Handle the error
                if (err) throw err;

                // Get the available usernames on all social media platforms
                var usernames = await getSocialMedia(response);

                res.send(usernames);
            });
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(8080, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:8080')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })