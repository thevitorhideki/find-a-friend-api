import { OrgsRepository } from '@/repositories/orgs-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already.exists.error'

interface CreateOrgServiceRequest {
  name: string
  authorName: string
  email: string
  phone: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgServiceResponse {
  org: Organization
}

export class CreateOrgService {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    name,
    authorName,
    email,
    phone,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgServiceRequest): Promise<CreateOrgServiceResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (org) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const newOrg = await this.orgsRepository.create({
      name,
      authorName,
      email,
      phone,
      passwordHash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return { org: newOrg }
  }
}
