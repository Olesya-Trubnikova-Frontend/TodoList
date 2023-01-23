import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TodoListContextWrapper } from "./contexts/TodoListContextProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContactsPage } from "./components/Pages/ContactsPage/ContactsPage";
import { TodosPage } from "./components/Pages/TodosPage/TodosPage";
import { TodoDetail } from "./components/TodoDetail/TodoDetail";
import { TodosCreate } from "./components/TodosCreate/TodosCreate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// функция создания роутинга
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "contacts",
          element: <ContactsPage />,
        },
        {
          path: "todos/",
          element: <TodosPage />,
        },
        {
          path: "todos/:todoId",
          element: <TodoDetail />,
        },
        {
          path: "todos/create",
          element: <TodosCreate />,
        },
      ],
    },
  ],
  { basename: "/TodoList" }
);

// регистрируем query-клиент и оборачиваем в него приложение
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		}
	}
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
		<QueryClientProvider client={queryClient}>
      <TodoListContextWrapper>
        <RouterProvider router={router} />
      </TodoListContextWrapper>
		</QueryClientProvider>
  </React.StrictMode>
);
