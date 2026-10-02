import { query } from '../config/db.js';
import { HttpError } from '../utils/httpError.js';

const verifyProfileOwnership = async (userId, profileId) => {
  const check = await query(`SELECT id FROM profiles WHERE id = $1 AND user_id = $2`, [profileId, userId]);
  if (check.rowCount === 0) {
    throw new HttpError(404, 'Profile not found or access denied', 'NOT_FOUND');
  }
};

export const getList = async (userId, profileId) => {
  await verifyProfileOwnership(userId, profileId);
  
  const res = await query(`
    SELECT t.* FROM titles t
    JOIN my_list ml ON t.id = ml.title_id
    WHERE ml.profile_id = $1
    ORDER BY ml.added_at DESC
  `, [profileId]);
  
  return res.rows;
};

export const addToList = async (userId, profileId, titleId) => {
  await verifyProfileOwnership(userId, profileId);
  
  // Idempotent add
  await query(`
    INSERT INTO my_list (profile_id, title_id) VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `, [profileId, titleId]);
  
  return { success: true };
};

export const removeFromList = async (userId, profileId, titleId) => {
  await verifyProfileOwnership(userId, profileId);
  
  await query(`
    DELETE FROM my_list WHERE profile_id = $1 AND title_id = $2
  `, [profileId, titleId]);
  
  return { success: true };
};
