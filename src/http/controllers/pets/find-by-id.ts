import { makeGetPetByIdService } from '@/services/factories/make-get-pet-by-id-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findById(req: FastifyRequest, rep: FastifyReply) {
  const findPetByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = findPetByIdParamsSchema.parse(req.params)

  const createPetService = makeGetPetByIdService()

  const { pet } = await createPetService.execute({ petId: id })

  return rep.status(200).send({
    pet,
  })
}
