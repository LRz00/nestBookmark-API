import { Global, Module } from '@nestjs/common';
import { PrismadbService } from './prismadb.service';

@Global()
@Module({
  providers: [PrismadbService],
  exports: [PrismadbService]
})
export class PrismadbModule {}
