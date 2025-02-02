import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './companies.reducer';
import { ICompanies } from 'app/shared/model/companies.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompaniesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Companies = (props: ICompaniesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { companiesList, match, loading } = props;
  return (
    <div>
      <h2 id="companies-heading">
        <Translate contentKey="sharework2App.companies.home.title">Companies</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="sharework2App.companies.home.createLabel">Create new Companies</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {companiesList && companiesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.companies.sourceid">Sourceid</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.companies.sourcename">Sourcename</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.companies.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.companies.website">Website</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.companies.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.companies.phone">Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.companies.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.companies.postalcode">Postalcode</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.companies.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="sharework2App.companies.country">Country</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {companiesList.map((companies, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${companies.id}`} color="link" size="sm">
                      {companies.id}
                    </Button>
                  </td>
                  <td>{companies.sourceid}</td>
                  <td>{companies.sourcename}</td>
                  <td>{companies.name}</td>
                  <td>{companies.website}</td>
                  <td>{companies.email}</td>
                  <td>{companies.phone}</td>
                  <td>{companies.address}</td>
                  <td>{companies.postalcode}</td>
                  <td>{companies.city}</td>
                  <td>{companies.country}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${companies.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${companies.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${companies.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          Hide
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
                <Translate contentKey="sharework2App.companies.home.notFound">No Companies found</Translate>
              </div>
            )
          )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ companies }: IRootState) => ({
  companiesList: companies.entities,
  loading: companies.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
