import {
  Age,
  EnergyLevel,
  Environment,
  Pet,
  Prisma,
  Size,
} from '@prisma/client'

export interface SearchManyParams {
  city: string
  age?: Age
  size?: Size
  energyLevel?: EnergyLevel
  environment?: Environment
}

export interface PetsRepository {
  findById(petId: string): Promise<Pet | null>
  searchMany(params: SearchManyParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
