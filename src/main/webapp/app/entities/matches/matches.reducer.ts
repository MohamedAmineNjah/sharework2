import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMatches, defaultValue } from 'app/shared/model/matches.model';

export const ACTION_TYPES = {
  FETCH_MATCHES_LIST: 'matches/FETCH_MATCHES_LIST',
  FETCH_MATCHES: 'matches/FETCH_MATCHES',
  CREATE_MATCHES: 'matches/CREATE_MATCHES',
  UPDATE_MATCHES: 'matches/UPDATE_MATCHES',
  DELETE_MATCHES: 'matches/DELETE_MATCHES',
  RESET: 'matches/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMatches>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MatchesState = Readonly<typeof initialState>;

// Reducer

export default (state: MatchesState = initialState, action): MatchesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MATCHES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MATCHES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MATCHES):
    case REQUEST(ACTION_TYPES.UPDATE_MATCHES):
    case REQUEST(ACTION_TYPES.DELETE_MATCHES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MATCHES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MATCHES):
    case FAILURE(ACTION_TYPES.CREATE_MATCHES):
    case FAILURE(ACTION_TYPES.UPDATE_MATCHES):
    case FAILURE(ACTION_TYPES.DELETE_MATCHES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATCHES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MATCHES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MATCHES):
    case SUCCESS(ACTION_TYPES.UPDATE_MATCHES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MATCHES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/matches';

// Actions

export const getEntities: ICrudGetAllAction<IMatches> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MATCHES_LIST,
  payload: axios.get<IMatches>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMatches> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MATCHES,
    payload: axios.get<IMatches>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMatches> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MATCHES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMatches> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MATCHES,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMatches> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MATCHES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
