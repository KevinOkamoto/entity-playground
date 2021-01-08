export type RequisitionStatus = 'draft' | 'submitted' | 'approved';

export interface Requisition {
  id: string;
  title: string;
  status: RequisitionStatus;
  total: number;
}
