import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findById } from './find-by-id'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, create)

  app.get('/pets', search)
  app.get('/pets/:id', findById)
}
