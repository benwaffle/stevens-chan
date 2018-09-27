import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Main from './Main';
import ThreadViewer from './ThreadViewer';

export default () => (
   <BrowserRouter>
      <Switch>
         <Route exact path="/" component={Main} />
         <Route path="/t/:threadId" component={ThreadViewer} />
         <Route
            path="*"
            component={() => <h1 style={{ padding: '1em' }}>404: Not Found</h1>}
         />
      </Switch>
   </BrowserRouter>
);
