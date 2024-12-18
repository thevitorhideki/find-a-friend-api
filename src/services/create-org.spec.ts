import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgService } from './create-org'

describe('Create Org', () => {
  let orgsRepository: OrgsRepository
  let sut: CreateOrgService

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgService(orgsRepository)
  })

  it('should be able to create an org', async () => {
    const { org } = await sut.execute({
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

    expect(org.id).toEqual(expect.any(String))
    expect(org.name).toEqual('Cães legais')
  })
})
