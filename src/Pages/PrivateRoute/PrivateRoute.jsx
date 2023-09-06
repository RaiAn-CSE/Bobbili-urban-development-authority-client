import { redirect, useNavigate } from "react-router";
import { Link } from "react-router-dom";

function PrivateRoute({ children }) {
    const User = ["LTP", "PS", "Admin"];
    const CurrentUser = "PS";
    const UserChecked = User.includes(CurrentUser);
    const navigate = useNavigate();

    if (!UserChecked) {
        return navigate('/')
    }
    return children;
}

export default PrivateRoute;