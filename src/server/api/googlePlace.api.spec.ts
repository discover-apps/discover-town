import {Category, getImage, getNearbyPlaces, GooglePlace} from "./googlePlace.api";

describe('Tests getNearbyPlaces', () => {
    it('Successfully gets nearby park places', async done => {
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
describe('Tests getImage', () => {
    it('Successfully gets image metadata for a valid photo_reference', async done => {
        const reference: string = "CmRaAAAACm5etREbep9KkUKNSGV6HG17OpYtXiAENF8FqgwU5qbYptLMq4gc32s4gjxj0s3zBaDkXEubc0mU7BRlvISdBaSZYchBkF5uq_eAozr_bPwCLc5tTluofoULiljKrwugEhAwN34QxHIVF20YVPyq3Qm1GhTRKmsOu6ZKNRA-MKVT5lwuiDHY3g";
        await getImage(reference).then((metadata: string) => {
            expect(metadata).not.toBeNull();
            expect(metadata.length).toBeGreaterThan(0);
        }).catch((error) => {
            expect(error).toBeNull();
        });
        done();
    });
    it('Fails to return image metadata for invalid photo_reference and returns error', async done => {
        const reference: string = "invalid";
        await getImage(reference).then((metadata: string) => {
            expect(metadata).toBeNull();
        }).catch((error) => {
            expect(error).not.toBeNull();
        });
        done();
    })
});