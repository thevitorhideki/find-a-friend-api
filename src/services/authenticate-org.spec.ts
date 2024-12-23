import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrgService } from './authenticate-org'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

describe('Authenticate Org', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateOrgService

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgService(orgsRepository)
  })

  it('should be able to authenticate an org', async () => {
    await orgsRepository.create({
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
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: 'S3cret123',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate an org with wrong email', async () => {
    await orgsRepository.create({
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
    })

    await expect(
      sut.execute({
        email: 'wrong@email.com',
        password: 'S3cret123',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an org with wrong password', async () => {
    await orgsRepository.create({
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
    })

    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: 'S3cret',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
