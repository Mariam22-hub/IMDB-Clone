import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedGeneratedToUuid1721559417518 implements MigrationInterface {
    name = 'AddedGeneratedToUuid1721559417518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "UQ_8a269c0bd9db53589a117414527"`);
        await queryRunner.query(`ALTER TABLE "director" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_29aecf3be13b7eb453421669f27"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "UQ_8a269c0bd9db53589a117414527" UNIQUE ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_29aecf3be13b7eb453421669f27" UNIQUE ("id", "uuid")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "UQ_29aecf3be13b7eb453421669f27"`);
        await queryRunner.query(`ALTER TABLE "director" DROP CONSTRAINT "UQ_8a269c0bd9db53589a117414527"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "UQ_29aecf3be13b7eb453421669f27" UNIQUE ("id", "uuid")`);
        await queryRunner.query(`ALTER TABLE "director" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "director" ADD CONSTRAINT "UQ_8a269c0bd9db53589a117414527" UNIQUE ("id", "uuid")`);
    }

}
