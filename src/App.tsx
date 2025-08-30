import Home from "./pagess/Home";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      {/* META */}
      <Helmet>
        <title>To-Do List – Zarządzaj swoimi zadaniami</title>
        <meta
          name="description"
          content="Prosta aplikacja To-Do List. Dodawaj zadania, śledź postępy i organizuj swoje codzienne obowiązki."
        />
        <meta name="keywords" content="todo, lista zadań, task, productivity" />
        <meta name="author" content="YourName" />

        {/* Theme-color dla light/dark */}
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1c1c1c"
          media="(prefers-color-scheme: dark)"
        />
      </Helmet>

      <Home />
    </div>
  );
};

export default App;
