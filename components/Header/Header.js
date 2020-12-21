import InputField from "../InputField";
import { useState, useEffect } from "react"

const Header = () => {
    const useWindowDimensions = () => {
        const hasWindow = typeof window !== "undefined"

        function getWindowDimensions() {
            const width = hasWindow ? window.innerWidth : null
            const height = hasWindow ? window.innerHeight : null
            return {
                width,
                height,
            }
        }

        const [windowDimensions, setWindowDimensions] = useState(
            getWindowDimensions()
        )

        useEffect(() => {
            if (hasWindow) {
                function handleResize() {
                    setWindowDimensions(getWindowDimensions())
                }

                window.addEventListener("resize", handleResize)
                return () => window.removeEventListener("resize", handleResize)
            }
        }, [hasWindow])

        return windowDimensions
    }

    const { height, width } = useWindowDimensions()
    const breakpoint = 600

    return (
        <div className="container">
            <h1>Do you have a million dollar idea in mind?</h1>
            {width > breakpoint ? <p>Check the <span className="bold">availability of your idea</span>, upcoming product or company in terms of <span className="bold">domain names</span>, <span className="bold">social media</span>, <span className="bold">trademarks</span> and check the strength and originality of your name in mind.</p> : <p>Check the <span className="bold">availability of your idea</span>, upcoming product or company in terms of <span className="bold">domain names</span>, <span className="bold">social media</span> and <span className="bold">trademarks</span>.</p>}
            <InputField />
        </div>
    );
}


export default Header;
