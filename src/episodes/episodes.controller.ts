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

const episodes = [
  {
    id: 1,
    title: 'Episode 1',
    description: 'Description 1',
  },
  {
    id: 2,
    title: 'Episode 2',
    description: 'Description 2',
  },
  {
    id: 3,
    title: 'Episode 3',
    description: 'Description 3',
  },
];

@Controller('episodes')
export class EpisodesController {
  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'asc') {
    return episodes.sort((a, b) => {
      if (sort === 'asc') {
        return a.id - b.id;
      }
      return b.id - a.id;
    });
  }

  @Get('featured')
  findFeatured() {
    return {
      id: 1,
      title: 'Episode 1',
      description: 'Description 1',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Episode ${id}`;
  }

  @Post()
  create(@Body() body: { title: string; description: string }) {
    return {
      id: Date.now(),
      title: body.title,
      description: body.description,
    };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string },
  ) {
    const idx = episodes.findIndex((ep) => String(ep.id) === id);

    episodes[idx] = { ...episodes[idx], ...body };

    return episodes.at(idx);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const idx = episodes.findIndex((ep) => String(ep.id) === id);
    return episodes.splice(idx, 1);
  }
}
