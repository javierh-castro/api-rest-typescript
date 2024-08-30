import request from "supertest"
import server from "../server"

describe('Get/ Api', () => {
    it('Provando bases de datos', async () => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)
        console.log(res.status)
    }
    )
})