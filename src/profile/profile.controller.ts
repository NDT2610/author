import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from 'src/dto/create-profile.dto';
import { Profile } from 'src/entities/Profile';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getAllProfile() {
    return await this.profileService.getAllProfiles();
  }
  
  @Post()
  async createProfile(@Body() createProfileDto: CreateProfileDto, @Req() request) {
    const { user } = request;
    return await this.profileService.createProfile(createProfileDto, user.email, user.id);
  }

  @Get('get/:id')
  async getProfileById(@Param('id') id: number): Promise<Profile>{
    return await this.profileService.getProfileById(id);
  }

  @Put(':id')
  async updateProfile(@Param('id') id: number, @Body() updateProfileDto: Partial<CreateProfileDto>): Promise<Profile>{
    return await this.profileService.updateProfile(id, updateProfileDto);
  }

  @Delete('id')
  async deleteProfile(@Param('id') id: number): Promise<void>{
    await this.profileService.deleteProfile(id);
  }

  @Get('/get')
  async getProfileByUser(): Promise<Profile>{
    return this.profileService.getProfileByUser();
  }
}
