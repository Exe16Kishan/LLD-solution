// there are two types of factory pattern are
// simple factory  and factory pattern

interface Send {
  send(m: string): void;
}

class Sms implements Send {
  send(m: string) {
    console.log(`${m} message through sms`);
  }
}

class Email implements Send {
  send(m: string): void {
    console.log(`${m} message through mail`);
  }
}

class Factory {
  static notification(type: string): Send {
    switch (type) {
      case "Sms":
        return new Sms();

      case "Email":
        return new Email();

      default:
        throw new Error("Unknown notification type");
    }
  }
}

class ClientNotification {
  static create(type: string, m: string) {
    const notification = Factory.notification(type);
    notification.send(m);
  }
}

const sms = ClientNotification.create("Sms", "helllo");
const mail = ClientNotification.create("Email", "helllo");

// now we will create proper factory method

interface Payment {
  send(amount: number): void;
}

class Upi implements Payment {
  send(amount: number): void {
    console.log(`${amount} paid successfully using UPI`);
  }
}

class Cash implements Payment {
  send(amount: number): void {
    console.log(`${amount} paid successfully using Cash`);
  }
}

class DebitCard implements Payment {
  send(amount: number): void {
    console.log(`${amount} paid successfully using DebitCard`);
  }
}

abstract class PaymentCreator {
   abstract createPayment(): Payment;
  pay(amount: number): void {
    const payment = this.createPayment();
    payment.send(amount);
  }
}


class UpiCreator extends PaymentCreator {
   createPayment(): Payment {
    return new Upi()
  }
}

class CashCreator extends PaymentCreator {
  createPayment(): Payment {
    return new Cash()
  }
}

class DebitCardCreator extends PaymentCreator{
  createPayment(): Payment {
    return new DebitCard()
  }
}


const upi = new UpiCreator()
upi.pay(500)

const cash = new CashCreator().pay(1000)
const Card = new DebitCardCreator().pay(20000)