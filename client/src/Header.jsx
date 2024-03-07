import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:8000/profile", {
      credentials: "include",
    })
      .then((response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  function logout() {
    fetch("http://localhost:8000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
// ?.: This is the optional chaining operator. It's used to access properties of an object without causing an error if the object is null or undefined.
  return (
    <header>
      <Link to="/" className="logo">My Blog</Link>
      <nav>
        {username && (
          <>
             
            <Link
              to={"/create"}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              Create New Post
            </Link>
            <a
              onClick={logout}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              Logout
            </a>
          </>
        )}
        {!username && (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

// {username && (...)}: This is a conditional rendering in JSX. If username is truthy (not null, undefined, false, 0, "", etc.), then it renders the content inside the parentheses. It's using a logical AND (&&) to conditionally render elements
