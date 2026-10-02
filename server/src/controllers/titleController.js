import * as titleService from '../services/titleService.js';

export const getBrowse = async (req, res) => {
  const profileId = req.query.profileId;
  const data = await titleService.getBrowse(req.user.id, profileId);
  res.status(200).json(data);
};

export const getTitles = async (req, res) => {
  const profileId = req.query.profileId;
  const { q, genre, type } = req.query;
  const titles = await titleService.getTitles(req.user.id, profileId, { q, genre, type });
  res.status(200).json({ titles });
};

export const getTitleById = async (req, res) => {
  const profileId = req.query.profileId;
  const title = await titleService.getTitleById(req.params.id, req.user.id, profileId);
  res.status(200).json({ title });
};

export const getGenres = async (req, res) => {
  const genres = await titleService.getGenres();
  res.status(200).json({ genres });
};
