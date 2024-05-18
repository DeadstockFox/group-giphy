-- Database name should be: giphy_search_favorites

-- Categories table:
CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (100) NOT NULL
);

-- Default categories. You may change these. 🙂
INSERT INTO "categories"
  ("name")
  VALUES
  ('wild'),
  ('uproarious'),
  ('poignant'),
  ('felicitous'),
  ('whimsical');

-- Creating the 'favorites' table
CREATE TABLE "favorites" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "url" VARCHAR
);

-- Creating the 'favorites_categories' table
-- This table creates a many-to-many relationship between 'favorites' and 'categories'
CREATE TABLE "favorites_categories" (
    "id" SERIAL PRIMARY KEY,
    "favorite_id" INT,
    "category_id" INT,
    CONSTRAINT "fk_favorite" FOREIGN KEY (favorite_id) REFERENCES favorites(id) ON DELETE CASCADE,
    CONSTRAINT "fk_category" FOREIGN KEY (category_id) REFERENCES categories(id)ON DELETE CASCADE
);
