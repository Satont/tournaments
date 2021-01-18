import {MigrationInterface, QueryRunner} from "typeorm";

export class comments1610973136497 implements MigrationInterface {
    name = 'comments1610973136497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tournaments"
            ADD "comments" text array NOT NULL DEFAULT '{}'
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament" DROP CONSTRAINT "FK_a228e41972fa68282451b7e630f"
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament" DROP CONSTRAINT "FK_32d68da9a169f52f8bdf2c98269"
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament"
            ALTER COLUMN "teamId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "team_to_tournament"."teamId" IS NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament"
            ALTER COLUMN "tournamentId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "team_to_tournament"."tournamentId" IS NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament"
            ADD CONSTRAINT "FK_a228e41972fa68282451b7e630f" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament"
            ADD CONSTRAINT "FK_32d68da9a169f52f8bdf2c98269" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament" DROP CONSTRAINT "FK_32d68da9a169f52f8bdf2c98269"
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament" DROP CONSTRAINT "FK_a228e41972fa68282451b7e630f"
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "team_to_tournament"."tournamentId" IS NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament"
            ALTER COLUMN "tournamentId" DROP NOT NULL
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "team_to_tournament"."teamId" IS NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament"
            ALTER COLUMN "teamId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament"
            ADD CONSTRAINT "FK_32d68da9a169f52f8bdf2c98269" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "team_to_tournament"
            ADD CONSTRAINT "FK_a228e41972fa68282451b7e630f" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments" DROP COLUMN "comments"
        `);
    }

}
