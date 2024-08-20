const request = require('supertest')
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect()
    })

    afterAll(async () => {
        await mongoDisconnect()
    })

    describe('/GET launches', () => {
        test('should return all launches', async () => {
            await request(app)
                .get('/launches')
                .expect(200)
                .expect('Content-Type', /json/)
        })
    })

    describe('/POST launches', () => {
        const expectedDate = '2151-01-01'
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            launchDate: expectedDate,
            target: 'Kepler-1652 b',
        }

        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
        }

        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NCC 1701-D',
            launchDate: 'hjel',
            target: 'Kepler-1652 b',
        }

        test('should respond 201 created', async () => {
            const res = await request(app)
                .post('/launches')
                .send(completeLaunchData)
                .expect(201)
                .expect('Content-Type', /json/)

            expect(res.body).toMatchObject({
                ...completeLaunchData,
                launchDate: new Date(expectedDate).valueOf(),
            })
        })
        test('should catch missing required properties', async () => {
            const res = await request(app)
                .post('/launches')
                .send(launchDataWithoutDate)
                .expect(400)
                .expect('Content-Type', /json/)

            expect(res.body).toStrictEqual({
                error: 'Missing required launch property',
            })
        })

        test('should catch invalid dates', async () => {
            const res = await request(app)
                .post('/launches')
                .send(launchDataWithInvalidDate)
                .expect(400)
                .expect('Content-Type', /json/)

            expect(res.body).toStrictEqual({
                error: 'Invalid launch date',
            })
        })
    })
})
