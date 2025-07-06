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

  pgm.createType({ name: 'type_layer' }, ['Natural zeolites','Far Infrared Ball','Silicon sand','Mineral sand','Activated carbon']);

  pgm.createTable({ name: 'types_filter_layers' }, {
    type_filter_layer_id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    layer_type_name: {
      type: 'type_layer',
      notNull: true
    },
    approximate_useful_life: {
      type: 'SMALLINT',
      notNull: true
    }
  }, { ifNotExists: true });

  pgm.createTable({ name: 'filter_layers' }, {
    filter_layer_id: {
      type: 'UUID',
      primaryKey: true
    },
    type_filter_layer_id: {
      type: 'UUID',
      notNull: true,
      references: {
        schema: 'public',
        name: 'types_filter_layers',
        columns: 'type_filter_layer_id'
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
    },
    efficiency: {
      type: 'DECIMAL(4,2)',
      notNull: true,
      check: 'efficiency >= 0 AND efficiency <= 100'
    }

  }, { ifNotExists: true });

  pgm.createTable({ name: 'estimated_layer_states' }, {
    state_id: {
      type: 'UUID',
      primaryKey: true
    },
    filter_layer_id: {
      type: 'UUID',
      notNull: true,
      references: {
        schema: 'public',
        name: 'filter_layers',
        columns: 'filter_layer_id'
      }
    },
    estimate_date: {
      type: 'DATE',
      notNull: true
    },
    efficiency: {
      type: 'DECIMAL(4,2)',
      notNull: true,
      check: 'efficiency >= 0 AND efficiency <= 100'
    },
    estimated_days_remaining: {
      type: 'SMALLINT',
      notNull: true,
      check: 'estimated_days_remaining >= 0'
    }
  }, { ifNotExists: true });

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable({ name: 'types_filter_layers' }, { ifExists: true });
  pgm.dropTable({ name: 'filter_layers' }, { ifExists: true });
  pgm.dropTable({ name: 'estimated_layer_states' }, { ifExists: true });
};
