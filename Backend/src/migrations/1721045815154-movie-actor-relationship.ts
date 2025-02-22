import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieActorRelationship1721045815154 implements MigrationInterface {
    name = 'MovieActorRelationship1721045815154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_706e4603ead757166724676efbc"`);
        await queryRunner.query(`CREATE TYPE "public"."actor_gender_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`CREATE TABLE "actor" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "first_name" character varying(300) NOT NULL, "last_name" character varying(300) NOT NULL, "birthdate" TIMESTAMP WITH TIME ZONE NOT NULL, "bio" character varying(1000) NOT NULL, "gender" "public"."actor_gender_enum" NOT NULL, "nationality" character varying(300), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "uuid" uuid NOT NULL, "picture" character varying, "number_of_awards" bigint, CONSTRAINT "UQ_05b325494fcc996a44ae6928e5e" UNIQUE ("id"), CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "festival" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "title" character varying(300) NOT NULL, "date" date NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "UQ_f1bcb856ab1c89180702ea0b47c" UNIQUE ("id"), CONSTRAINT "PK_a5f7630f57387010dee7389bc96" PRIMARY KEY ("id", "uuid"))`);
        await queryRunner.query(`CREATE TABLE "movie_actor" ("movie" integer NOT NULL, "actor" integer NOT NULL, CONSTRAINT "PK_3e9bb111c8b2170a4d24781e297" PRIMARY KEY ("movie", "actor"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a25eeba7f081bfdc9716560fc5" ON "movie_actor" ("movie") `);
        await queryRunner.query(`CREATE INDEX "IDX_1a1bae34acf322e7d38dbfe859" ON "movie_actor" ("actor") `);
        await queryRunner.query(`ALTER TABLE "movie" ADD "directorIdUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_29aecf3be13b7eb453421669f27" PRIMARY KEY ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "PK_b85b179882f31c43324ef124fea"`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "PK_8a269c0bd9db53589a117414527" PRIMARY KEY ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "UQ_b85b179882f31c43324ef124fea" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "director" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_80f02ff4b7891ba85d95d291524" FOREIGN KEY ("directorIdId", "directorIdUuid") REFERENCES "director"("id","uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_a25eeba7f081bfdc9716560fc5b" FOREIGN KEY ("movie") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movie_actor" ADD CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595" FOREIGN KEY ("actor") REFERENCES "actor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_1a1bae34acf322e7d38dbfe8595"`);
        await queryRunner.query(`ALTER TABLE "movie_actor" DROP CONSTRAINT "FK_a25eeba7f081bfdc9716560fc5b"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_80f02ff4b7891ba85d95d291524"`);
        await queryRunner.query(`ALTER TABLE "director" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "UQ_b85b179882f31c43324ef124fea"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422"`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "PK_8a269c0bd9db53589a117414527"`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "PK_29aecf3be13b7eb453421669f27"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "directorIdUuid"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1a1bae34acf322e7d38dbfe859"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a25eeba7f081bfdc9716560fc5"`);
        await queryRunner.query(`DROP TABLE "movie_actor"`);
        await queryRunner.query(`DROP TABLE "festival"`);
        await queryRunner.query(`DROP TABLE "actor"`);
        await queryRunner.query(`DROP TYPE "public"."actor_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_706e4603ead757166724676efbc" FOREIGN KEY ("directorIdId") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
