import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer/answer';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = this.answersRepository.create(createAnswerDto);
    return this.answersRepository.save(answer);
  }

  findAll(): Promise<Answer[]> {
    return this.answersRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}
