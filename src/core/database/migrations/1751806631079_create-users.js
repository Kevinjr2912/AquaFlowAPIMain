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

  pgm.createType({ name: 'user_role' }, ['Regular user', 'Administrator']);

  pgm.createTable({ name: 'users' }, {
    user_id: {
      type: 'uuid',
      primaryKey: true,
      notNull: true,
    },
    first_name: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
    first_surname: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
    middle_surname: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
    email: {
      type: 'VARCHAR(100)',
      notNull: true,
      unique: true,
    },
    password_hashed: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    role: {
      type: 'user_role',
      notNull: true,
    },
  },{
    ifNotExists: true
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable({ name: 'users' });
  pgm.dropType({ name: 'user_role' });
};