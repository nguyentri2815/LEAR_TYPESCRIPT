//custom render columns :

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

type ProductKeys = keyof Product; // 'id' | 'name' | 'price' | 'description'

type ProductNameType = Product["name"]; // string

// Helper types
const getValue = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};
const getNameValue = (): ProductNameType =>
  getValue(
    { id: "1", name: "Product 1", price: 100, description: "A product" },
    "name",
  ); // string

type Column<T> = {
    label: string;
    key: string;
    dataKey?: keyof T;
    render?: (item: T) => React.ReactNode;
}

interface ProductListProps {
    items: Product[];
    onSelect: (item: Product) => void;
    onDelete: (item: Product) => void;
}

const ProductList = (props: ProductListProps) => {
    const columns: Column<Product>[] = [
        { label: "ID", key: "id" },
        { label: "Name", key: "name" },
        { label: "Price", key: "price" },
        { label: "Description", key: "description" },
    ];
    return <ul>
        {props.items.map((item) => (
            <li key={item.id}>
                {columns.map((col) => {
                    const fallbackValue = item[col.key as keyof Product];

                    if (col.render) {
                        return <span>{col.render(item)}</span>;
                    }
                    if (col.dataKey) {
                        return <span>{getValue(item, col.dataKey)}</span>;
                    }
                    
                    return <span>{fallbackValue}</span>;
                })}
            </li>
        ))}
    </ul>
}