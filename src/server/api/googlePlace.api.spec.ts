import {Category, getImage, getNearbyPlaces, getPlaceDetails} from "./googlePlace.api";
import {GooglePlace} from "../models/googlePlace.model";

describe("Tests getNearbyPlaces", () => {
    it("Successfully gets nearby zoo places", async done => {
        await getNearbyPlaces(Category.Zoo, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby bar places", async done => {
        await getNearbyPlaces(Category.Bar, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby gym places", async done => {
        await getNearbyPlaces(Category.Gym, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby cafe places", async done => {
        await getNearbyPlaces(Category.Cafe, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby museum places", async done => {
        await getNearbyPlaces(Category.Museum, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby stadium places", async done => {
        await getNearbyPlaces(Category.Stadium, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby lodging places", async done => {
        await getNearbyPlaces(Category.Lodging, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby aquarium places", async done => {
        await getNearbyPlaces(Category.Aquarium, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby nightclub places", async done => {
        await getNearbyPlaces(Category.Nightclub, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby restaurant places", async done => {
        await getNearbyPlaces(Category.Restaurant, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby university places", async done => {
        await getNearbyPlaces(Category.University, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby campground places", async done => {
        await getNearbyPlaces(Category.Campground, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby art gallery places", async done => {
        await getNearbyPlaces(Category.ArtGallery, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby shopping mall places", async done => {
        await getNearbyPlaces(Category.ShoppingMall, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby movie theater places", async done => {
        await getNearbyPlaces(Category.MovieTheater, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby bowling alley places", async done => {
        await getNearbyPlaces(Category.BowlingAlley, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby amusement park places", async done => {
        await getNearbyPlaces(Category.AmusementPark, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby tourist attraction places", async done => {
        await getNearbyPlaces(Category.TouristAttraction, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Successfully gets nearby park places", async done => {
        await getNearbyPlaces(Category.Park, 4).then((results: GooglePlace[]) => {
            expect(results).not.toBeNull();
            expect(results.length).toBeGreaterThan(0);
            expect(results.length).toBeLessThanOrEqual(4);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
});
describe("Tests getImage", () => {
    it("Successfully gets image metadata for a valid photo_reference", async done => {
        const reference: string = "CmRaAAAACm5etREbep9KkUKNSGV6HG17OpYtXiAENF8FqgwU5qbYptLMq4gc32s4gjxj0s3zBaDkXEubc0mU7BRlvISdBaSZYchBkF5uq_eAozr_bPwCLc5tTluofoULiljKrwugEhAwN34QxHIVF20YVPyq3Qm1GhTRKmsOu6ZKNRA-MKVT5lwuiDHY3g";
        await getImage(reference).then((metadata: string) => {
            expect(metadata).not.toBeNull();
            expect(metadata.length).toBeGreaterThan(0);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it("Fails to return image metadata for invalid photo_reference and returns error", async done => {
        const reference: string = "invalid";
        await getImage(reference).then((metadata: string) => {
            expect(metadata).toBeNull();
        }).catch((error) => {
            expect(error).not.toBeNull();
        });
        done();
    })
});
describe("Tests getPlaceDetails", () => {
    it("Gets place details with all valid properties", async done => {
        const place_id = "ChIJiW3oHKtZwokR-5LKdEyEyXo";
        await getPlaceDetails(place_id).then((place: GooglePlace) => {
            expect(place).not.toBeNull();
            expect(place.place_id).toEqual(place_id);
            expect(place.name).toEqual("New York Institute of Technology");
            expect(place.formatted_address).toEqual("1855 Broadway, New York, NY 10023, USA");
            expect(place.formatted_phone_number).toEqual("(212) 261-1500");
            expect(place.website).toEqual("https://www.nyit.edu/");
            expect(typeof place.open_now).toEqual("boolean");
            expect(place.open_hours.length).toEqual(7);
            expect(place.open_hours[0]).toEqual("Monday: 8:00 AM – 11:00 PM");
            expect(place.lat).toEqual(40.7696243);
            expect(place.lon).toEqual(-73.9824114);
            expect(place.image).not.toBeNull();
        });
        done();
    });
});