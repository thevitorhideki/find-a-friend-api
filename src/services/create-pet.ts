import { PetsRepository } from '@/repositories/pets-repository'
import { Age, EnergyLevel, Environment, Pet, Size } from '@prisma/client'

interface CreatePetServiceRequest {
  name: string
  about: string
  age: Age
  size: Size
  energyLevel: EnergyLevel
  environment: Environment
  requirementsForAdoption: string[]
  organizationId: string
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    requirementsForAdoption,
    organizationId,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energyLevel,
      environment,
      requirementsForAdoption,
      organizationId,
    })

    return { pet }
  }
}
