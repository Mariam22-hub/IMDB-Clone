import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedMovieDuration1721565283066 implements MigrationInterface {
    name = 'AddedMovieDuration1721565283066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "duration" character varying(300) DEFAULT '1h 32m'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "duration"`);
    }

}
