// keyof, indexed access types, helper types

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
// }

// type ProductKeys = keyof Product; // 'id' | 'name' | 'price' | 'description'

// type ProductNameType = Product["name"]; // string

// // Helper types
// const getValue = <T, K extends keyof T>(obj: T, key: K): T[K] => {
//   return obj[key];
// };
// const getNameValue = (): ProductNameType =>
//   getValue(
//     { id: "1", name: "Product 1", price: 100, description: "A product" },
//     "name",
//   ); // string

// type Column<T, K extends keyof T> = {
//     label: string;
//     name: K;
// }