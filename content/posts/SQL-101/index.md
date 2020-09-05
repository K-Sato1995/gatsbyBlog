---
title: 'SQL 101'
slug: sql-101
date: 2019-01-19
language: english
category: Memo
tags:
  - SQL
published: true
description: "SQL stands for Structured Query Language. It is used to communicate with a database which means every programmer who uses a database should at least know a thing or two about this language. I've made a list of very basic commands of SQL in this post. (This post is still in progress.)"
---

# Retrieviing records from one table

I'll use the table below to demonstrate some basic sql executions.
The data shown below is just a bunch of example values.

**world**

| name        | continent | area    | population | gdp          |
| ----------- | --------- | ------- | ---------- | ------------ |
| Afghanistan | Asia      | 652230  | 25500100   | 20343000000  |
| Albania     | Europe    | 28748   | 2831741    | 12960000000  |
| Algeria     | Africa    | 2381741 | 37100000   | 188681000000 |
| Andorra     | Europe    | 468     | 78115      | 3712000000   |
| Angola      | Africa    | 1246700 | 20609294   | 100990000000 |

## Retrieve data from a column of a table

```sql
SELECT column_name FROM table_name;
```

**ex):**

```sql
SELECT population FROM world;
```

## Retrieve data from multiple columns of a table

```sql
SELECT column_name1, column_name2 FROM table_name;
```

**ex):**

```sql
SELECT population, area FROM world;
```

## Make an alias and retrieve data from the column of the table

```sql
SELECT column_name AS alias FROM table_name;
```

```sql
SELECT column_name1 AS alias1, column_name2 AS alias2 FROM table_name;
```

**ex):**

```sql
SELECT population, area AS 'MyArea' FROM world;
```

## Cliculate data and retrieve

```sql
SELECT column_name * 10 FROM table_name;
```

```sql
SELECT column_name * 10 AS alias FROM table_name;
```

**ex):**

```sql
SELECT population * 100 FROM world;
```

## Concat strings and retrieve

Add given string to each retrieved value.

```sql
SELECT column_name || 'string' FROM table_name;
```

```sql
SELECT 'string'||column_name AS alias FROM table_name;
```

**ex):**

```sql
SELECT continent || 'String' FROM world;
```

## Retrieve the average number of a column

```sql
SELECT AVG(column_name) FROM table_name;
```

```sql
SELECT AVG(column_name * 3) FROM table_name;
```

**ex):**

```sql
SELECT AVG(population) FROM world;
```

## Search records conditionally (WHERE)

```sql
SELECT column_name FROM table_name WHERE condition;
```

```sql
SELECT column_name FROM table_name WHERE column_name = 'record';
```

```sql
SELECT column_name FROM table_name WHERE column_name > 2;
```

```sql
SELECT column_name FROM table_name WHERE column_name LIKE '%string'
```

**ex):**

```sql
SELECT population FROM world WHERE name = 'France'
```

```sql
SELECT population From world  WHERE name IN ('Sweden', 'Norway', 'Denmark');
```

```sql
SELECT name, area FROM world WHERE area BETWEEN 250000 AND 3000000
```

**Comparison operators**

## LIKE Statement

The LIKE operator is used in a `WHERE` clause to search for a specified pattern in a column.

`%` : The percent sign represents zero, one, or multiple characters
`_`: The underscore represents a single character

```sql
SELECT column1, column2, ...
FROM table_name
WHERE columnN LIKE pattern;
```

| LIKE Operator                    | Description                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------- |
| WHERE CustomerName LIKE 'a%'     | Finds any values that start with "a"                                         |
| WHERE CustomerName LIKE '%a'     | Finds any values that end with "a"                                           |
| WHERE CustomerName LIKE '%or%'   | Finds any values that have "or" in any position                              |
| WHERE CustomerName LIKE '\_r%'   | Finds any values that have "r" in the second position                        |
| WHERE CustomerName LIKE 'a\_\_%' | Finds any values that start with "a" and are at least 3 characters in length |
| WHERE ContactName LIKE 'a%o'     | Finds any values that start with "a" and ends with "o"                       |

**ex):**

```sql
SELECT name FROM world WHERE name LIKE 'A%';
```

```sql
SELECT name FROM world WHERE name LIKE '%a';
```

```sql
// Finds any values that have "geria" in any position
SELECT name FROM world WHERE name LIKE '%geria%'
```

## Search records conditionally(CASE~WHEN)

```sql
SELECT column_name,CASE WHEN condition THEN 'string' ELSE 'string' END FROM table_name;
```

## Retrive records by group

The `COUNT(column_name)` function shows the number of colums of the column.
`COUNT(*)` includes null coluns, `COUNT(column_name)` excludes null columns.

```sql
SELECT column_name, COUNT(*) FROM table_name GROUP BY column_name;
```

```sql
SELECT column_name, COUNT(*) FROM table_name GROUP BY column_name HAVING condition;
```

```sql
SELECT column_name1, column_name2 COUNT(*) FROM table_name GROUP BY column_name1, column_name2;
```

**ex):**

```sql
SELECT population FROM world GROUP BY population;
```

```sql
SELECT population, COUNT(population) FROM world GROUP BY population;
```

## Sort and Retrive records

```sql
SELECT column_name FROM table_name ORDER BY column_name;
```

**ex):**

```sql
SELECT name, area FROM world ORDER BY area;
```

## Retrive unique records

```sql
SELECT DISTINCT column_name FROM table_name;
```

**ex):**

```sql
SELECT DISTINCT name FROM world;
```

# Interacting with multiple tables

I'll use the tables below to demonstrate some basic sql executions.
The data shown below is just a bunch of example values.

**game**

| id   | mdate        | stadium          | team1 | team2 |
| ---- | ------------ | ---------------- | ----- | ----- |
| 1001 | 8 June 2012  | National Stadium | POL   | GRE   |
| 1002 | 8 June 2012  | Stadion Miejski  | RUS   | CZE   |
| 1003 | 12 June 2012 | Stadion Miejski  | GRE   | CZE   |
| 1004 | 12 June 2012 | National Stadium | POL   | RUS   |

**goal**

| matchid | teamid | player               | gtime |
| ------- | ------ | -------------------- | ----- |
| 1001    | POL    | Robert Lewandowski   | 17    |
| 1001    | GRE    | Dimitris Salpingidis | 51    |
| 1002    | RUS    | Alan Dzagoev         | 15    |
| 1002    | RUS    | Roman Pavlyuchenko   | 82    |

**eteam**

| id  | teamname | coach                 |
| --- | -------- | --------------------- |
| POL | Poland   | Franciszek Smuda      |
| RUS | Russia   | Dick Advocaat         |
| CZE | Czech    | Republic Michal Bilek |
| GRE | Greece   | Fernando Santos       |

You can specify which table's column you are refering to by using the syntax below.

```
table_name.column_name
```

## Sql subquery syntax

```sql
SELECT column_name1
 FROM table_name1
WHERE value IN (SELECT column_name2
                FROM table_name2 );
```

## INNER JOIN

(INNER) JOIN: Select records that have matching values in both tables.

```sql
SELECT column_names
  FROM table_name1 JOIN table_name2
    ON column_name1 = column_name2
```

**ex):**

```sql
SELECT player, teamid, stadium, mdate
 FROM game JOIN goal
  ON (game.id=goal.matchid)
```

You can also omit the table names.

```sql
SELECT player, teamid, stadium, mdate
 FROM game JOIN goal
  ON (id=matchid)  WHERE teamid = 'GER'
```

```sql
SELECT player, teamid, coach, gtime
  FROM goal JOIN eteam
  ON (teamid = id) WHERE gtime<=10
```

## LEFT OUTER JOIN

Select records from the first (left-most) table with matching right table records.

```sql
SELECT column-names
  FROM table-name1 LEFT JOIN table-name2
    ON column-name1 = column-name2
```

## RIGHT OUTER JOIN

Select records from the second (right-most) table with matching left table records.

```sql
SELECT column-names
  FROM table-name1 RIGHT JOIN table-name2
    ON column-name1 = column-name2
```

# Reference

- [SQL 素人でも分かるテーブル結合(inner join と outer join)](https://qiita.com/naoki_mochizuki/items/3fda1ad6594c11d7b43c)
- [Defactory (SQL JOIN)](https://www.dofactory.com/sql/join)
- [SELECT basics - SQLZOO](https://sqlzoo.net/wiki/SELECT_basics)
