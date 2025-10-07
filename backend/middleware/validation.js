const validateTask = (req, res, next) => {
  const { title, description, status } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (title.length > 100) {
    return res.status(400).json({ message: 'Title must be less than 100 characters' });
  }

  if (description && description.length > 500) {
    return res.status(400).json({ message: 'Description must be less than 500 characters' });
  }

  if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Status must be pending, in-progress, or completed' });
  }

  next();
};

const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || username.trim().length < 3) {
    return res.status(400).json({ message: 'Username must be at least 3 characters long' });
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  next();
};

module.exports = { validateTask, validateUser };