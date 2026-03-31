// domainTable :
interface Product {
    id:string,
    name:string,
}

interface ProductTableProps {
    items: Product[],
    onSelect: (item: Product) => void,
    onDelete: (id: string) => void,
}

const ProductTable =  (props:ProductTableProps) =>{
    const {items,onSelect, onDelete} = props
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    <span>{item.name}</span>
                    <button onClick={() => onSelect(item)}>Select</button>
                    <button onClick={() => onDelete(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

