import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './matches.reducer';
import { IMatches } from 'app/shared/model/matches.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMatchesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Matches = (props: IMatchesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { matchesList, match, loading } = props;
  return (
    <div>
      <h2 id="matches-heading">
        <Translate contentKey="sharework2App.matches.home.title">Matches</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sharework2App.matches.home.createLabel">Create new Matches</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {matchesList && matchesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.matches.leftcompanyid">Leftcompanyid</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.matches.rightcompanyid">Rightcompanyid</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.matches.left">Left</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.matches.right">Right</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {matchesList.map((matches, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${matches.id}`} color="link" size="sm">
                      {matches.id}
                    </Button>
                  </td>
                  <td>{matches.leftcompanyid}</td>
                  <td>{matches.rightcompanyid}</td>
                  <td>{matches.left ? <Link to={`companies/${matches.left.id}`}>{matches.left.id}</Link> : ''}</td>
                  <td>{matches.right ? <Link to={`companies/${matches.right.id}`}>{matches.right.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${matches.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${matches.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${matches.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="sharework2App.matches.home.notFound">No Matches found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ matches }: IRootState) => ({
  matchesList: matches.entities,
  loading: matches.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
