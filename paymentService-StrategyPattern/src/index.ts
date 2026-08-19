// ==================== Types & Interfaces ====================

interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
  timestamp: Date;
}

interface PaymentStrategy {
  pay(amount: number): Promise<PaymentResult>;
  validate(): boolean;
}

// ==================== Helper ====================

function generateTransactionId(): string {
  return `TXN_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

// ==================== Concrete Strategy: UPI ====================

class Upi implements PaymentStrategy {
  private readonly upiId: string;
  private readonly upiRegex = /^[\w.-]+@[\w.-]+$/;

  constructor(upiId: string) {
    this.upiId = upiId;
  }

  validate(): boolean {
    return this.upiRegex.test(this.upiId);
  }

  async pay(amount: number): Promise<PaymentResult> {
    if (!this.validate()) {
      return {
        success: false,
        transactionId: "",
        message: "Invalid UPI ID format",
        timestamp: new Date(),
      };
    }

    if (amount <= 0) {
      return {
        success: false,
        transactionId: "",
        message: "Amount must be greater than zero",
        timestamp: new Date(),
      };
    }

    // real duniya mein yahan UPI gateway ka API call hota (Razorpay/PhonePe SDK, etc.)
    await new Promise((resolve) => setTimeout(resolve, 300)); // network delay simulate

    const txnId = generateTransactionId();
    console.log(`[UPI] ₹${amount} paid via ${this.upiId} | TXN: ${txnId}`);

    return {
      success: true,
      transactionId: txnId,
      message: `Payment of ₹${amount} successful via UPI`,
      timestamp: new Date(),
    };
  }
}

// ==================== Concrete Strategy: Debit Card ====================

class DebitCard implements PaymentStrategy {
  private readonly cardNumber: string;
  private readonly cvv: string;
  private readonly expiry: string; // MM/YY format
  private static readonly DAILY_LIMIT = 50000;

  constructor(cardNumber: string, cvv: string, expiry: string) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expiry = expiry;
  }

  validate(): boolean {
    const cardValid = /^\d{16}$/.test(this.cardNumber);
    const cvvValid = /^\d{3}$/.test(this.cvv);
    const notExpired = this.checkExpiry();
    return cardValid && cvvValid && notExpired;
  }

  private checkExpiry(): boolean {
    const [month, year] = this.expiry.split("/").map(Number);
    const expiryDate = new Date(2000 + year, month - 1);
    return expiryDate > new Date();
  }

  async pay(amount: number): Promise<PaymentResult> {
    if (!this.validate()) {
      return {
        success: false,
        transactionId: "",
        message: "Card validation failed (invalid number/cvv/expired)",
        timestamp: new Date(),
      };
    }

    if (amount > DebitCard.DAILY_LIMIT) {
      return {
        success: false,
        transactionId: "",
        message: `Amount exceeds daily limit of ₹${DebitCard.DAILY_LIMIT}`,
        timestamp: new Date(),
      };
    }

    // real duniya mein yahan bank ka payment gateway call hota (Stripe/Razorpay)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const txnId = generateTransactionId();
    const maskedCard = `**** **** **** ${this.cardNumber.slice(-4)}`;
    console.log(`[DebitCard] ₹${amount} paid via ${maskedCard} | TXN: ${txnId}`);

    return {
      success: true,
      transactionId: txnId,
      message: `Payment of ₹${amount} successful via Debit Card`,
      timestamp: new Date(),
    };
  }
}

// ==================== Context ====================

class PaymentInit {
  private paymentStrategy: PaymentStrategy;
  private history: PaymentResult[] = [];

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  changeStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  async execute(amount: number): Promise<PaymentResult> {
    const result = await this.paymentStrategy.pay(amount);
    this.history.push(result);

    if (!result.success) {
      console.error(`Payment failed: ${result.message}`);
    }

    return result;
  }

  getHistory(): PaymentResult[] {
    return this.history;
  }
}

// ==================== Client Code ====================

async function main() {
  const payment = new PaymentInit(new Upi("kishan@okhdfcbank"));
  const result1 = await payment.execute(400);
  console.log(result1);

  // runtime pe strategy switch — yahi Strategy pattern ka real power hai
  payment.changeStrategy(new DebitCard("1234567890123456", "123", "12/27"));
  const result2 = await payment.execute(1500);
  console.log(result2);

  // invalid case dikhane ke liye
  payment.changeStrategy(new Upi("invalid-upi-id"));
  const result3 = await payment.execute(200);
  console.log(result3);

  console.log("Full transaction history:", payment.getHistory());
}

main();