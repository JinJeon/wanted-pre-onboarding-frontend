import { useRoutes } from "react-router-dom";

import { routes } from "@router";

const App = () => {
  const element = useRoutes(routes);

  return <div className='App'>{element}</div>;
};

export default App;
