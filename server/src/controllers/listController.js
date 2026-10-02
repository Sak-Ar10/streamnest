import * as listService from '../services/listService.js';

export const getList = async (req, res) => {
  const { profileId } = req.params;
  const list = await listService.getList(req.user.id, profileId);
  res.status(200).json({ list });
};

export const addToList = async (req, res) => {
  const { profileId } = req.params;
  const { titleId } = req.body;
  await listService.addToList(req.user.id, profileId, titleId);
  res.status(200).json({ message: 'Added to list' });
};

export const removeFromList = async (req, res) => {
  const { profileId, titleId } = req.params;
  await listService.removeFromList(req.user.id, profileId, titleId);
  res.status(200).json({ message: 'Removed from list' });
};
