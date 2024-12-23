import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/tests/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { accessToken } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Doguinho',
        about: 'Um cão muito legal',
        age: 'PUPPY',
        size: 'SMALL',
        energyLevel: 'HIGH',
        environment: 'LARGE',
        requirementsForAdoption: [
          'Proibido Apartamento',
          'Ambiente frio, pois possui muito pelo',
        ],
      })

    expect(response.statusCode).toEqual(201)
  })
})
