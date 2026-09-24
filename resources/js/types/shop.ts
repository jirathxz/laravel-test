export interface Category {
    id: number;
    name: string;
    slug: string;
    type: 'hardware' | 'software';
    description: string | null;
    icon: string | null;
    products_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    brand: string;
    type: 'hardware' | 'software';
    price: number;
    stock: number;
    description: string | null;
    specs: Record<string, string> | null;
    image_url: string | null;
    is_featured: boolean;
    category?: Category;
    created_at?: string;
    updated_at?: string;
}

export interface CartItem {
    id: number;
    user_id: number | null;
    session_id: string | null;
    product_id: number;
    quantity: number;
    product: Product;
    created_at?: string;
    updated_at?: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number | null;
    product_name: string;
    price: number;
    quantity: number;
    subtotal: number;
    product?: Product;
}

export interface Order {
    id: number;
    order_number: string;
    user_id: number | null;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    shipping_address: string;
    payment_method: 'promptpay' | 'cod';
    payment_status: 'pending' | 'paid';
    order_status: 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';
    total_amount: number;
    notes: string | null;
    created_at: string;
    updated_at?: string;
    items?: OrderItem[];
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface RepairTicket {
    id: number;
    ticket_number: string;
    user_id: number | null;
    device_type: 'desktop' | 'notebook' | 'macbook' | 'component' | 'software' | 'other';
    device_brand: string;
    device_model: string;
    serial_number: string | null;
    service_type: 'drop_off' | 'pickup';
    problem_description: string;
    symptoms: string[] | null;
    urgency: 'normal' | 'urgent';
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    customer_address: string | null;
    status: 'pending' | 'inspecting' | 'in_progress' | 'waiting_parts' | 'completed' | 'cancelled';
    estimated_cost: number | null;
    technician_notes: string | null;
    completed_at: string | null;
    created_at: string;
    updated_at?: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

