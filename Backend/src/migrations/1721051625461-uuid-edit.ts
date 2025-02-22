import { MigrationInterface, QueryRunner } from "typeorm";

export class UuidEdit1721051625461 implements MigrationInterface {
    name = 'UuidEdit1721051625461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_80f02ff4b7891ba85d95d291524"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorIdId"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorIdUuid"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorId" integer`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "UQ_b85b179882f31c43324ef124fea"`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "PK_8a269c0bd9db53589a117414527"`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "director" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "UQ_05b325494fcc996a44ae6928e5e"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_a25eeba7f081bfdc9716560fc5b"`);
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_0b3efe28ec84c7569869e938f30"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_29aecf3be13b7eb453421669f27"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_5d2b9288d5e500022806d0e0352"`);
        await queryRunner.query(`ALTER TABLE "festival" DROP CONSTRAINT "UQ_f1bcb856ab1c89180702ea0b47c"`);
        await queryRunner.query(`ALTER TABLE "festival" DROP CONSTRAINT "PK_a5f7630f57387010dee7389bc96"`);
        await queryRunner.query(`ALTER TABLE "festival" ADD CONSTRAINT "PK_f1bcb856ab1c89180702ea0b47c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "festival" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "UQ_8a269c0bd9db53589a117414527" UNIQUE ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "UQ_c9a30ff2bf47bdda454eb8bad4f" UNIQUE ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_29aecf3be13b7eb453421669f27" UNIQUE ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "festival" ADD CONSTRAINT "UQ_a5f7630f57387010dee7389bc96" UNIQUE ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb" FOREIGN KEY ("directorId") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_a25eeba7f081bfdc9716560fc5b" FOREIGN KEY ("movie") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595" FOREIGN KEY ("actor") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_0b3efe28ec84c7569869e938f30" FOREIGN KEY ("movie") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_5d2b9288d5e500022806d0e0352" FOREIGN KEY ("festival") REFERENCES "festival"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_5d2b9288d5e500022806d0e0352"`);
        await queryRunner.query(`ALTER TABLE "movie_festival" DROP CONSTRAINT "FK_0b3efe28ec84c7569869e938f30"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_a25eeba7f081bfdc9716560fc5b"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb"`);
        await queryRunner.query(`ALTER TABLE "festival" DROP CONSTRAINT "UQ_a5f7630f57387010dee7389bc96"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_29aecf3be13b7eb453421669f27"`);
        await queryRunner.query(`ALTER TABLE "actor" DROP CONSTRAINT "UQ_c9a30ff2bf47bdda454eb8bad4f"`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "UQ_8a269c0bd9db53589a117414527"`);
        await queryRunner.query(`ALTER TABLE "festival" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "festival" DROP CONSTRAINT "PK_f1bcb856ab1c89180702ea0b47c"`);
        await queryRunner.query(`ALTER TABLE "festival" ADD CONSTRAINT "PK_a5f7630f57387010dee7389bc96" PRIMARY KEY ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "festival" ADD CONSTRAINT "UQ_f1bcb856ab1c89180702ea0b47c" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_5d2b9288d5e500022806d0e0352" FOREIGN KEY ("festival") REFERENCES "festival"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_29aecf3be13b7eb453421669f27" PRIMARY KEY ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "movie_festival" ADD CONSTRAINT "FK_0b3efe28ec84c7569869e938f30" FOREIGN KEY ("movie") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_a25eeba7f081bfdc9716560fc5b" FOREIGN KEY ("movie") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "actor" ADD CONSTRAINT "UQ_05b325494fcc996a44ae6928e5e" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595" FOREIGN KEY ("actor") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "director" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "PK_b85b179882f31c43324ef124fea"`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "PK_8a269c0bd9db53589a117414527" PRIMARY KEY ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "UQ_b85b179882f31c43324ef124fea" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorId"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorIdUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorIdId" integer`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_80f02ff4b7891ba85d95d291524" FOREIGN KEY ("directorIdId", "directorIdUuid") REFERENCES "director"("id","uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
