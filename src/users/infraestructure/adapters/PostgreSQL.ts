import { Postgresql } from "../../../core/database/postgresql";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/IUserRepository";

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

}