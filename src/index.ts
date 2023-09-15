// Напишіть функцію isString, яка перевірятиме, чи є передане значення рядком. Потім використовуйте її для звуження типу змінної.

function isString(value: any): value is string {
  return typeof value === 'string';
}

// Example of using the function for sounding the type of a variable:
function processValue(input: any) {
  if (isString(input)) {
    // input is of type string
    console.log(input.length); 
  } else {
    console.log("This is not a string");
  }
}

// У вас є масив з елементами різних типів. Напишіть функцію, яка приймає цей масив і фільтрує його так, щоб у підсумку в ньому залишилися тільки рядки. Використовуйте захисника типу для цього завдання.
function filterStrings(inputArray: (string | number | boolean)[]): string[] {
  const result: string[] = [];

  for (const item of inputArray) {
    if (typeof item === 'string') {
      result.push(item);
    }
  }

  return result;
}


// У вас є об'єкт, який може містити довільні властивості. Напишіть функцію, яка приймає цей об'єкт і повертає значення однієї з властивостей, якщо воно існує і має певний тип.
function getValueFromObject(obj: Record<string, unknown>, key: string, expectedType: string): any {
  if (key in obj && typeof obj[key] === expectedType) {
    return obj[key];
  }
  return undefined;
}
const myObject: Record<string, unknown> = {
  name: "Valentina",
  age: 32,
};

const nameValue = getValueFromObject(myObject, "name", "string");
if (nameValue !== undefined) {
  console.log("Name meaning:", nameValue);
} else {
  console.log("Unable to retrieve name value");
}


// Створіть кілька захисників типу, кожен з яких перевіряє певний аспект об'єкта (наприклад, наявність певної властивості або її тип). Потім напишіть функцію, яка використовує цих захисників у комбінації для звуження типу об'єкта до більш конкретного типу.
interface Person {
  name: string;
  age: number;
  email?: string;
}

// Type protector for checking the presence of the "name" property in an object
function hasNameProperty(obj: any): obj is Person {
  return 'name' in obj;
}

// Type protector for checking the type of the "age" property in an object
function hasValidAgeType(obj: any): obj is Person {
  return typeof obj.age === 'number';
}

// Type protector to check for the presence of the "email" property in an object
function hasEmailProperty(obj: any): obj is Person {
  return 'email' in obj;
}

// A function that uses type protectors to narrow the type of an object
function processPerson(person: any): void {
  if (hasNameProperty(person) && hasValidAgeType(person)) {
    // Narrowing the type to Person
    console.log(`Name: ${person.name}, Age: ${person.age}`);

    if (hasEmailProperty(person)) {
      // Here you can already use person.email, since the "email" property is
      console.log(`Email: ${person.email}`);
    }
  } else {
    console.log('This is not an object of type Person.');
  }
}



// У вас є змінна, яка може бути одного з декількох типів (наприклад, рядок або число). Напишіть функцію, яка приймає цю змінну і виконує довільні операції, специфічні для кожного з типів.
function doSomething(value: string | number): void {
  switch (typeof value) {
    case 'string':
      // Operations for strings
      console.log('This is the string:', (value as string).toUpperCase());
      break;
    case 'number':
      // Operations for numbers
      console.log('This number:', value * 2);
      break;
    default:
      console.log('This is a different type of');
      break;
  }

  // or this method of solution

  // function doSomething(input: string | number): void {
  // if (typeof input === 'string') {
  //   // Operations for strings
  //   console.log(`This is the string: ${input}`);
  //   // Operations for numbers
  // } else if (typeof input === 'number') {
  //   // 
  //   console.log(`This number: ${input}`);
  //   //Additional operations for a number can be added here
  // } else {
  //   console.log('Unknown data type');
  // }
}



// Створіть захисник типу, який перевірятиме, чи є передане значення функцією. Потім напишіть функцію, яка використовує цей гард для звуження типу змінної і викликає передану функцію, якщо вона існує.
function isFunction(value: any): value is Function {
  return typeof value === 'function';
}


// A function that uses a guard to narrow the type of a variable and calls the passed function if it exists

function callIfFunction<T>(value: T, func: (arg: T) => void) {
  if (isFunction(func)) {
    func(value);
  }
}


// Створіть класи з ієрархією успадкування і потім напишіть функцію, яка використовує захисник типу для звуження типу об'єктів, що базуються на цій ієрархії.

// Basic class for the car
class Car {
  constructor(public brand: string) {}
}

// Derivative class for a sports car
class SportsCar extends Car {
  constructor(brand: string, public topSpeed: number) {
    super(brand);
  }
}

// Derivative class for the truck
class Truck extends Car {
  constructor(brand: string, public payloadCapacity: number) {
    super(brand);
  }
}

// Derivative class for a sedan
class Sedan extends Car {
  constructor(brand: string, public numberOfDoors: number) {
    super(brand);
  }
}

// A function that uses a type protector to narrow the type of objects
function performCarAction(car: Car | SportsCar| Truck | Sedan) {
  if (car instanceof SportsCar) {
    console.log(`this is a sport car ${car.brand}, speed: ${car.topSpeed}`);
  } else if (car instanceof Truck) {
    console.log(`this is a truck ${car.brand}, payload Capacity: ${car.payloadCapacity}`);
  } else if (car instanceof Sedan) {
    console.log(`this is sedan ${car.brand}, number Of Doors: ${car.numberOfDoors}`);
  } else {
    console.log(`this is a car ${car.brand}`);
  }
}