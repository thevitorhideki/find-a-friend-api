import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { GetPetByIdService } from './get-pet-by-id'

describe('Get pet by id', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetByIdService

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetByIdService(petsRepository)
  })

  it('should be able to list a pet by id', async () => {
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

    const { pet } = await sut.execute({
      petId: 'pet-01',
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Doguinho')
  })

  it('should not be able to list a pet by inexistent id', async () => {
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

    await expect(
      sut.execute({
        petId: 'inexistent-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
