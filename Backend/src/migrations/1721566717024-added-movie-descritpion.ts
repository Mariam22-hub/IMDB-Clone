import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedMovieDescritpion1721566717024 implements MigrationInterface {
    name = 'AddedMovieDescritpion1721566717024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "description" character varying(5000) DEFAULT 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "description"`);
    }

}
