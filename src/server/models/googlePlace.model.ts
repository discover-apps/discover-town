export interface GooglePlace {
    place_id?: string;
    name?: string;
    formatted_address?: string;
    formatted_phone_number?: string;
    lat?: number;
    lon?: number;
    image?: string;
    website?: string;
    open_now?: boolean;
    open_hours?: string[];
}