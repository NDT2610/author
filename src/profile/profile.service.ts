import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { Profile } from 'src/entities/Profile';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  async getAllProfiles(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async createProfile(createProfileDto: CreateProfileDto, email: string, id: number): Promise<Profile> {
    const newProfile = this.profileRepository.create({...createProfileDto, email:email, userId: id});
    return this.profileRepository.save(newProfile);
  }

  async updateProfile(id: number,updateProfileDto: Partial<CreateProfileDto>): Promise<Profile>{
    await this.profileRepository.update({id: id},updateProfileDto);
    return this.profileRepository.findOneBy({id: id});
  }

  async deleteProfile(id: number): Promise<void>{
    await this.profileRepository.delete(id);
  }

  async getProfileById(id: number): Promise<Profile>{
    return this.profileRepository.findOneBy({id: id});
  }

  async getProfileByUser(): Promise<Profile>{
    const profiles = await this.profileRepository
    .createQueryBuilder("profile")
    .leftJoinAndSelect("profile.user", "user")
    .getRawOne();
    return(profiles)
  }
  
}
