import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  Query,
} from '@nestjs/common';

import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto, UpdateEpisodeDto } from './dto/episode.dto';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'asc') {
    return this.episodesService.findAll(sort);
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateEpisodeDto) {
    return this.episodesService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateEpisodeDto) {
    return this.episodesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.episodesService.delete(id);
  }
}
