import { Toaster } from "react-hot-toast";
import "./App.css";
import TanstackQueryProvider from "./providers/TanstackQueryProvider";
import Router from "./router/Router";

function App() {
  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <TanstackQueryProvider>
        <Router />
      </TanstackQueryProvider>
    </>
  );
}

export default App;
