import { IMatches } from 'app/shared/model/matches.model';

export interface ICompanies {
  id?: number;
  sourceid?: number;
  sourcename?: string;
  name?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  postalcode?: string;
  city?: string;
  country?: string;
  leftcompanies?: IMatches[];
  rightcompanies?: IMatches[];
}

export const defaultValue: Readonly<ICompanies> = {};
