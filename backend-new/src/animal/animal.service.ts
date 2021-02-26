import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalEntity } from 'src/entities/animal.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class AnimalService {
  private readonly logger = new Logger(AnimalService.name);
  constructor(
    @InjectRepository(AnimalEntity)
    private repo: Repository<AnimalEntity>,
  ) {}
}
