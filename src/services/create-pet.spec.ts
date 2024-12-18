import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetService } from './create-pet'

describe('Create Pet', () => {
  let petsRepository: PetsRepository
  let sut: CreatePetService

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
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
