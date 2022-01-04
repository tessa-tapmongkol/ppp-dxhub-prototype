import './App.css';
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SearchPage from "./Pages/SearchPage/SearchPage";
import GroupsPage from './Pages/GroupsPage/GroupsPage';
import ClassesPage from './Pages/ClassesPage/ClassesPage';
import database from './api/database';
import HeadingsPage from './Pages/HeadingsPage/HeadingsPage';
import NamePage from './Pages/NamePage/NamePage';

function App() {
  const [category, setCategory] = React.useState({}); // which category user clicks on
  const [group, setGroup] = React.useState([]); // which group user clicks on
  const [clas, setClass] = React.useState([]); // which class user clicks on
  const [heading, setHeading] = React.useState([]); // which heading user clicks on

  const [data, setData] = React.useState(); // all data retrieved from database

  const getData = async () => {
    try {
      const response = await database.get('/gethierarchy');
      return JSON.parse(response.data.body);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getData().then((result) => {
      setData(result?.categories);
    });
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <SearchPage
            setCategory={setCategory}
            data={data}
          />
        </Route>
        {(category !== undefined && category !== null) && (category?.name !== undefined) ? (
          <Route exact path={"/category/" + category?.name}>
            <GroupsPage
              category={category}
              setGroup={setGroup}
            />
          </Route>) : null
        }
        {(group !== undefined && group !== null) && (group?.name !== undefined) ? (
          <Route exact path={"/group/" + group.name}>
            <ClassesPage
              setClass={setClass}
              group={group}
            />
          </Route>) : null
        }
        {(clas !== undefined && clas !== null) && (clas?.name !== undefined) ? (
          <Route exact path={"/class/" + clas.name}>
            <HeadingsPage
              setHeading={setHeading}
              clas={clas}
            />
          </Route>) : null
        }
        {(heading !== undefined && heading !== null) && (heading?.name !== undefined) ? (
          <Route exact path={"/name/" + heading.name}>
            <NamePage
              name={heading.name}
              data={data}
            />
          </Route>) : null
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;
