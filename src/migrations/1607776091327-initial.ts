import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1607776091327 implements MigrationInterface {
    name = 'initial1607776091327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "teams" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "captainId" integer,
                CONSTRAINT "UQ_48c0c32e6247a2de155baeaf980" UNIQUE ("name"),
                CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users_stats_br" (
                "id" SERIAL NOT NULL,
                "points" integer NOT NULL DEFAULT '0',
                "matches" integer NOT NULL DEFAULT '0',
                "wins" integer NOT NULL DEFAULT '0',
                CONSTRAINT "PK_ec30f250b375fb8c88a8499bec5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users_stats_mp" (
                "id" SERIAL NOT NULL,
                "points" integer NOT NULL DEFAULT '0',
                "matches" integer NOT NULL DEFAULT '0',
                "wins" integer NOT NULL DEFAULT '0',
                CONSTRAINT "PK_38397d116fa3bcee5d74d80fb3d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "players" (
                "id" SERIAL NOT NULL,
                "userId" character varying NOT NULL,
                "activision" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "statsBrId" integer,
                "statsMpId" integer,
                CONSTRAINT "UQ_91e6495b95a41af3d9ec187c6c8" UNIQUE ("activision"),
                CONSTRAINT "REL_5cc1b62d5eb9016c6b73f589b0" UNIQUE ("statsBrId"),
                CONSTRAINT "REL_148b6203cdd654434654fb2006" UNIQUE ("statsMpId"),
                CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7c11c744c0601ab432cfa6ff7a" ON "players" ("userId")
        `);
        await queryRunner.query(`
            CREATE TABLE "sessions" (
                "id" character varying NOT NULL,
                "expiredAt" bigint NOT NULL,
                "json" text NOT NULL,
                CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4c1989542e47d9e3b98fe32c67" ON "sessions" ("expiredAt")
        `);
        await queryRunner.query(`
            CREATE TABLE "settings" (
                "id" SERIAL NOT NULL,
                "space" character varying NOT NULL,
                "name" character varying NOT NULL DEFAULT '0',
                "value" text NOT NULL,
                CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tournaments" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "isRunned" boolean NOT NULL,
                "type" character varying NOT NULL,
                "channel" character varying NOT NULL,
                CONSTRAINT "PK_6d5d129da7a80cf99e8ad4833a9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "teams_players" (
                "playersId" integer NOT NULL,
                "teamsId" integer NOT NULL,
                CONSTRAINT "PK_41f93c49bf4aa717ce12f3b8e5b" PRIMARY KEY ("playersId", "teamsId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_084a94b3ea58b80adb3ff35ed0" ON "teams_players" ("playersId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_321b4a69d558ffa2bda1621bc4" ON "teams_players" ("teamsId")
        `);
        await queryRunner.query(`
            CREATE TABLE "tournaments_teams" (
                "tournamentsId" integer NOT NULL,
                "teamsId" integer NOT NULL,
                CONSTRAINT "PK_060ed90e776ac44f820b0c7c475" PRIMARY KEY ("tournamentsId", "teamsId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c4c5b7ef37e29ecd809200556e" ON "tournaments_teams" ("tournamentsId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_0ea369da0797cdfe98a0da3873" ON "tournaments_teams" ("teamsId")
        `);
        await queryRunner.query(`
            ALTER TABLE "teams"
            ADD CONSTRAINT "FK_c865ec19ec98fc763b1b709eaf2" FOREIGN KEY ("captainId") REFERENCES "players"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "players"
            ADD CONSTRAINT "FK_5cc1b62d5eb9016c6b73f589b09" FOREIGN KEY ("statsBrId") REFERENCES "users_stats_br"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "players"
            ADD CONSTRAINT "FK_148b6203cdd654434654fb2006a" FOREIGN KEY ("statsMpId") REFERENCES "users_stats_mp"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "teams_players"
            ADD CONSTRAINT "FK_084a94b3ea58b80adb3ff35ed08" FOREIGN KEY ("playersId") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "teams_players"
            ADD CONSTRAINT "FK_321b4a69d558ffa2bda1621bc46" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_teams"
            ADD CONSTRAINT "FK_c4c5b7ef37e29ecd809200556e2" FOREIGN KEY ("tournamentsId") REFERENCES "tournaments"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_teams"
            ADD CONSTRAINT "FK_0ea369da0797cdfe98a0da38738" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "tournaments_teams" DROP CONSTRAINT "FK_0ea369da0797cdfe98a0da38738"
        `);
        await queryRunner.query(`
            ALTER TABLE "tournaments_teams" DROP CONSTRAINT "FK_c4c5b7ef37e29ecd809200556e2"
        `);
        await queryRunner.query(`
            ALTER TABLE "teams_players" DROP CONSTRAINT "FK_321b4a69d558ffa2bda1621bc46"
        `);
        await queryRunner.query(`
            ALTER TABLE "teams_players" DROP CONSTRAINT "FK_084a94b3ea58b80adb3ff35ed08"
        `);
        await queryRunner.query(`
            ALTER TABLE "players" DROP CONSTRAINT "FK_148b6203cdd654434654fb2006a"
        `);
        await queryRunner.query(`
            ALTER TABLE "players" DROP CONSTRAINT "FK_5cc1b62d5eb9016c6b73f589b09"
        `);
        await queryRunner.query(`
            ALTER TABLE "teams" DROP CONSTRAINT "FK_c865ec19ec98fc763b1b709eaf2"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_0ea369da0797cdfe98a0da3873"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_c4c5b7ef37e29ecd809200556e"
        `);
        await queryRunner.query(`
            DROP TABLE "tournaments_teams"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_321b4a69d558ffa2bda1621bc4"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_084a94b3ea58b80adb3ff35ed0"
        `);
        await queryRunner.query(`
            DROP TABLE "teams_players"
        `);
        await queryRunner.query(`
            DROP TABLE "tournaments"
        `);
        await queryRunner.query(`
            DROP TABLE "settings"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_4c1989542e47d9e3b98fe32c67"
        `);
        await queryRunner.query(`
            DROP TABLE "sessions"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_7c11c744c0601ab432cfa6ff7a"
        `);
        await queryRunner.query(`
            DROP TABLE "players"
        `);
        await queryRunner.query(`
            DROP TABLE "users_stats_mp"
        `);
        await queryRunner.query(`
            DROP TABLE "users_stats_br"
        `);
        await queryRunner.query(`
            DROP TABLE "teams"
        `);
    }

}
