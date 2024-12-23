import { PetsRepository } from '@/repositories/pets-repository'
import { Age, EnergyLevel, Environment, Pet, Size } from '@prisma/client'

interface SearchPetsServiceRequest {
  city: string
  age?: Age
  size?: Size
  energyLevel?: EnergyLevel
  environment?: Environment
}

interface SearchPetsServiceResponse {
  pets: Pet[]
}

export class SearchPetsService {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute(
    params: SearchPetsServiceRequest
  ): Promise<SearchPetsServiceResponse> {
    const pets = await this.petsRepository.searchMany({
      ...params,
    })

    return { pets }
  }
}
