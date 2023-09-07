import { useLocation } from "react-router";
import { Link } from "react-router-dom";

function PrivateRoute({ children }) {
    const User = ["LTP", "PS", "Admin"];
    const CurrentUser = "LTP";
    const UserChecked = User.includes(CurrentUser);

    const location = useLocation();

    if (!UserChecked) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
}

export default PrivateRoute;