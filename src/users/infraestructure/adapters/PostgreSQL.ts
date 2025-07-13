import { Postgresql } from "../../../core/database/postgresql";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/IUser_repository";
import { UserEmail } from "../../domain/valueObjects/UserEmail_valueObject";
import { UserFirstName } from "../../domain/valueObjects/UserFirstName_valueObject";
import { UserId } from "../../domain/valueObjects/UserId_valueObject";
import { UserLastName } from "../../domain/valueObjects/UserLastName_valueObject";
import { UserPassword } from "../../domain/valueObjects/UserPassword_valueObject";
export class PostgreSQLUser implements UserRepository {

  private readonly conn = Postgresql.getInstance();

  async registerUser(user: User): Promise<void> {
    
    const sql = `
    INSERT INTO users 
    (user_id, first_name, first_surname, middle_surname, email, password_hashed, role) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    const [firstSurname, middleSurname] = user.getLastName().split(" ");

    const params = [
      user.getUserId(),
      user.getFirstName(),
      firstSurname,
      middleSurname,
      user.getEmail(),
      user.getPassword(),
      user.getUserRole()
    ]

    const result = await this.conn.query(sql, params);

    if (result.rowCount == 0) throw new Error ("An error occurred while inserting into the DB");
    
  }

  async existsByEmail(email: string): Promise<boolean> {

    const sql = `SELECT email FROM users WHERE email = $1`;
    const result = await this.conn.query(sql, [email]);

    return result.rows.length > 0;

  }

  async findUserById(userId: string): Promise<User | null> {
    
    const sql = `
      SELECT *
      FROM users
      WHERE user_id = $1
    `;

    const result = await this.conn.query(sql, [userId]);

    if (result.rows.length === 0) return null;

    const fields = result.rows[0];

    return new User(
      new UserId(fields.user_id),
      fields.role,
      new UserFirstName(fields.first_name),
      new UserLastName(`${result.rows[0].first_surname} ${result.rows[0].middle_surname}`),
      new UserEmail(fields.email),
      UserPassword.fromHashed(fields.password_hashed),
    );

  }

  async findUserByEmail(email: string): Promise<User | null> {

    const sql = `
    SELECT *
    FROM users
    WHERE email = $1
    `
    const result = await this.conn.query(sql, [email]);

    if (result.rows.length === 0) return null;

    const fields = result.rows[0];

    return new User(
      new UserId(fields.user_id),
      fields.role,
      new UserFirstName(fields.first_name),
      new UserLastName(`${result.rows[0].first_surname} ${result.rows[0].middle_surname}`),
      new UserEmail(fields.email),
      UserPassword.fromHashed(fields.password_hashed),
    )

  }

}