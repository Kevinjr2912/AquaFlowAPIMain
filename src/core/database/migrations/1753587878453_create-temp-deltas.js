/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('temp_deltas', {
    temp_delta_id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    sensor_reading_id: {
      type: 'UUID',
      notNull: true,
      references: {
        schema: 'public',
        name: 'sensors_readings',
        columns: 'sensor_reading_id'
      }
    },
    temp_delta: {
      type: 'DECIMAL(5,3)',
      notNull: true,
    },
  }, {
    ifNotExists: true,
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('temp_deltas');
};
