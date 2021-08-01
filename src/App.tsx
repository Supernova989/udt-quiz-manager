import React from "react";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import Content from "./components/Content";
import { Switch, Route, Redirect } from "react-router-dom";
import { ROUTES } from "./routes";

const LanguagePage = React.lazy(() => import("./pages/LanguagePage"));
const QuestionPage = React.lazy(() => import("./pages/QuestionPage"));

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <main id="main">
        <SideBar />
        <Content>
          <React.Suspense fallback={null}>
            <Switch>
              <Route exact path={ROUTES.QUESTION_NEW} render={(props) => <QuestionPage {...props} />} />
              <Route exact path={ROUTES.QUESTION} render={(props) => <QuestionPage {...props} />} />
              <Route exact path={ROUTES.LANGUAGE} render={(props) => <LanguagePage {...props} />} />
              <Route exact path={"/languages"} component={() => <Redirect to={"/"} />} />
              <Route
                exact
                component={() => <div id="text-page-placeholder">Please select a language in the sidebar.</div>}
              />
            </Switch>
          </React.Suspense>
        </Content>
      </main>
    </MuiThemeProvider>
  );
}

export default App;
