-- CREATE TABLE "artists" (
--     "id" SERIAL PRIMARY KEY,
--     "artist_name" varchar(80) not null,
--     "year_born" date
-- );

CREATE TABLE "artist" (
"id" serial,
"name" varchar(80),
"birthdate" date
);

CREATE TABLE "song" (
"id" serial,
"title" varchar(225),
"length" varchar(10),
"released" date
);

INSERT INTO "artist" ("id", "name","birthdate")
VALUES (1, 'Ella Fitzgerald','04-25-1917')
RETURNING "id","name","birthdate";

INSERT INTO "artist" ("id", "name","birthdate")
VALUES (2, 'Dave Brubeck','12-06-1920')
RETURNING "id","name","birthdate";

INSERT INTO "artist" ("id", "name","birthdate")
VALUES (3, 'Miles Davis','05-26-1926')
RETURNING "id","name","birthdate";

INSERT INTO "artist" ("id", "name","birthdate")
VALUES (4, 'Esperanza Spalding','10-18-1984')
RETURNING "id","name","birthdate";

INSERT INTO "song" ("id", "title","length","released")
VALUES (1, 'Take Five','5:24','1959-09-29')
RETURNING "id","title","length","released";

INSERT INTO "song" ("id", "title","length","released")
VALUES (2, 'So What','9:22','1959-08-17')
RETURNING "id","title","length","released";

INSERT INTO "song" ("id", "title","length","released")
VALUES (3, 'Black Gold','5:17','2012-02-01')
RETURNING "id","title","length","released";
