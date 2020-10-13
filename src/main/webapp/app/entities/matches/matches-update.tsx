import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICompanies } from 'app/shared/model/companies.model';
import { getEntities as getCompanies } from 'app/entities/companies/companies.reducer';
import { getEntity, updateEntity, createEntity, reset } from './matches.reducer';
import { IMatches } from 'app/shared/model/matches.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMatchesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MatchesUpdate = (props: IMatchesUpdateProps) => {
  const [leftId, setLeftId] = useState('0');
  const [rightId, setRightId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { matchesEntity, companies, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/matches');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCompanies();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...matchesEntity,
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
          <h2 id="sharework2App.matches.home.createOrEditLabel">
            <Translate contentKey="sharework2App.matches.home.createOrEditLabel">Create or edit a Matches</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : matchesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="matches-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="matches-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="leftcompanyidLabel" for="matches-leftcompanyid">
                  <Translate contentKey="sharework2App.matches.leftcompanyid">Leftcompanyid</Translate>
                </Label>
                <AvField
                  id="matches-leftcompanyid"
                  type="string"
                  className="form-control"
                  name="leftcompanyid"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="rightcompanyidLabel" for="matches-rightcompanyid">
                  <Translate contentKey="sharework2App.matches.rightcompanyid">Rightcompanyid</Translate>
                </Label>
                <AvField
                  id="matches-rightcompanyid"
                  type="string"
                  className="form-control"
                  name="rightcompanyid"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="matches-left">
                  <Translate contentKey="sharework2App.matches.left">Left</Translate>
                </Label>
                <AvInput id="matches-left" type="select" className="form-control" name="left.id">
                  <option value="" key="0" />
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="matches-right">
                  <Translate contentKey="sharework2App.matches.right">Right</Translate>
                </Label>
                <AvInput id="matches-right" type="select" className="form-control" name="right.id">
                  <option value="" key="0" />
                  {companies
                    ? companies.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/matches" replace color="info">
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
  companies: storeState.companies.entities,
  matchesEntity: storeState.matches.entity,
  loading: storeState.matches.loading,
  updating: storeState.matches.updating,
  updateSuccess: storeState.matches.updateSuccess,
});

const mapDispatchToProps = {
  getCompanies,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MatchesUpdate);
