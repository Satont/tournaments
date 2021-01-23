import {MigrationInterface, QueryRunner} from "typeorm";

export class commentsAuthor1610975522093 implements MigrationInterface {
    name = 'commentsAuthor1610975522093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "tournaments_comments" (
                "id" SERIAL NOT NULL,
                "text" text NOT NULL,
                "tournamentId" integer,
                CONSTRAINT "PK_8028459c2db923335689e864666" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments" DROP COLUMN "comments"
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments"
            ADD CONSTRAINT "FK_527e5c37520518e9d932710ce51" FOREIGN KEY ("tournamentId") REFERENCES "tournaments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments" DROP CONSTRAINT "FK_527e5c37520518e9d932710ce51"
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments"
            ADD "comments" text array NOT NULL DEFAULT '{}'
        `);
        await queryRunner.query(`
            DROP TABLE "tournaments_comments"
        `);
    }

}
