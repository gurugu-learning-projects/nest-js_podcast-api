import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindAll = jest.fn();
  const mockFindFeatured = jest.fn();
  const mockFindOne = jest.fn();
  const mockCreate = jest.fn();
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

  const mockEpisodesService = {
    findAll: mockFindAll,
    findFeatured: mockFindFeatured,
    findOne: mockFindOne,
    create: mockCreate,
    update: mockUpdate,
    delete: mockDelete,
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    const mockResult = [
      { id: 'id-1', name: 'Episode 1' },
      { id: 'id-2', name: 'Episode 2' },
    ];

    beforeEach(() => {
      mockFindAll.mockResolvedValue(mockResult);
    });

    it('should return the correct response', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(mockResult);
    });
  });

  describe('mockFindFeatured', () => {
    const mockResult = { id: 'id-2', name: 'Episode 2', featured: true };

    beforeEach(() => {
      mockFindFeatured.mockResolvedValue(mockResult);
    });

    it('should return the correct response', async () => {
      const result = await controller.findFeatured();

      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    const episodeId = 'id';

    describe('when the episode is found', () => {
      const mockResult = { id: episodeId, name: 'New episode' };

      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      });

      it('should call the findOne method with the correct parameters', async () => {
        await controller.findOne(episodeId);
        expect(mockFindOne).toHaveBeenCalledWith(episodeId);
      });

      it('should return the correct response', async () => {
        const result = await controller.findOne(episodeId);

        expect(result).toEqual(mockResult);
      });
    });

    describe('when the episode is not found', () => {
      beforeEach(() => {
        mockFindOne.mockRejectedValue(
          new NotFoundException('Episode not found'),
        );
      });

      it('should throw a NotFoundException', async () => {
        await expect(controller.findOne(episodeId)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });

  describe('create', () => {
    const mockResult = { id: 'id', name: 'New episode' };
    const mockBody = { name: 'New episode' };

    beforeEach(() => {
      mockCreate.mockResolvedValue(mockResult);
    });

    it('should call the create method with the correct parameters', async () => {
      await controller.create(mockBody);
      expect(mockCreate).toHaveBeenCalledWith(mockBody);
    });

    it('should return the correct response', async () => {
      const result = await controller.create(mockBody);
      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    const episodeId = 'id';
    const mockResult = { id: episodeId, name: 'Updated episode' };
    const mockBody = { name: 'Updated episode' };

    beforeEach(() => {
      mockUpdate.mockResolvedValue(mockResult);
    });

    it('should call the update method with the correct parameters', async () => {
      await controller.update(episodeId, mockBody);
      expect(mockUpdate).toHaveBeenCalledWith(episodeId, mockBody);
    });

    it('should return the correct response', async () => {
      const result = await controller.update(episodeId, mockBody);
      expect(result).toEqual(mockResult);
    });
  });

  describe('delete', () => {
    const episodeId = 'id';
    const mockResult = { id: episodeId, name: 'Deleted episode' };

    beforeEach(() => {
      mockDelete.mockResolvedValue(mockResult);
    });

    it('should call the delete method with the correct parameters', async () => {
      await controller.delete(episodeId);
      expect(mockDelete).toHaveBeenCalledWith(episodeId);
    });

    it('should return the correct response', async () => {
      const result = await controller.delete(episodeId);
      expect(result).toEqual(mockResult);
    });
  });
});
