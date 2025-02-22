import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedMovieLanguage1721564290028 implements MigrationInterface {
    name = 'AddedMovieLanguage1721564290028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "language" character varying(300) DEFAULT 'English'`);
        await queryRunner.query(`ALTER TABLE "movie_genre" DROP CONSTRAINT "FK_f641f620b3fe496553aa442b026"`);
        await queryRunner.query(`ALTER TABLE "genre" ADD CONSTRAINT "UQ_0285d4f1655d080cfcf7d1ab141" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "movie_genre" ADD CONSTRAINT "FK_f641f620b3fe496553aa442b026" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_genre" DROP CONSTRAINT "FK_f641f620b3fe496553aa442b026"`);
        await queryRunner.query(`ALTER TABLE "genre" DROP CONSTRAINT "UQ_0285d4f1655d080cfcf7d1ab141"`);
        await queryRunner.query(`ALTER TABLE "movie_genre" ADD CONSTRAINT "FK_f641f620b3fe496553aa442b026" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "language"`);
    }

}
