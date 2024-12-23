import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(req: FastifyRequest, rep: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch {
    return rep.status(401).send({
      message: 'Unauthorized',
    })
  }
}
