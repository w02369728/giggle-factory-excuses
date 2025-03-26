
export interface Excuse {
  id: string;
  situation: string;
  reason: string;
  excuse: string;
  createdAt: Date;
}

export interface ExcuseGeneratorFormData {
  situation: string;
  reason: string;
}
