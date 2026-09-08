type student = {
  name: string;
  roll: number;
};

class School {
  private static class: Map<string, student[]>;
  private constructor() {}
  static getInstance() {
    if (!this.class) {
      this.class = new Map<string, student[]>();
    }
    return this.class;
  }
}

const guruKripa = School.getInstance();
const stThomas = School.getInstance();
guruKripa.set("1", [
  { name: "kishan", roll: 1 },
  { name: "cutieBhai", roll: 2 },
]);

stThomas.set("2", [
  { name: "prince", roll: 1 },
  { name: "aakarsh", roll: 2 },
]);
console.log(guruKripa);
console.log(stThomas);

console.log(guruKripa === stThomas)
