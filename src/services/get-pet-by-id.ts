import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

interface GetPetByIdServiceRequest {
  petId: string
}

interface GetPetByIdServiceResponse {
  pet: Pet
}

export class GetPetByIdService {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetByIdServiceRequest): Promise<GetPetByIdServiceResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
