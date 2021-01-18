import {MigrationInterface, QueryRunner} from "typeorm";

export class commentsAuthor1610977032982 implements MigrationInterface {
    name = 'commentsAuthor1610977032982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments" DROP CONSTRAINT "FK_20172b34fdff4436cc949659ac6"
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "tournaments_comments"."authorId" IS NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments" DROP CONSTRAINT "UQ_20172b34fdff4436cc949659ac6"
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments"
            ADD CONSTRAINT "FK_20172b34fdff4436cc949659ac6" FOREIGN KEY ("authorId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments" DROP CONSTRAINT "FK_20172b34fdff4436cc949659ac6"
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments"
            ADD CONSTRAINT "UQ_20172b34fdff4436cc949659ac6" UNIQUE ("authorId")
        `);
        await queryRunner.query(`
            COMMENT ON COLUMN "tournaments_comments"."authorId" IS NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments"
            ADD CONSTRAINT "FK_20172b34fdff4436cc949659ac6" FOREIGN KEY ("authorId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
