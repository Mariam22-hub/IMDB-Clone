import { Controller, Get, Param } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorDto } from '../entities/Actor/dto/actor.dto';
import { UUID } from 'crypto';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get(':uuid')
  findActorByUuid(@Param('uuid') uuid: string): Promise<ActorDto> {
    return this.actorService.getActor(uuid);
  }
}
