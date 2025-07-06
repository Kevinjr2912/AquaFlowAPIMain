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

  pgm.createType('type_water_activity', ['Watering plants','Washing vehicles','Cleaning the home','Washing clothes','Flushing toilets']); 

  pgm.createTable({ name: 'water_activities' }, {
    water_activity_id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    water_activity_name: {
      type: 'type_water_activity',
      notNull: true,
    }
  }, { ifNotExists: true });

  pgm.createTable({ name: 'activity_parameters' }, {
    activity_parameter_id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    water_activity_id: {
      type: 'UUID',
      notNull: true,
      references: {
        schema: 'public',
        name: 'water_activities',
        columns: 'water_activity_id'
      },
    },
    parameter: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    value_range: {
      type: 'NUMRANGE',
      notNull: true,
    },
    weight: {
      type: 'DECIMAL(4,2)',
      notNull: true,
      check: 'weight >= 0 AND weight <= 1',
    },
  }, { ifNotExists: true });

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable({ name: 'activity_parameters' });
  pgm.dropTable({ name: 'water_activities' });
  pgm.dropType({ name: 'type_water_activity' });
};
