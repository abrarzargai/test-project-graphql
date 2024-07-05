import { Injectable, Post } from '@nestjs/common';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { Organization } from './entities/organization.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';

@Injectable()
export class OrganizationsService {
  constructor(
  @InjectRepository(Organization) private readonly entity: Repository<Organization>) {}
  async create(createOrganizationInput: CreateOrganizationInput) {
    console.log("===>",createOrganizationInput)
    return this.entity.save(createOrganizationInput);
  }

  async findAll(options:FindManyOptions<Organization>):Promise<Organization[]> {
   return this.entity.find(options);
  }

  async findOne(options:FindOneOptions<Organization>):Promise<Organization>  {
     return this.entity.findOne(options); 
  }

  update(options:FindOptionsWhere<Organization>, updateOrganizationInput: UpdateOrganizationInput):Promise<UpdateResult> {
    const {id,...updateOrganization}= updateOrganizationInput
    return this.entity.update(options, updateOrganization);
  }

  remove(options:FindOptionsWhere<Organization>):Promise<UpdateResult> {
    return this.entity.softDelete(options);
  }
}
