CREATE TABLE standing (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    img1 TEXT NOT NULL,
    img2 TEXT NOT NULL,
    img3 TEXT NOT NULL,
    notes TEXT NOT NULL
);

CREATE TABLE sitting (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    img1 TEXT NOT NULL,
    img2 TEXT NOT NULL,
    img3 TEXT NOT NULL,
    notes TEXT NOT NULL
);

CREATE TABLE lastfive (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    orderSitting TEXT NOT NULL,
    orderStanding TEXT NOT NULL
);