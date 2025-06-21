import CategoriesPage from "./pages/categories";
import EditCategoryPage from "./pages/categories/edit/[categoryId]/page";
import HomePage from "./pages/home/page";
import Layout from "./pages/layout";
import CreateProductPage from "./pages/products/create/page";
import EditProductPage from "./pages/products/edit/[productId]/page";
import ProductsPage from "./pages/products/page";
import { createBrowserRouter } from "react-router-dom";
import SignInPage from "./pages/login/sign-in";

export const router = createBrowserRouter([
  { path: "/sign-in", element: <SignInPage /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "products/create",
        element: <CreateProductPage />,
      },
      {
        path: "categories/edit/:categoryId",
        element: <EditCategoryPage />,
      },
      {
        path: "products/edit/:productId",
        element: <EditProductPage />,
      },
    ],
  },
]);
