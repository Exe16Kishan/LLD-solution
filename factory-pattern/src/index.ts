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
