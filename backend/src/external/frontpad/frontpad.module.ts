import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { FrontpadController } from './frontpad.controller';
import { FrontpadService } from './frontpad.service';

@Module({
  imports: [HttpModule],
  controllers: [FrontpadController],
  providers: [FrontpadService],
  exports: [FrontpadService],
})
export class FrontpadModule {}
