import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetByIdService } from '../get-pet-by-id'

export function makeGetPetByIdService() {
  const petsRepository = new PrismaPetsRepository()
  const getPetByIdService = new GetPetByIdService(petsRepository)

  return getPetByIdService
}
