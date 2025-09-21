const { Router } = require('express');

// If you have an auth middleware exporting `requireAuth`, uncomment the next line:
// const { requireAuth } = require('../middlewares/auth');

// If you have a User model and want to query MongoDB, uncomment the next line:
// const User = require('../models/user');

const router = Router();

// GET /api/v1/users/me - returns the current user from auth token
// If you have an auth middleware and it sets req.user, uncomment requireAuth and the detailed response.
// router.get('/me', requireAuth, async (req, res, next) => {
//   try {
//     // If you store user on req.user, return it. Or lookup by req.user.id:
//     // const user = await User.findById(req.user.id).select('-password');
//     // return res.json({ user });
//     return res.json({ user: req.user || null });
//   } catch (err) {
//     next(err);
//   }
// });

// Temporary public stub if you haven't wired auth yet
router.get('/me', (req, res) => {
  return res.json({ user: null, message: 'Implement users/me with auth' });
});

module.exports = router;