import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Matches from './matches';
import MatchesDetail from './matches-detail';
import MatchesUpdate from './matches-update';
import MatchesDeleteDialog from './matches-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MatchesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MatchesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MatchesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Matches} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MatchesDeleteDialog} />
  </>
);

export default Routes;
