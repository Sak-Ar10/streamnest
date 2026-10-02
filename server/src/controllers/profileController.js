import * as profileService from '../services/profileService.js';

export const getProfiles = async (req, res) => {
  const profiles = await profileService.getProfilesByUser(req.user.id);
  res.status(200).json({ profiles });
};

export const createProfile = async (req, res) => {
  const profile = await profileService.createProfile(req.user.id, req.body);
  res.status(201).json({ profile });
};

export const updateProfile = async (req, res) => {
  const profile = await profileService.updateProfile(req.user.id, req.params.id, req.body);
  res.status(200).json({ profile });
};

export const deleteProfile = async (req, res) => {
  await profileService.deleteProfile(req.user.id, req.params.id);
  res.status(200).json({ message: 'Profile deleted' });
};
