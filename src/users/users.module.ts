import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UsersService, UserRepository, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
