const { Router } = require('express');

const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const healthRoutes = require('./health.routes');
const simulateRoutes = require('./simulate.routes');
const simulateVariantRoutes = require('./simulatevariant.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/health', healthRoutes);
router.use('/simulate', simulateRoutes);
router.use('/simulate-variant', simulateVariantRoutes);

module.exports = router;