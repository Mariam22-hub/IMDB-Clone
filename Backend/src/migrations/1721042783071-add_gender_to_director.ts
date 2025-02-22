import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGenderToDirector1721042783071 implements MigrationInterface {
    name = 'AddGenderToDirector1721042783071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."director_gender_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`ALTER TABLE "director" ADD "gender" "public"."director_gender_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "director" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "public"."director_gender_enum"`);
    }
}
