import { makeSearchPetsService } from '@/services/factories/make-search-pets-service'
import { Age, EnergyLevel, Environment, Size } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, rep: FastifyReply) {
  const searchPetQuerySchema = z.object({
    city: z.string(),
    age: z.enum([Age.PUPPY, Age.ADULT]).optional(),
    size: z.enum([Size.SMALL, Size.MEDIUM, Size.BIG]).optional(),
    energyLevel: z
      .enum([EnergyLevel.LOW, EnergyLevel.MEDIUM, EnergyLevel.HIGH])
      .optional(),
    environment: z.enum([Environment.SMALL, Environment.LARGE]).optional(),
  })

  const data = searchPetQuerySchema.parse(req.query)

  const createPetService = makeSearchPetsService()

  const { pets } = await createPetService.execute({ ...data })

  return rep.status(200).send({ pets })
}
