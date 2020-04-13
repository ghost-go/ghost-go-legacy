export interface PrevieImageData {
  x300: String;
}

export interface ProblemsData {
  problems: [ProblemData];
}

export interface TagData {
  id: String;
  name: String;
}

export interface ProblemData {
  id: String;
  rank: String;
  whofirst: String;
  previewImgR1: PrevieImageData;
}

export interface ProblemQueryVar {
  last: number;
  tags: string;
  level: string;
}

export interface SettingVars {
  name: string;
  value: any;
}
