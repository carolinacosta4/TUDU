export default interface Bill {
  _id: string;
  name: string;
  priority: string;
  amount: string;
  dueDate: Date;
  periodicity: string;
  notification: boolean;
  notes: string;
  status: boolean;
  IDuser: string;
  IDcurrency: {
    _id: string;
    name: string;
    symbol: string;
  }
}
