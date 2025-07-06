/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {

  pgm.createIndex('filters','created_at', { name: 'filters_created_at_idx' })
  pgm.createIndex('filters', 'is_active', { name: 'filters_is_active_idx' });
  pgm.createIndex('filter_models', 'name_device_model', { name: 'filters_filter_model_idx' });

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {

  pgm.dropIndex('filters', 'created_at', {
    name: 'filters_created_at_idx',
  });

  pgm.dropIndex('filters', 'is_active', {
    name: 'filters_is_active_idx',
  });

  pgm.dropIndex('filter_models', 'name_device_model', {
    name: 'filters_filter_model_idx',
  });


};
