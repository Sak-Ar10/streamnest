import { query } from '../config/db.js';
import { HttpError } from '../utils/httpError.js';

export const getProfilesByUser = async (userId) => {
  const res = await query(
    `SELECT id, name, avatar, is_kids, created_at FROM profiles WHERE user_id = $1 ORDER BY created_at ASC`,
    [userId]
  );
  return res.rows;
};

export const createProfile = async (userId, data) => {
  // Check max limit
  const countRes = await query(`SELECT COUNT(*) FROM profiles WHERE user_id = $1`, [userId]);
  if (parseInt(countRes.rows[0].count, 10) >= 5) {
    throw new HttpError(400, 'Maximum of 5 profiles reached.', 'LIMIT_REACHED');
  }

  const res = await query(
    `INSERT INTO profiles (user_id, name, avatar, is_kids) VALUES ($1, $2, $3, $4) RETURNING id, name, avatar, is_kids`,
    [userId, data.name, data.avatar, data.is_kids]
  );
  return res.rows[0];
};

export const updateProfile = async (userId, profileId, data) => {
  // Check ownership
  const check = await query(`SELECT id FROM profiles WHERE id = $1 AND user_id = $2`, [profileId, userId]);
  if (check.rowCount === 0) {
    throw new HttpError(404, 'Profile not found or access denied.', 'NOT_FOUND');
  }

  const updates = [];
  const values = [];
  let paramIdx = 1;

  if (data.name !== undefined) {
    updates.push(`name = $${paramIdx++}`);
    values.push(data.name);
  }
  if (data.avatar !== undefined) {
    updates.push(`avatar = $${paramIdx++}`);
    values.push(data.avatar);
  }
  if (data.is_kids !== undefined) {
    updates.push(`is_kids = $${paramIdx++}`);
    values.push(data.is_kids);
  }

  if (updates.length === 0) return check.rows[0]; // nothing to update

  values.push(profileId, userId);
  const res = await query(
    `UPDATE profiles SET ${updates.join(', ')} WHERE id = $${paramIdx} AND user_id = $${paramIdx + 1} RETURNING id, name, avatar, is_kids`,
    values
  );

  return res.rows[0];
};

export const deleteProfile = async (userId, profileId) => {
  // Check ownership and ensure it's not the last one
  const allProfiles = await query(`SELECT id FROM profiles WHERE user_id = $1`, [userId]);
  
  const target = allProfiles.rows.find(p => p.id === profileId);
  if (!target) {
    throw new HttpError(404, 'Profile not found or access denied.', 'NOT_FOUND');
  }
  
  if (allProfiles.rowCount <= 1) {
    throw new HttpError(400, 'Cannot delete the last profile.', 'BAD_REQUEST');
  }

  await query(`DELETE FROM profiles WHERE id = $1 AND user_id = $2`, [profileId, userId]);
  return { success: true };
};
