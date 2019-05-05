module.exports = (knex, Game) => params => {
  return knex
    .select()
    .from("games")
    .orderBy("id")
    .then(games => games.map(game => new Game(game)));
};
