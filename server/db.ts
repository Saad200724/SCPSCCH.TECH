import pg from 'pg';

interface DbQueryResponse<T = any> {
  rows: T[];
  rowCount: number;
}

const memoryStore = {
  events: [
    {
      id: 1,
      title: 'AI ART COMPETITION 2026',
      date: 'January 30, 2026',
      time: '10:00 AM - 06:00 PM',
      location: 'Online',
      attendees: '150+',
      description: 'Unleash your creativity with AI! Join our first AI-driven art competition and win exciting prizes.',
      type: 'Competition',
      status: 'upcoming',
      featured: true,
      image: '/ai-art-competition.png',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'PORTFOLIATHON INTRA 1.0',
      date: 'Dec 21-24, 2025',
      time: '72 Hours',
      location: 'Devpost / SCPSC',
      attendees: '100+',
      description: 'The biggest intra-school portfolio building hackathon. Build, innovate, and compete for exciting prizes.',
      type: 'Competition',
      status: 'archive',
      featured: false,
      image: '/portfoliathon-og.jpg',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'WEB DEV WORKSHOP: React Fundamentals',
      date: 'Jan 22, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Tech Lab',
      attendees: '50',
      description: 'Learn React from scratch and build your first interactive web application.',
      type: 'Workshop',
      status: 'upcoming',
      featured: false,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: 'AI/ML BOOTCAMP',
      date: 'Feb 01, 2025',
      time: 'Full Day',
      location: 'Online',
      attendees: '80+',
      description: 'Hands-on machine learning bootcamp covering Python, TensorFlow, and real-world projects.',
      type: 'Workshop',
      status: 'upcoming',
      featured: false,
      created_at: new Date().toISOString()
    }
  ] as any[],
  projects: [
    {
      id: 1,
      title: 'SCPSC Portal',
      description: 'Official college portal built by Cyber Hub members featuring student management, event registration, and resource sharing.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
      stars: 45,
      forks: 12,
      featured: true,
      category: 'Web Dev',
      github_url: 'https://github.com/SCPSC-Cyber-Hub',
      demo_url: 'https://scpscch.tech',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'CodeArena',
      description: 'Competitive programming practice platform with problems curated by our CP team, featuring real-time contests.',
      tech: ['Next.js', 'Python', 'PostgreSQL', 'Docker'],
      stars: 38,
      forks: 8,
      featured: true,
      category: 'CP',
      github_url: 'https://github.com/SCPSC-Cyber-Hub',
      demo_url: null,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'SmartAttendance',
      description: 'AI-powered attendance system using facial recognition for seamless classroom attendance tracking.',
      tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
      stars: 32,
      forks: 10,
      featured: false,
      category: 'AI/ML',
      github_url: 'https://github.com/SCPSC-Cyber-Hub',
      demo_url: null,
      created_at: new Date().toISOString()
    }
  ] as any[],
  applications: [] as any[]
};

let pgPool: pg.Pool | null = null;
let useMemoryStore = false;

if (process.env.DATABASE_URL) {
  try {
    pgPool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      connectionTimeoutMillis: 5000,
    });
  } catch (err) {
    console.warn('[DB] PostgreSQL pool initialization failed, using in-memory store:', err);
    useMemoryStore = true;
  }
} else {
  useMemoryStore = true;
}

export const pool = {
  async query(text: string, params: any[] = []): Promise<DbQueryResponse> {
    if (!useMemoryStore && pgPool) {
      try {
        const res = await pgPool.query(text, params);
        return { rows: res.rows, rowCount: res.rowCount ?? res.rows.length };
      } catch (error) {
        console.warn('[DB] Postgres query failed, falling back to memory store:', error);
      }
    }

    // Memory Store Queries
    const upper = text.toUpperCase();

    // EVENTS
    if (upper.includes('FROM EVENTS')) {
      if (upper.includes('WHERE ID =')) {
        const id = Number(params[0]);
        const item = memoryStore.events.find(e => e.id === id);
        return { rows: item ? [item] : [], rowCount: item ? 1 : 0 };
      }
      return { rows: [...memoryStore.events].reverse(), rowCount: memoryStore.events.length };
    }

    if (upper.startsWith('INSERT INTO EVENTS')) {
      const [title, date, time, location, attendees, description, type, status, featured] = params;
      const newEvent = {
        id: memoryStore.events.length + 1,
        title,
        date,
        time,
        location,
        attendees,
        description,
        type: type || 'Workshop',
        status: status || 'upcoming',
        featured: featured || false,
        created_at: new Date().toISOString()
      };
      memoryStore.events.push(newEvent);
      return { rows: [newEvent], rowCount: 1 };
    }

    if (upper.startsWith('UPDATE EVENTS')) {
      const [title, date, time, location, attendees, description, type, status, featured, id] = params;
      const index = memoryStore.events.findIndex(e => e.id === Number(id));
      if (index !== -1) {
        memoryStore.events[index] = {
          ...memoryStore.events[index],
          title, date, time, location, attendees, description, type, status, featured
        };
        return { rows: [memoryStore.events[index]], rowCount: 1 };
      }
      return { rows: [], rowCount: 0 };
    }

    if (upper.startsWith('DELETE FROM EVENTS')) {
      const id = Number(params[0]);
      const initialLength = memoryStore.events.length;
      memoryStore.events = memoryStore.events.filter(e => e.id !== id);
      const rowCount = initialLength - memoryStore.events.length;
      return { rows: [], rowCount };
    }

    // PROJECTS
    if (upper.includes('FROM PROJECTS')) {
      if (upper.includes('WHERE ID =')) {
        const id = Number(params[0]);
        const item = memoryStore.projects.find(p => p.id === id);
        return { rows: item ? [item] : [], rowCount: item ? 1 : 0 };
      }
      return { rows: [...memoryStore.projects].reverse(), rowCount: memoryStore.projects.length };
    }

    if (upper.startsWith('INSERT INTO PROJECTS')) {
      const [title, description, tech, stars, forks, featured, category, github_url, demo_url] = params;
      const newProject = {
        id: memoryStore.projects.length + 1,
        title,
        description,
        tech: Array.isArray(tech) ? tech : [],
        stars: stars || 0,
        forks: forks || 0,
        featured: featured || false,
        category: category || 'Web Dev',
        github_url,
        demo_url,
        created_at: new Date().toISOString()
      };
      memoryStore.projects.push(newProject);
      return { rows: [newProject], rowCount: 1 };
    }

    if (upper.startsWith('UPDATE PROJECTS')) {
      const [title, description, tech, stars, forks, featured, category, github_url, demo_url, id] = params;
      const index = memoryStore.projects.findIndex(p => p.id === Number(id));
      if (index !== -1) {
        memoryStore.projects[index] = {
          ...memoryStore.projects[index],
          title, description, tech: Array.isArray(tech) ? tech : [], stars, forks, featured, category, github_url, demo_url
        };
        return { rows: [memoryStore.projects[index]], rowCount: 1 };
      }
      return { rows: [], rowCount: 0 };
    }

    if (upper.startsWith('DELETE FROM PROJECTS')) {
      const id = Number(params[0]);
      const initialLength = memoryStore.projects.length;
      memoryStore.projects = memoryStore.projects.filter(p => p.id !== id);
      return { rows: [], rowCount: initialLength - memoryStore.projects.length };
    }

    // APPLICATIONS
    if (upper.includes('FROM APPLICATIONS')) {
      return { rows: [...memoryStore.applications].reverse(), rowCount: memoryStore.applications.length };
    }

    if (upper.startsWith('INSERT INTO APPLICATIONS')) {
      const [name, email, track, experience, motivation] = params;
      const newApp = {
        id: memoryStore.applications.length + 1,
        name,
        email,
        track,
        experience,
        motivation,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      memoryStore.applications.push(newApp);
      return { rows: [newApp], rowCount: 1 };
    }

    if (upper.startsWith('UPDATE APPLICATIONS')) {
      const [status, id] = params;
      const index = memoryStore.applications.findIndex(a => a.id === Number(id));
      if (index !== -1) {
        memoryStore.applications[index].status = status;
        return { rows: [memoryStore.applications[index]], rowCount: 1 };
      }
      return { rows: [], rowCount: 0 };
    }

    if (upper.startsWith('DELETE FROM APPLICATIONS')) {
      const id = Number(params[0]);
      const initialLength = memoryStore.applications.length;
      memoryStore.applications = memoryStore.applications.filter(a => a.id !== id);
      return { rows: [], rowCount: initialLength - memoryStore.applications.length };
    }

    return { rows: [], rowCount: 0 };
  }
};

export async function initializeDatabase() {
  if (!pgPool || useMemoryStore) {
    return;
  }

  try {
    const client = await pgPool.connect();
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

      await client.query(`
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          tech TEXT[],
          stars INTEGER DEFAULT 0,
          forks INTEGER DEFAULT 0,
          featured BOOLEAN DEFAULT false,
          category VARCHAR(50) DEFAULT 'Web Dev',
          github_url VARCHAR(500),
          demo_url VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      
      await client.query(`
        CREATE TABLE IF NOT EXISTS applications (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          track VARCHAR(100),
          experience VARCHAR(50),
          motivation TEXT,
          status VARCHAR(20) DEFAULT 'pending',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const { rows } = await client.query('SELECT COUNT(*) FROM events');
      if (parseInt(rows[0].count) === 0) {
        await client.query(`
          INSERT INTO events (title, date, time, location, attendees, description, type, status, featured) VALUES
          ('AI ART COMPETITION 2026', 'January 30, 2026', '10:00 AM - 06:00 PM', 'Online', '150+', 'Unleash your creativity with AI! Join our first AI-driven art competition and win exciting prizes.', 'Competition', 'upcoming', true),
          ('PORTFOLIATHON INTRA 1.0', 'Dec 21-24, 2025', '72 Hours', 'Devpost', '100+', 'Our flagship portfolio competition. Build, innovate, and compete for exciting prizes.', 'Competition', 'archive', false),
          ('WEB DEV WORKSHOP: React Fundamentals', 'Jan 22, 2025', '10:00 AM - 4:00 PM', 'Tech Lab', '50', 'Learn React from scratch and build your first interactive web application.', 'Workshop', 'upcoming', false),
          ('AI/ML BOOTCAMP', 'Feb 01, 2025', 'Full Day', 'Online', '80+', 'Hands-on machine learning bootcamp covering Python, TensorFlow, and real-world projects.', 'Workshop', 'upcoming', false)
        `);
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('[DB] PostgreSQL init skipped or failed, using memory store fallback:', err);
    useMemoryStore = true;
  }
}

