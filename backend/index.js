const { onRequest } = require('firebase-functions/v2/https');
const app = require('./app');

// Named "backend" (not "api") deliberately: Cloud Functions strips the
// function name from the request path before it reaches Express, so if this
// were named "api" it would swallow the "/api" prefix our routes are mounted
// under (app.use('/api/courses', ...) etc.) and every route would 404.
exports.backend = onRequest({ region: 'us-central1' }, app);
