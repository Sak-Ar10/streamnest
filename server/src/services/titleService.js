import { query } from '../config/db.js';
import { HttpError } from '../utils/httpError.js';

const checkProfileKids = async (profileId, userId) => {
  if (!profileId) return false;
  const res = await query(`SELECT is_kids FROM profiles WHERE id = $1 AND user_id = $2`, [profileId, userId]);
  return res.rows[0]?.is_kids || false;
};

const buildKidsFilter = (isKids) => {
  if (!isKids) return '';
  return ` AND maturity_rating IN ('G', 'PG', 'TV-Y', 'TV-G', 'TV-PG') `;
};

export const getBrowse = async (userId, profileId) => {
  const isKids = await checkProfileKids(profileId, userId);
  const kidsFilter = buildKidsFilter(isKids);

  const featuredRes = await query(`SELECT * FROM titles WHERE is_featured = true ${kidsFilter} LIMIT 1`);
  const featured = featuredRes.rows[0] || null;

  // Trending
  const trendingRes = await query(`SELECT * FROM titles WHERE 1=1 ${kidsFilter} ORDER BY rating DESC LIMIT 15`);
  const rows = [ { name: 'Trending Now', titles: trendingRes.rows } ];

  // Genres
  const genresRes = await query(`SELECT id, name FROM genres ORDER BY name ASC`);
  
  for (const genre of genresRes.rows) {
    const titlesRes = await query(`
      SELECT t.* FROM titles t
      JOIN title_genres tg ON t.id = tg.title_id
      WHERE tg.genre_id = $1 ${kidsFilter}
      LIMIT 15
    `, [genre.id]);
    
    if (titlesRes.rowCount > 0) {
      rows.push({ name: genre.name, titles: titlesRes.rows });
    }
  }

  return { featured, rows };
};

export const getTitles = async (userId, profileId, { q, genre, type }) => {
  const isKids = await checkProfileKids(profileId, userId);
  const kidsFilter = buildKidsFilter(isKids);
  
  let qry = `SELECT t.* FROM titles t `;
  let where = `WHERE 1=1 ${kidsFilter}`;
  let params = [];
  let paramIdx = 1;

  if (genre) {
    qry += ` JOIN title_genres tg ON t.id = tg.title_id `;
    where += ` AND tg.genre_id = $${paramIdx++}`;
    params.push(genre);
  }

  if (type) {
    where += ` AND t.type = $${paramIdx++}`;
    params.push(type);
  }

  if (q) {
    where += ` AND t.title ILIKE $${paramIdx++}`;
    params.push(`%${q}%`);
  }

  const finalQuery = `${qry} ${where} ORDER BY rating DESC LIMIT 50`;
  const res = await query(finalQuery, params);
  
  return res.rows;
};

export const getTitleById = async (id, userId, profileId) => {
  const isKids = await checkProfileKids(profileId, userId);
  const kidsFilter = buildKidsFilter(isKids);

  const res = await query(`SELECT * FROM titles WHERE id = $1 ${kidsFilter}`, [id]);
  if (res.rowCount === 0) {
    throw new HttpError(404, 'Title not found', 'NOT_FOUND');
  }

  const genresRes = await query(`
    SELECT g.name FROM genres g
    JOIN title_genres tg ON g.id = tg.genre_id
    WHERE tg.title_id = $1
  `, [id]);

  const title = res.rows[0];
  title.genres = genresRes.rows.map(g => g.name);

  return title;
};

export const getGenres = async () => {
  const res = await query(`SELECT id, name FROM genres ORDER BY name`);
  return res.rows;
};
