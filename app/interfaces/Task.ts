export default interface Task {
  _id: string;
  name: string;
  priority: string;
  IDcategory: string;
  startDate: Date;
  endDate: Date;
  periodicity: string;
  notification: boolean;
  notes: string;
  status: boolean;
  IDuser: string;
}
