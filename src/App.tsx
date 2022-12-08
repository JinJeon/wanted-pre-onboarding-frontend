import { useRoutes } from "react-router-dom";

import { routes } from "@router";
import { ErrorMessageProvider } from "@store/errorMessage";

const App = () => {
  const element = useRoutes(routes);

  return (
    <div className='App'>
      <ErrorMessageProvider>{element}</ErrorMessageProvider>
    </div>
  );
};

export default App;
