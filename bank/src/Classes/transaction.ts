import { TransactionStatus } from "../enums/enums";

export abstract class Transaction {
  transactionId: string;
  amount: number;
  timestap: Date;
  status: TransactionStatus;
  constructor(
    transactionId: string,
    amount: number,
    timestap: Date,
    status: TransactionStatus,
  ) {
    this.transactionId = transactionId;
    this.amount = amount;
    this.timestap = timestap;
    this.status = status;
  }

  abstract execute(): boolean;
  getDetail(): string {
    return " ";
  }
}
