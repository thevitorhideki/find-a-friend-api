import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const passwordHash = await hash('S3cret123', 6)

  await prisma.organization.create({
    data: {
      name: 'Cães legais',
      authorName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '11999999999',
      passwordHash,
      cep: '01001-000',
      state: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
      latitude: -23.5512505,
      longitude: -46.6346962,
    },
  })

  const sessionResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: 'S3cret123',
  })

  const { accessToken } = sessionResponse.body

  return { accessToken }
}
