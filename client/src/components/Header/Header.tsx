import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import SearchBar from "../SearchBar";
import { logoutUser } from "../../redux/thunk/user.thunk";
import { Loader } from "../Loader";
import { useEffect, useState } from "react";

export const Header = ({ isLogin }: { isLogin: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await dispatch(logoutUser());
      setIsLogout(response.payload.statusCode === 200);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location?.state?.success) {
      setSuccess(location?.state?.success);
      setIsLogout(false);
    }
  }, [location]);

  if (loading) <Loader />;

  return (
    <header className="bg-white text-white sticky top-0 z-10 h-[58px]">
      <div className="container mx-auto flex justify-between items-center py-2">
        <div className="w-[60%] flex items-center gap-4">
          <Link to="/" className="w-[80px] text-white text-center rounded-lg">
            <div className="flex text-2xl font-medium">
              <div className="bg-[#f1dc56]  w-[50%]">Js</div>
              <div className="bg-[#3470a3]  w-[50%]">Py</div>
            </div>
          </Link>
          <div className="w-full">
            <SearchBar />
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          {!isLogout && (
            <>
              {isLogin || success ? (
                <Link
                  to="/create-blog"
                  className="hover:text-gray-400 text-slate-500 border border-slate-500 py-1 px-2 rounded-lg"
                >
                  Create Post
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="hover:text-gray-400 text-slate-500 border border-slate-500 py-1 px-2 rounded-lg"
                >
                  Create Account
                </Link>
              )}
              <Link
                onClick={isLogin ? handleLogout : undefined}
                to={isLogin || success ? "" : "/login"}
                className="hover:text-gray-400 text-slate-500"
              >
                {isLogin || success ? "Logout" : "Login"}
              </Link>
            </>
          )}

          {isLogout && (
            <>
              <Link
                to="/register"
                className="hover:text-gray-400 text-slate-500 border border-slate-500 py-1 px-2 rounded-lg"
              >
                Create Account
              </Link>

              <Link to="/login" className="hover:text-gray-400 text-slate-500">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
