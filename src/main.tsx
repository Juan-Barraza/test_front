import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CommentForm from './components/CommentForm.tsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
    ]
  },
  {
    path: "features/:featureId",
    element: <CommentForm />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
