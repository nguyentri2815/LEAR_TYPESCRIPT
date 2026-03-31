// generic helper :

const mapToOptions = <T>(
  arr: T[],
  getLabel: (item: T) => string,
  getValue: (item: T) => string
) => arr.map((item) => ({ value: getValue(item), label: getLabel(item) }));

// usage :
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const userOptions = mapToOptions(
  users,
  (user) => user.name,
  (user) => user.id.toString()
);
console.log(userOptions);


const groupBy = <T, K extends string>(arr: T[], getKey: (item: T) => K): Record<K, T[]> => {
  return arr.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) {
        acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

// usage :
interface Product {
  id: number;
  category: string;
  name: string;
}

const products: Product[] = [
  { id: 1, category: "Electronics", name: "Laptop" },
  { id: 2, category: "Electronics", name: "Phone" },
  { id: 3, category: "Books", name: "Novel" },
];

const productsByCategory = groupBy(products, (product) => product.category);
console.log(productsByCategory);

const toRecordById = <T extends { id: number }>(arr: T[]): Record<number, T> => {
  return arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<number, T>);
};

// usage :
interface Employee {
  id: number;
  name: string;
}
const employees: Employee[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];
const employeeRecord = toRecordById(employees);
console.log(employeeRecord);