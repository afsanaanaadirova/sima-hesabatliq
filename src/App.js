import { Navigate } from "react-router-dom";
import Layout from "./components/layout/public/layout";
import { Outlet } from "react-router-dom";
function App() {
  let isLoggedIn = localStorage.getItem("dataKey");

  return (
    <div className="App">
      <Layout>
        {isLoggedIn ? <Outlet /> : <Navigate to="/login" replace={true} />}
      </Layout>
    </div>
  );
}

export default App;
