import * as React from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  // HashRouter as Router,
} from 'react-router-dom';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import pageRouteConfig from './pageRouteConfig';

const routes = (
    <Router>
      <LocaleProvider locale={zhCN}>
        <Switch>
          {pageRouteConfig.map((route, index) => {
            const {path, exact, component, title} = route;
            return <Route
                key={index}
                exact={exact}
                path={path}
                component={component}
                title={title}
            />;
          })}
        </Switch>
      </LocaleProvider>
    </Router>
);

export default routes;
