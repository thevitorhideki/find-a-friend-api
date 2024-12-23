import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { PetsRepository, SearchManyParams } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(petId: string): Promise<Pet | null> {
    const pet = prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    return pet
  }

  async searchMany(params: SearchManyParams): Promise<Pet[]> {
    const pets = prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energyLevel: params.energyLevel,
        environment: params.environment,
        organization: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
