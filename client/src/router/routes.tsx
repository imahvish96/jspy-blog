import { routerType } from "../types/router.types";
import {
  Home,
  BlogContent,
  Login,
  BlogWriting,
  RegistrationForm,
} from "../page";

const pagesData: routerType[] = [
  {
    path: "/",
    element: <Home />,
    title: "Home",
  },
  {
    path: "/read/:slug",
    element: <BlogContent />,
    title: "Read-Blog",
  },
  {
    path: "create-blog",
    element: <BlogWriting />,
    title: "Create-Blog",
  },
  {
    path: "login",
    element: <Login />,
    title: "Login",
  },
  {
    path: "register",
    element: <RegistrationForm />,
    title: "Register",
  },
];

export default pagesData;
