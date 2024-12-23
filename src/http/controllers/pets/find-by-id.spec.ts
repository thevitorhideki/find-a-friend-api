import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find Pet by Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find a pet by id', async () => {
    const org = await prisma.organization.create({
      data: {
        name: 'Cães legais',
        authorName: 'John Doe',
        email: 'johndoe@example.com',
        phone: '11999999999',
        passwordHash: await hash('S3cret123', 6),
        cep: '01001-000',
        state: 'São Paulo',
        city: 'São Paulo',
        neighborhood: 'Sé',
        street: 'Praça da Sé',
        latitude: -23.5512505,
        longitude: -46.6346962,
      },
    })

    const pet = await prisma.pet.create({
      data: {
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
        organizationId: org.id,
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`)

    expect(response.statusCode).toEqual(200)
  })
})
