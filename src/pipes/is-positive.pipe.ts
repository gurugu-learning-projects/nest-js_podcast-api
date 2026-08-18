import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class isPositivePipe implements PipeTransform {
  transform(value: number) {
    if (value <= 0) {
      throw new BadRequestException('The value must be a positive number');
    }

    return value;
  }
}
