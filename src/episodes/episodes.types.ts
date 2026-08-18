export type Episode = {
  id: string;
  name: string;
  featured: boolean;
};

export type CreateEpisodeDto = Omit<Episode, 'id'>;
