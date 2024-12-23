import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
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

    await prisma.pet.create({
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

    await prisma.pet.create({
      data: {
        name: 'Dog',
        about: 'Um cão muito legal',
        age: 'PUPPY',
        size: 'MEDIUM',
        energyLevel: 'HIGH',
        environment: 'LARGE',
        requirementsForAdoption: [
          'Proibido Apartamento',
          'Ambiente frio, pois possui muito pelo',
        ],
        organizationId: org.id,
      },
    })

    const response = await request(app.server).get(`/pets?city=${'São Paulo'}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
