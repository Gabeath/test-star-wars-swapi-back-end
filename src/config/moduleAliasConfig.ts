import path from 'path';

export default {
  '~': path.join(__dirname, '..'),
  '@app': path.join(__dirname, '..', 'app', 'src'),
  // '@db': path.join(__dirname, '..', 'core', 'db'),
  '@middlewares': path.join(__dirname, '..', 'core', 'middlewares'),
  '@utilities': path.join(__dirname, '..', 'core', 'utilities'),
};
