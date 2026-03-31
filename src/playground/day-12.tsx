//pattern modal:

interface Product {
  id: number;
  name: string;
  
}
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const ProductModal = (props: ProductModalProps) => {
  const { isOpen, onClose, product } = props;

    if (!isOpen) return null;

    const { id, name } = product;
    return (
        <div>
            <h3>Modal content here</h3>
            <p>ID: {id}</p>
            <p>Name: {name}</p>
            <button onClick={onClose}>Close Modal</button>
        </div>
    );
}
