export interface Brands {
    id: number;
    name: string;
}

export interface Models {
    model: string;
}

export interface Registrations {
    initial_registration: string;
}

export interface Fuels {
    name: string;
}

export interface Car {
    id: number;
    brand: string;
    model: string;
    initial_registration: string;
    description: string;
    mileage: string;
    price: number;
    fuel: string;
}

export interface Rating {
    data: Car[];
    total: number;
    rating: {
        minValue: number | null;
        maxValue: number | null;
    };
}
