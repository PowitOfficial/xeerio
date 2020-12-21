import "../static/components/inputField.css";

const InputField = props => {
    return (
        <div>
            {/* The form to check the user's name */}
            <form method="GET" action="/dashboard">
                <input type="text" name="name" placeholder="Name ..." required />
                <input type="submit" value="Check" />
            </form>

            <div className="linkContainer">
                <div className="linkWrapper">
                    <a href="/contact">or don't have a name yet?</a>
                    <img src="../static/images/arrow-right.svg" />
                </div>
            </div>
        </div>
    );
};

export default InputField;
