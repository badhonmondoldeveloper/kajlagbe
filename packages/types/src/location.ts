export interface DivisionBase {
  id: string;
  name: string;
  bnName: string;
  code: string;
}

export interface DistrictBase {
  id: string;
  divisionId: string;
  name: string;
  bnName: string;
  code: string;
}

export interface UpazilaBase {
  id: string;
  districtId: string;
  name: string;
  bnName: string;
  code: string;
}
