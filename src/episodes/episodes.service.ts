import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import type { CreateEpisodeDto, UpdateEpisodeDto } from './dto/episode.dto';
import { Episode } from './entity/episode.entity';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  findAll(sort: 'asc' | 'desc' = 'asc', limit: number) {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name > b.name ? -1 : 1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc).slice(0, limit)
      : this.episodes.sort(sortDesc).slice(0, limit);
  }

  findFeatured() {
    return this.episodes.find((episode) => episode.featured);
  }

  findOne(id: string) {
    const episode = this.episodes.find((episode) => episode.id === id);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    return episode;
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { id: randomUUID(), ...createEpisodeDto };

    this.episodes.push(newEpisode);

    return newEpisode;
  }

  update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    const idx = this.episodes.findIndex((episode) => episode.id === id);
    if (idx === -1) {
      throw new NotFoundException('Episode not found');
    }

    Object.assign(this.episodes[idx], updateEpisodeDto);

    return this.episodes[idx];
  }

  delete(id: string) {
    const episode = this.episodes.find((episode) => episode.id === id);
    if (!episode) {
      throw new NotFoundException('Episode not found');
    }

    this.episodes = this.episodes.filter((episode) => episode.id !== id);
  }
}
