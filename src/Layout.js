import { Route, Routes } from "react-router-dom";
import App from "./App";
import HomePage from "./components/homepage/homepage";

const Layout = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </>
    );
  };
  
  export default Layout;