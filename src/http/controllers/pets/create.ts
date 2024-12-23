import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { Age, EnergyLevel, Environment, Size } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, rep: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum([Age.PUPPY, Age.ADULT]),
    size: z.enum([Size.SMALL, Size.MEDIUM, Size.BIG]),
    energyLevel: z.enum([
      EnergyLevel.LOW,
      EnergyLevel.MEDIUM,
      EnergyLevel.HIGH,
    ]),
    environment: z.enum([Environment.SMALL, Environment.LARGE]),
    requirementsForAdoption: z.array(z.string()),
  })

  const data = createPetBodySchema.parse(req.body)

  const createPetService = makeCreatePetService()

  await createPetService.execute({ ...data, organizationId: req.user.sub })

  return rep.status(201).send()
}
