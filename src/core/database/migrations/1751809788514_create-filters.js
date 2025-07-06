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

  pgm.createTable({ name: 'filter_models' },{
    device_model_id: {
      type: 'UUID',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()')
    },
    name_device_model: {  
      type: 'VARCHAR(30)',
      notNull: true
    }
  },{ ifNotExists: true });

  pgm.createTable({ name: 'filters' }, {
    filter_id: {
      type: 'UUID',
      primaryKey: true
    },
    filter_model_id: {
      type: 'UUID',
      notNull: true,
      references: {
        schema: 'public',
        name: 'filter_models',
        columns: 'device_model_id'
      }
    },
    user_id: {
      type: 'UUID',
      references: {
        schema: 'public',
        name: 'users',
        columns: 'user_id'
      },
      onDelete: 'SET NULL'
    },
    created_by: {
      type: 'UUID',
      notNull: true,
      references: {
        schema: 'public',
        name: 'users',
        columns: 'user_id'
      },
      onDelete: 'SET NULL'
    },
    is_active: {
      type: 'BOOLEAN',
      notNull: true
    },
    created_at: {
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

  pgm.dropTable({ name: 'filter_models' }, { ifExists: true } );
  pgm.dropTable({ name: 'filters' }, { ifExists: true });

};
