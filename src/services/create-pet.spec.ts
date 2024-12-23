import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetService } from './create-pet'

describe('Create Pet', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: CreatePetService

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetService(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
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

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Doguinho')
  })
})
