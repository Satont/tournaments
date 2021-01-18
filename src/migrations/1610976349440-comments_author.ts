import {MigrationInterface, QueryRunner} from "typeorm";

export class commentsAuthor1610976349440 implements MigrationInterface {
    name = 'commentsAuthor1610976349440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "teams"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "teams"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users_stats_br"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users_stats_br"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users_stats_mp"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "users_stats_mp"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users_stats_mp" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_stats_mp" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_stats_br" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_stats_br" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "teams" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "teams" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments" DROP COLUMN "createdAt"
        `);
    }

}
