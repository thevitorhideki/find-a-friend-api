import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchPetsService } from './search-pets'

describe('Search pets with params', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsService

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsService(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'Cães legais',
      authorName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '11999999999',
      passwordHash: 'S3cret123',
      cep: '01001-000',
      state: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
      latitude: -23.5512505,
      longitude: -46.6346962,
    })

    await orgsRepository.create({
      id: 'org-02',
      name: 'Cães legais',
      authorName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '11999999999',
      passwordHash: 'S3cret123',
      cep: '01001-000',
      state: 'Rio de Janeiro',
      city: 'Rio de Janeiro',
      neighborhood: 'Barra da Tijuca',
      street: 'R. Zoila de Abreu Teixeira',
      latitude: -23.0033848,
      longitude: -43.362081,
    })

    await petsRepository.create({
      id: 'pet-01',
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
      organizationId: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-02',
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
      organizationId: 'org-02',
    })

    await petsRepository.create({
      id: 'pet-02',
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
      organizationId: 'org-02',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(1)

    const { pets: pets2 } = await sut.execute({
      city: 'Rio de Janeiro',
    })

    expect(pets2).toHaveLength(2)
  })

  it('should be able to search pets by city and age', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'Cães legais',
      authorName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '11999999999',
      passwordHash: 'S3cret123',
      cep: '01001-000',
      state: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
      latitude: -23.5512505,
      longitude: -46.6346962,
    })

    await petsRepository.create({
      id: 'pet-01',
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
      organizationId: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Doguinho',
      about: 'Um cão muito legal',
      age: 'ADULT',
      size: 'SMALL',
      energyLevel: 'HIGH',
      environment: 'LARGE',
      requirementsForAdoption: [
        'Proibido Apartamento',
        'Ambiente frio, pois possui muito pelo',
      ],
      organizationId: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-02',
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
      organizationId: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      age: 'ADULT',
    })

    expect(pets).toHaveLength(1)

    const { pets: pets2 } = await sut.execute({
      city: 'São Paulo',
      age: 'PUPPY',
    })

    expect(pets2).toHaveLength(2)
  })

  it('should be able to search pets by city and size', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'Cães legais',
      authorName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '11999999999',
      passwordHash: 'S3cret123',
      cep: '01001-000',
      state: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
      latitude: -23.5512505,
      longitude: -46.6346962,
    })

    await petsRepository.create({
      id: 'pet-01',
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
      organizationId: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Dog',
      about: 'Um cão muito legal',
      age: 'ADULT',
      size: 'MEDIUM',
      energyLevel: 'HIGH',
      environment: 'LARGE',
      requirementsForAdoption: [
        'Proibido Apartamento',
        'Ambiente frio, pois possui muito pelo',
      ],
      organizationId: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Dogão',
      about: 'Um cão muito legal',
      age: 'PUPPY',
      size: 'BIG',
      energyLevel: 'HIGH',
      environment: 'LARGE',
      requirementsForAdoption: [
        'Proibido Apartamento',
        'Ambiente frio, pois possui muito pelo',
      ],
      organizationId: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      size: 'SMALL',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toEqual('Doguinho')

    const { pets: pets2 } = await sut.execute({
      city: 'São Paulo',
      size: 'MEDIUM',
    })

    expect(pets2).toHaveLength(1)
    expect(pets2[0].name).toEqual('Dog')

    const { pets: pets3 } = await sut.execute({
      city: 'São Paulo',
      size: 'BIG',
    })

    expect(pets3).toHaveLength(1)
    expect(pets3[0].name).toEqual('Dogão')
  })

  it('should be able to search pets by city and energy level', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'Cães legais',
      authorName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '11999999999',
      passwordHash: 'S3cret123',
      cep: '01001-000',
      state: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
      latitude: -23.5512505,
      longitude: -46.6346962,
    })

    await petsRepository.create({
      id: 'pet-01',
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
      organizationId: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Dog',
      about: 'Um cão muito legal',
      age: 'ADULT',
      size: 'MEDIUM',
      energyLevel: 'HIGH',
      environment: 'LARGE',
      requirementsForAdoption: [
        'Proibido Apartamento',
        'Ambiente frio, pois possui muito pelo',
      ],
      organizationId: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Dogão',
      about: 'Um cão muito legal',
      age: 'PUPPY',
      size: 'BIG',
      energyLevel: 'LOW',
      environment: 'LARGE',
      requirementsForAdoption: [
        'Proibido Apartamento',
        'Ambiente frio, pois possui muito pelo',
      ],
      organizationId: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      energyLevel: 'HIGH',
    })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({
      city: 'São Paulo',
      energyLevel: 'LOW',
    })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    await orgsRepository.create({
      id: 'org-01',
      name: 'Cães legais',
      authorName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '11999999999',
      passwordHash: 'S3cret123',
      cep: '01001-000',
      state: 'São Paulo',
      city: 'São Paulo',
      neighborhood: 'Sé',
      street: 'Praça da Sé',
      latitude: -23.5512505,
      longitude: -46.6346962,
    })

    await petsRepository.create({
      id: 'pet-01',
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
      organizationId: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-02',
      name: 'Dog',
      about: 'Um cão muito legal',
      age: 'ADULT',
      size: 'MEDIUM',
      energyLevel: 'HIGH',
      environment: 'SMALL',
      requirementsForAdoption: [
        'Proibido Apartamento',
        'Ambiente frio, pois possui muito pelo',
      ],
      organizationId: 'org-01',
    })

    await petsRepository.create({
      id: 'pet-03',
      name: 'Dogão',
      about: 'Um cão muito legal',
      age: 'PUPPY',
      size: 'BIG',
      energyLevel: 'LOW',
      environment: 'SMALL',
      requirementsForAdoption: [
        'Proibido Apartamento',
        'Ambiente frio, pois possui muito pelo',
      ],
      organizationId: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      environment: 'SMALL',
    })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({
      city: 'São Paulo',
      environment: 'LARGE',
    })

    expect(pets2).toHaveLength(1)
  })
})
