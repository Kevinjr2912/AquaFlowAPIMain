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
  pgm.createTable({ name: 'sensors_models' }, {
    sensor_model_id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    name_sensor: {
      type: 'VARCHAR(15)',
      notNull: true
    },
    name_model: {
      type: 'VARCHAR(20)',
      notNull: true
    },
    unit_measurement: {
      type: 'VARCHAR(10)',
      notNull: true
    }

  }, { ifNotExists: true });

  pgm.createTable({ name: 'sensors' }, {
    sensor_id: {
      type: 'UUID',
      primaryKey: true
    },
    sensor_model_id: {
      type: 'UUID',
      notNull: true,
      references: {
        schema: 'public',
        name: 'sensors_models',
        columns: 'sensor_model_id'
      }
    },
    filter_id: {
      type: 'UUID',
      notNull: true,
      references: {
        schema: 'public',
        name: 'filters',
        columns: 'filter_id'
      }
    }
  }, { ifNotExists: true });

  pgm.createTable({ name: 'sensors_readings' }, {
    sensor_reading_id: {
      type: 'UUID',
      primaryKey: true
    },
    sensor_id: {
      type: 'UUID',
      notNull: true,
      references: {
        schema: 'public',
        name: 'sensors',
        columns: 'sensor_id'
      }
    },
    value: {
      type: 'DECIMAL(5,2)',
      notNull: true
    },
    recorded_at: {
      type: 'TIMESTAMP',
      notNull: true
    }
  }, { ifNotExists: true });

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => { 

  pgm.dropTable({ name: 'sensors_models' }, { ifExists: true });
  pgm.dropTable({ name: 'sensors' }, { ifExists: true });
  pgm.dropTable({ name: 'sensors_readings' }, { ifExists: true });

};
