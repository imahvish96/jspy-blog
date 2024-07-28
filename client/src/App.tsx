import Router from "./router/router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Footer, Header, Loader } from "./components";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./hooks";
import { verifyUser } from "./redux/thunk/user.thunk";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const verify = async () => {
      try {
        setLoading(true);
        const response = await dispatch(verifyUser()).unwrap();
        if (response.statusCode === 200) {
          setIsLogin(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <>
      <BrowserRouter>
        <Header isLogin={isLogin} />
        <div className="flex-grow">
          <Router />
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
