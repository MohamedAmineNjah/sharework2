import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICompanies, defaultValue } from 'app/shared/model/companies.model';

export const ACTION_TYPES = {
  FETCH_COMPANIES_LIST: 'companies/FETCH_COMPANIES_LIST',
  FETCH_COMPANIES: 'companies/FETCH_COMPANIES',
  CREATE_COMPANIES: 'companies/CREATE_COMPANIES',
  UPDATE_COMPANIES: 'companies/UPDATE_COMPANIES',
  DELETE_COMPANIES: 'companies/DELETE_COMPANIES',
  RESET: 'companies/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompanies>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CompaniesState = Readonly<typeof initialState>;

// Reducer

export default (state: CompaniesState = initialState, action): CompaniesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPANIES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPANIES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPANIES):
    case REQUEST(ACTION_TYPES.UPDATE_COMPANIES):
    case REQUEST(ACTION_TYPES.DELETE_COMPANIES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPANIES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPANIES):
    case FAILURE(ACTION_TYPES.CREATE_COMPANIES):
    case FAILURE(ACTION_TYPES.UPDATE_COMPANIES):
    case FAILURE(ACTION_TYPES.DELETE_COMPANIES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANIES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANIES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPANIES):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPANIES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPANIES):
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

const apiUrl = 'api/companies';

// Actions

export const getEntities: ICrudGetAllAction<ICompanies> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPANIES_LIST,
  payload: axios.get<ICompanies>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICompanies> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPANIES,
    payload: axios.get<ICompanies>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICompanies> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPANIES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompanies> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPANIES,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompanies> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPANIES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
