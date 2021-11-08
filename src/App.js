import './App.css';
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage/SearchPage";
import ComparePage from "./Pages/ComparePage/ComparePage";
import SubCategoriesPage from './Pages/SubCategoriesPage/SubCategoriesPage';

function App() {
  const [category, setCategory] = React.useState("");
  const [subcategory, setSubcategory] = React.useState("");

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/subcategories/" + category}>
          <SubCategoriesPage
            category={category}
            setSubcategory={setSubcategory}
          />
        </Route>
        <Route exact path="/">
          <SearchPage
            setCategory={setCategory}
          />
        </Route>
        <Route exact path={"/compare/" + subcategory}>
          <ComparePage
            query={subcategory}
            category={category}
          />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
