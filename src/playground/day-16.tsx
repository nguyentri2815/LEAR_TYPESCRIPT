
//DTO và Ui model:

import { useEffect, useState } from "react";
interface ProductDTO {
    id: string;
    name_product: string;
}
interface Product {
    id: string;
    name: string;
}
type apiResponse<T> = {
    data: T;
    message: string;
}
const mapProductDTOToProduct = (productDTO: ProductDTO): Product => {
    return {
        id: productDTO.id,
        name: productDTO.name_product,
    };
}
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const getProducts = async (): Promise<apiResponse<ProductDTO[]>> => {
    return {
        data: [
            { id: "1", name_product: "Product 1" },
            { id: "2", name_product: "Product 2" },
            { id: "3", name_product: "Product 3" },
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
                    return mapProductDTOToProduct(item);
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