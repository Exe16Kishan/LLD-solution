# Singleton Design Pattern — TypeScript

## 1. What is Singleton?

The **Singleton Design Pattern** ensures that a class has **only one shared instance** within the application scope and provides a way to access that same instance again and again.

The basic idea:

```text
First call
    ↓
Does instance exist?
    ↓
NO → Create it → Store it → Return it

Second call
    ↓
Does instance exist?
    ↓
YES → Return the existing instance
```

Therefore:

```ts
School.getInstance() === School.getInstance()
```

will be:

```text
true
```

---

# 2. Example

```ts
type Student = {
  name: string;
  roll: number;
};

class School {

  // A class-level variable.
  // It stores the ONE shared Map.
  private static class: Map<string, Student[]>;

  // Prevents objects from being created directly.
  private constructor() {}

  // Static method can be called using:
  // School.getInstance()
  static getInstance() {

    // If the Map does not exist yet,
    // create it.
    if (!this.class) {
      this.class = new Map<string, Student[]>();
    }

    // Return the existing Map.
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

console.log(guruKripa === stThomas);
```

---

# 3. Understanding the Important Parts

## `private static class`

```ts
private static class: Map<string, Student[]>;
```

Break it down:

```text
private
   ↓
Only the School class can directly access it.

static
   ↓
It belongs to the School CLASS,
not to individual School objects.

class
   ↓
The variable name.

Map<string, Student[]>
   ↓
The type of value stored in it.
```

So conceptually:

```text
             School CLASS
                  │
                  │
             static class
                  │
                  ↓
          Map<string, Student[]>
```

There is only **one Map stored by the class**.

---

# 4. Why is `static` required?

We want to call:

```ts
School.getInstance();
```

without creating a `School` object first.

Therefore:

```ts
static getInstance()
```

belongs to the class itself.

A static method can access static properties:

```ts
static getInstance() {
  this.class;
}
```

Here, `this` refers to the class in the static context.

So:

```ts
this.class
```

is referring to the same static property as:

```ts
School.class
```

Conceptually:

```text
School.getInstance()
       ↓
static method
       ↓
this = School class
       ↓
this.class
       ↓
shared Map
```

---

# 5. Why is the constructor private?

```ts
private constructor() {}
```

Normally, we could do:

```ts
const school = new School();
```

But because the constructor is private:

```ts
const school = new School(); // ❌ Error
```

Nobody outside the class can directly create a `School` object.

This is important because Singleton wants the class to **control the creation/access of the shared object**.

---

# 6. The `getInstance()` method

```ts
static getInstance() {

  if (!this.class) {
    this.class = new Map<string, Student[]>();
  }

  return this.class;
}
```

This is the heart of the Singleton.

### First call

```ts
const guruKripa = School.getInstance();
```

Initially:

```text
this.class
    ↓
undefined
```

Therefore:

```ts
if (!this.class)
```

is true.

So:

```ts
this.class = new Map<string, Student[]>();
```

creates the Map.

Then:

```ts
return this.class;
```

returns that Map.

---

### Second call

```ts
const stThomas = School.getInstance();
```

This time:

```text
this.class
    ↓
already contains Map
```

Therefore:

```ts
if (!this.class)
```

is false.

The Map is **not created again**.

Instead:

```ts
return this.class;
```

returns the same Map.

---

# 7. Why `guruKripa` and `stThomas` are the same

We have:

```ts
const guruKripa = School.getInstance();

const stThomas = School.getInstance();
```

Both variables receive the exact same Map.

Conceptually:

```text
                  School
                    │
                    │
              static class
                    │
                    ↓
              ┌───────────┐
              │    Map    │
              └───────────┘
                 ↑     ↑
                 │     │
          guruKripa  stThomas
```

Therefore:

```ts
guruKripa === stThomas
```

returns:

```text
true
```

---

# 8. Why changes through one variable appear through the other

We do:

```ts
guruKripa.set("1", [
  { name: "kishan", roll: 1 },
  { name: "cutieBhai", roll: 2 },
]);
```

Then:

```ts
stThomas.set("2", [
  { name: "prince", roll: 1 },
  { name: "aakarsh", roll: 2 },
]);
```

Because both variables point to the **same Map**:

```text
guruKripa ──────┐
                │
                ↓
          ┌─────────────┐
          │ SAME MAP    │
          │             │
          │ "1" → [...] │
          │ "2" → [...] │
          └─────────────┘
                ↑
                │
stThomas ───────┘
```

So both:

```ts
console.log(guruKripa);
console.log(stThomas);
```

show the same data.

---

# 9. Important: `instance` doesn't have to be a class object

A common misunderstanding is:

```ts
private static instance: School;
```

must always be used for Singleton.

**No.**

`static` only means the property belongs to the class.

The property can store many different types.

For example:

```ts
private static instance: Map<string, Student[]>;
```

Our Singleton is storing a **Map**.

It could also store:

```ts
private static instance: string[];
```

or:

```ts
private static instance: Set<number>;
```

or:

```ts
private static instance: Database;
```

The important thing is that the same value is created once and returned repeatedly.

---

# 10. The actual Singleton structure

Your example can be reduced to this pattern:

```ts
class Something {

  private static instance: SomeType;

  private constructor() {}

  static getInstance() {

    if (!this.instance) {
      this.instance = new SomeType();
    }

    return this.instance;
  }
}
```

The three important pieces are:

### 1. Static property

```ts
private static instance;
```

Stores the shared object/value.

### 2. Private constructor

```ts
private constructor() {}
```

Prevents outside code from creating the object directly.

### 3. Static getter method

```ts
static getInstance() {}
```

Provides controlled access to the shared value.

---

# 11. One important observation about this example

Technically, your `School` class isn't storing a `School` object.

It is storing:

```ts
Map<string, Student[]>
```

So this is better understood as:

> **A Singleton Map managed by the `School` class.**

If we wanted the more traditional OOP Singleton where the Singleton itself is a `School` object, we'd normally write:

```ts
class School {

  private static instance: School;

  private constructor() {}

  static getInstance() {

    if (!this.instance) {
      this.instance = new School();
    }

    return this.instance;
  }
}
```

But your version is useful for learning because it makes the idea of **one shared object** very obvious.

---

# 12. Revision Cheat Sheet

```text
Singleton
│
├── Goal
│     └── Only one shared instance/value
│
├── private constructor
│     └── Prevent direct creation
│
├── static property
│     └── Store shared value on the class
│
├── static getInstance()
│     └── Access the shared value without an object
│
└── if (!instance)
      ├── First call → create it
      └── Later calls → return existing one
```

The most important line to remember is:

```ts
if (!this.class) {
  this.class = new Map<string, Student[]>();
}
```

It means:

> **"If our shared Map doesn't exist, create it. Otherwise, don't create another one."**

And this:

```ts
const guruKripa = School.getInstance();
const stThomas = School.getInstance();

guruKripa === stThomas; // true
```

proves that both variables received the **same object reference**.
