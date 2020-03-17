export default interface Event {
    id?: number;
    title: string;
    rating: number;
    description: string;
    imageUrl?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    lat: number;
    lon: number;
    startTime: Date;
    datePosted: Date;
}