import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './companies.reducer';
import { ICompanies } from 'app/shared/model/companies.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompaniesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompaniesDetail = (props: ICompaniesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { companiesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sharework2App.companies.detail.title">Companies</Translate> [<b>{companiesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="sourceid">
              <Translate contentKey="sharework2App.companies.sourceid">Sourceid</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.sourceid}</dd>
          <dt>
            <span id="sourcename">
              <Translate contentKey="sharework2App.companies.sourcename">Sourcename</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.sourcename}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="sharework2App.companies.name">Name</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.name}</dd>
          <dt>
            <span id="website">
              <Translate contentKey="sharework2App.companies.website">Website</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.website}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="sharework2App.companies.email">Email</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.email}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="sharework2App.companies.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.phone}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="sharework2App.companies.address">Address</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.address}</dd>
          <dt>
            <span id="postalcode">
              <Translate contentKey="sharework2App.companies.postalcode">Postalcode</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.postalcode}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="sharework2App.companies.city">City</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.city}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="sharework2App.companies.country">Country</Translate>
            </span>
          </dt>
          <dd>{companiesEntity.country}</dd>
        </dl>
        <Button tag={Link} to="/companies" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/companies/${companiesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ companies }: IRootState) => ({
  companiesEntity: companies.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesDetail);
