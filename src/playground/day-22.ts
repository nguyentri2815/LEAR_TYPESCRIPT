// utility type: Readonly, Partial, Required, Pick, Omit, Exclude, Extract, NonNullable, ReturnType, InstanceType

// // Readonly: Tạo một type mới với tất cả các thuộc tính của type gốc nhưng là readonly
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// };

// // Partial: Tạo một type mới với tất cả các thuộc tính của type gốc nhưng là optional
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };

// // Required: Tạo một type mới với tất cả các thuộc tính của type gốc nhưng là required
// type Required<T> = {
//   [P in keyof T]-?: T[P];
// };
// // Pick: Tạo một type mới với một tập hợp con các thuộc tính của type gốc
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// };
// // Omit: Tạo một type mới với tất cả các thuộc tính của type gốc trừ đi một tập hợp con
// type Omit<T, K extends keyof T> = {
//   [P in Exclude<keyof T, K>]: T[P];
// };
// // Exclude: Tạo một type mới bằng cách loại bỏ các loại con từ một type union
// type Exclude<T, U> = T extends U ? never : T;

// // Extract: Tạo một type mới bằng cách chọn các loại con từ một type union
// type Extract<T, U> = T extends U ? T : never;

// // NonNullable: Tạo một type mới bằng cách loại bỏ null và undefined từ một type
// type NonNullable<T> = T extends null | undefined ? never : T;

// // ReturnType: Tạo một type mới với kiểu trả về của một hàm
// type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

// // InstanceType: Tạo một type mới với kiểu của một lớp
// type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;


