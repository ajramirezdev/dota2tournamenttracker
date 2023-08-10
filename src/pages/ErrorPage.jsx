import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";
import "./ErrorPage.css";
import HomeIcon from "@mui/icons-material/Home";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <ErrorOutlineIcon sx={{ fontSize: 300, color: "#ad4bd5" }} />
      <div className="error-text">
        <div className="error-header">Oops..!</div>
        <div className="error-p">Something went wrong...</div>
      </div>
      <Link className="home-link" to={"/"}>
        <HomeIcon sx={{ color: "#d3d7da" }} />
        Home
      </Link>
    </div>
  );
};

export default ErrorPage;
