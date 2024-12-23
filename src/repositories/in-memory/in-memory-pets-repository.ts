import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository, SearchManyParams } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private readonly orgsRepository: InMemoryOrgsRepository) {}

  async findById(petId: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany(params: SearchManyParams): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.items.filter(
      (item) => item.city === params.city
    )

    const pets = this.items
      .filter((item) =>
        orgsByCity.some((org) => org.id === item.organizationId)
      )
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energyLevel ? item.energyLevel === params.energyLevel : true
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true
      )

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      ...data,
      requirementsForAdoption: Array.isArray(data.requirementsForAdoption)
        ? data.requirementsForAdoption
        : [],
    }

    this.items.push(pet)

    return pet
  }
}
