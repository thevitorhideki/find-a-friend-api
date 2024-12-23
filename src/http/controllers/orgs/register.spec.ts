import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an Org', async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'Cães legais',
      authorName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '11999999999',
      password: 'S3cret123',
      cep: '01001-000',
      state: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
      latitude: -23.5512505,
      longitude: -46.6346962,
    })

    expect(response.statusCode).toEqual(201)
  })
})
