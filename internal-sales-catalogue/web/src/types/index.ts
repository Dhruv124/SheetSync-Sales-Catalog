export interface Category {
    id: string;
    name: string;
    image_url: string;
    description: string;
}

export interface Product {
    id: string;
    category_id: string;
    name: string;
    price: number;
    description: string;
    image_url: string;
    in_stock: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    date: string;
    client_name: string;
    phone: string;
    items_json: string;
    total_amount: number;
}
