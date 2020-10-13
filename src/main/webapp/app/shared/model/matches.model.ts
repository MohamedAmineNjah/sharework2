import { ICompanies } from 'app/shared/model/companies.model';

export interface IMatches {
  id?: number;
  leftcompanyid?: number;
  rightcompanyid?: number;
  left?: ICompanies;
  right?: ICompanies;
}

export const defaultValue: Readonly<IMatches> = {};
