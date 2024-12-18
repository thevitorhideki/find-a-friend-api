import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

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
