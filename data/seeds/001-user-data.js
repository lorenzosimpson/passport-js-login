
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'test_1', password: 'password'},
        {username: 'test_2', password: 'password'},
        {username: 'test_3', password: 'password'},
        {username: 'test_4', password: 'password'},
      ]);
    });
};
