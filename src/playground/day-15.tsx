import { useEffect, useState } from "react";
interface Product {
    id: string;
    name: string;
}
type apiResponse<T> = {
    data: T;
    message: string;
}
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const getProducts = async (): Promise<apiResponse<Product[]>> => {
    return {
        data: [
            { id: "1", name: "Product 1" },
            { id: "2", name: "Product 2" },
            { id: "3", name: "Product 3" },
        ],
        message: "Products fetched successfully"
    };
}
const ProductList = () =>{
    const [products, setProducts] = useState<Product[] | []>([]);

    useEffect(() => {
        // giả lập gọi API
        const fetchProducts = async (): Promise<void> => {
            try {
                await wait(1000);
                const response = await getProducts();
                const productData = response.data.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                    } as Product;
                });
                setProducts(productData);
                console.log(response.message);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);

    if (products.length === 0) {
        return <p>Loading products...</p>;
    }
    return <ul>
        {products.map((product: Product) => (
            <li key={product.id}>{product.name}</li>
        ))}
    </ul>;
}