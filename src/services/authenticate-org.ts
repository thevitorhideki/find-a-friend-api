import { OrgsRepository } from '@/repositories/orgs-repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

interface AuthenticateOrgServiceRequest {
  email: string
  password: string
}

interface AuthenticateOrgServiceResponse {
  org: Organization
}

export class AuthenticateOrgService {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgServiceRequest): Promise<AuthenticateOrgServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.passwordHash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
