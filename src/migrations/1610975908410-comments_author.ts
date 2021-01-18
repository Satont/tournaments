import {MigrationInterface, QueryRunner} from "typeorm";

export class commentsAuthor1610975908410 implements MigrationInterface {
    name = 'commentsAuthor1610975908410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments"
            ADD "authorId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments"
            ADD CONSTRAINT "UQ_20172b34fdff4436cc949659ac6" UNIQUE ("authorId")
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
            ALTER TABLE "tournaments_comments" DROP CONSTRAINT "UQ_20172b34fdff4436cc949659ac6"
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_comments" DROP COLUMN "authorId"
        `);
    }

}
