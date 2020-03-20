export default interface Event {
    id?: number;
    title: string;
    description: string;
    imageUrl?: string;
    address_name: string;
    address_location: string;
    lat: number;
    lon: number;
    startTime: Date;
    datePosted: Date;
}

export interface EventLocation {
    formatted_address: string;
    lat: number;
    lon: number;
}