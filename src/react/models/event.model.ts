export default interface Event {
    id?: number;
    title: string;
    description: string;
    imageUrl?: string;
    address_name: string;
    address_location: string;
    lat: number;
    lon: number;
    dateStart: Date;
    datePosted: Date;
}

export interface UserHostingEvent {
    userId: number;
    eventId: number;
}