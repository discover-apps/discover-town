export default interface Event {
    id?: number;
    title: string;
    description: string;
    imageUrl?: string;
    location_name: string;
    location_address: string;
    lat: number;
    lon: number;
    startTime: Date;
    datePosted: Date;
}