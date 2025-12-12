import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date VARCHAR(100) NOT NULL,
        time VARCHAR(100),
        location VARCHAR(255),
        attendees VARCHAR(50),
        description TEXT,
        type VARCHAR(50) DEFAULT 'Workshop',
        status VARCHAR(20) DEFAULT 'upcoming',
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    const { rows } = await client.query('SELECT COUNT(*) FROM events');
    if (parseInt(rows[0].count) === 0) {
      await client.query(`
        INSERT INTO events (title, date, time, location, attendees, description, type, status, featured) VALUES
        ('SCPSC CODE JAM 2025', 'Jan 15-17, 2025', '48 Hours', 'SCPSC Campus', '100+', 'Our flagship coding competition. Build, innovate, and compete for exciting prizes.', 'Competition', 'upcoming', true),
        ('WEB DEV WORKSHOP: React Fundamentals', 'Jan 22, 2025', '10:00 AM - 4:00 PM', 'Tech Lab', '50', 'Learn React from scratch and build your first interactive web application.', 'Workshop', 'upcoming', false),
        ('AI/ML BOOTCAMP', 'Feb 01, 2025', 'Full Day', 'Online', '80+', 'Hands-on machine learning bootcamp covering Python, TensorFlow, and real-world projects.', 'Workshop', 'upcoming', false),
        ('GRAPHICS DESIGN MASTERCLASS', 'Feb 10, 2025', '2:00 PM - 6:00 PM', 'Design Studio', '40', 'Master Adobe Photoshop and Illustrator with industry-standard design techniques.', 'Workshop', 'upcoming', false),
        ('Video Editing Workshop', 'Dec 2024', NULL, NULL, '45', 'Learn professional video editing techniques.', 'Workshop', 'archive', false),
        ('Competitive Programming 101', 'Nov 2024', NULL, NULL, '60', 'Introduction to competitive programming.', 'Workshop', 'archive', false),
        ('Web Development Bootcamp', 'Oct 2024', NULL, NULL, '55', 'Full-stack web development bootcamp.', 'Workshop', 'archive', false),
        ('AI/ML Introduction', 'Sep 2024', NULL, NULL, '50', 'Getting started with AI and Machine Learning.', 'Workshop', 'archive', false)
      `);
    }
  } finally {
    client.release();
  }
}

export { pool };
