import { InvalidCredentialsError } from '@/services/errors/invalid-credentials.error'
import { makeAuthenticateOrgService } from '@/services/factories/make-authenticate-org-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const service = makeAuthenticateOrgService()

    const { org } = await service.execute({ email, password })

    const accessToken = await rep.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      }
    )

    return rep.status(200).send({ accessToken })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return rep.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
