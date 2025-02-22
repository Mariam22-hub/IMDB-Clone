import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieFestivalRelationship1721046005067 implements MigrationInterface {
    name = 'MovieFestivalRelationship1721046005067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie_festival" ("movie" integer NOT NULL, "festival" integer NOT NULL, CONSTRAINT "PK_92088ad6af4c3f8e3c652032c35" PRIMARY KEY ("movie", "festival"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0b3efe28ec84c7569869e938f3" ON "movie_festival" ("movie") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d2b9288d5e500022806d0e035" ON "movie_festival" ("festival") `);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595"`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "UQ_05b325494fcc996a44ae6928e5e" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595" FOREIGN KEY ("actor") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_0b3efe28ec84c7569869e938f30" FOREIGN KEY ("movie") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_5d2b9288d5e500022806d0e0352" FOREIGN KEY ("festival") REFERENCES "festival"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_5d2b9288d5e500022806d0e0352"`);
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_0b3efe28ec84c7569869e938f30"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "UQ_05b325494fcc996a44ae6928e5e"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595" FOREIGN KEY ("actor") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d2b9288d5e500022806d0e035"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0b3efe28ec84c7569869e938f3"`);
        await queryRunner.query(`DROP TABLE "movie_festival"`);
    }

}
