import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './companies.reducer';
import { ICompanies } from 'app/shared/model/companies.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompaniesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompaniesUpdate = (props: ICompaniesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { companiesEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/companies');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...companiesEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="sharework2App.companies.home.createOrEditLabel">
            <Translate contentKey="sharework2App.companies.home.createOrEditLabel">Create or edit a Companies</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : companiesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="companies-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="companies-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sourceidLabel" for="companies-sourceid">
                  <Translate contentKey="sharework2App.companies.sourceid">Sourceid</Translate>
                </Label>
                <AvField
                  id="companies-sourceid"
                  type="string"
                  className="form-control"
                  name="sourceid"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="sourcenameLabel" for="companies-sourcename">
                  <Translate contentKey="sharework2App.companies.sourcename">Sourcename</Translate>
                </Label>
                <AvField
                  id="companies-sourcename"
                  type="text"
                  name="sourcename"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="companies-name">
                  <Translate contentKey="sharework2App.companies.name">Name</Translate>
                </Label>
                <AvField
                  id="companies-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="websiteLabel" for="companies-website">
                  <Translate contentKey="sharework2App.companies.website">Website</Translate>
                </Label>
                <AvField id="companies-website" type="text" name="website" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="companies-email">
                  <Translate contentKey="sharework2App.companies.email">Email</Translate>
                </Label>
                <AvField id="companies-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="companies-phone">
                  <Translate contentKey="sharework2App.companies.phone">Phone</Translate>
                </Label>
                <AvField id="companies-phone" type="text" name="phone" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="companies-address">
                  <Translate contentKey="sharework2App.companies.address">Address</Translate>
                </Label>
                <AvField id="companies-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="postalcodeLabel" for="companies-postalcode">
                  <Translate contentKey="sharework2App.companies.postalcode">Postalcode</Translate>
                </Label>
                <AvField id="companies-postalcode" type="text" name="postalcode" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="companies-city">
                  <Translate contentKey="sharework2App.companies.city">City</Translate>
                </Label>
                <AvField id="companies-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="companies-country">
                  <Translate contentKey="sharework2App.companies.country">Country</Translate>
                </Label>
                <AvField id="companies-country" type="text" name="country" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/companies" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  companiesEntity: storeState.companies.entity,
  loading: storeState.companies.loading,
  updating: storeState.companies.updating,
  updateSuccess: storeState.companies.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesUpdate);
