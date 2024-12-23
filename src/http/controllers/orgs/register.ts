import { OrgAlreadyExistsError } from '@/services/errors/org-already.exists.error'
import { makeCreateOrgService } from '@/services/factories/make-create-org-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    authorName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    password: z.string().min(6),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const data = registerBodySchema.parse(req.body)

  try {
    const service = makeCreateOrgService()

    await service.execute(data)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return rep.status(409).send({
        message: err.message,
      })
    }

    throw err
  }

  return rep.status(201).send()
}
