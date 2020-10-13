import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './matches.reducer';
import { IMatches } from 'app/shared/model/matches.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMatchesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MatchesDetail = (props: IMatchesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { matchesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="sharework2App.matches.detail.title">Matches</Translate> [<b>{matchesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="leftcompanyid">
              <Translate contentKey="sharework2App.matches.leftcompanyid">Leftcompanyid</Translate>
            </span>
          </dt>
          <dd>{matchesEntity.leftcompanyid}</dd>
          <dt>
            <span id="rightcompanyid">
              <Translate contentKey="sharework2App.matches.rightcompanyid">Rightcompanyid</Translate>
            </span>
          </dt>
          <dd>{matchesEntity.rightcompanyid}</dd>
          <dt>
            <Translate contentKey="sharework2App.matches.left">Left</Translate>
          </dt>
          <dd>{matchesEntity.left ? matchesEntity.left.id : ''}</dd>
          <dt>
            <Translate contentKey="sharework2App.matches.right">Right</Translate>
          </dt>
          <dd>{matchesEntity.right ? matchesEntity.right.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/matches" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/matches/${matchesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ matches }: IRootState) => ({
  matchesEntity: matches.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MatchesDetail);
