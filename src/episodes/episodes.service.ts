import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

import type { Episode, CreateEpisodeDto } from './episodes.types';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  findAll(sort: 'asc' | 'desc' = 'asc') {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name > b.name ? -1 : 1);

    return sort === 'asc'
      ? this.episodes.sort(sortAsc)
      : this.episodes.sort(sortDesc);
  }

  findFeatured() {
    return this.episodes.find((episode) => episode.featured);
  }

  findOne(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    const newEpisode = { id: randomUUID(), ...createEpisodeDto };

    this.episodes.push(newEpisode);

    return newEpisode;
  }
}
