import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ManejorErroresService {
  setError(error) {
    if (error.code === 11000)
      throw new BadRequestException('Ojo que tienes un error colega');
    if (error.code === 1234) throw new BadRequestException('Ojo otro error');
  }
}
