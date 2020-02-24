exports.seed = function (knex) {
  // Deletes ALL existing entries
  return (
    knex('product')
      .del()
      .then(() => {
        knex('genre').del()
      })
      .then(() => {
        knex('product').del()
      })
      // .then(() => {
      //   knex('displayMenu').del()
      // })
      .then(() => {
        knex('purchase').del()
      })
      // .then(() => {
      //   knex('order').del()
      // })
      .then(() => {
        knex('customer').del()
      })
      .then(() => {
        knex('admin').del()
      })
      .then(() => {
        knex('users').del()
      })

      .then(function () {
        // Inserts seed entries
        return Promise.all([
          knex('users')
            .insert([
              { id: 1, password: '123' },
              { id: 2, password: '456' },
              { id: 3, password: '789' }
            ])
            .then(() => {
              return knex('admin').insert([
                {
                  id: 1,
                  user_id: 1,
                  admin_name: 'Derek',
                  admin_email: 'Derek@gmail.com'
                }
              ])
            })
            .then(() => {
              return knex('customer').insert([
                {
                  id: 1,
                  user_id: 2,
                  email: 'user1@gmail.com',
                  phone: '12345678',
                  credit_card_info: '1234 1234 1234 1234',
                  delivery_address: 'cwb'
                },
                {
                  id: 2,
                  user_id: 3,
                  email: 'user3@gmail.com',
                  phone: '12345678',
                  credit_card_info: '5678 5678 5678 5678',
                  delivery_address: 'Sai Ying Pun'
                }
              ])
            })

            .then(() => {
              return knex('genre').insert([
                {
                  id: 1,
                  genre_name: 'coffee',
                  genre_img:
                    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
                  description: 'beverage'
                }
              ])
            })
            .then(() => {
              return knex('product').insert([
                {
                  id: 1,
                  genre_id: 1,
                  product_name: 'Cappuccino',
                  product_img:
                    'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                  product_cost: 10,
                  product_price: 30,
                  available_period: '1-month'
                },
                {
                  id: 2,
                  genre_id: 1,
                  product_name: 'Matcha Mocha',
                  product_img:
                    'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                  product_cost: 12,
                  product_price: 35,
                  available_period: '1-month'
                },
                {
                  id: 3,
                  genre_id: 1,
                  product_name: 'Mocha',
                  product_img:
                    'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                  product_cost: 12,
                  product_price: 33,
                  available_period: '1-month'
                },
                {
                  id: 4,
                  genre_id: 1,
                  product_name: 'Flat White',
                  product_img:
                    'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                  product_cost: 9,
                  product_price: 34,
                  available_period: '1-month'
                },
                {
                  id: 5,
                  genre_id: 1,
                  product_name: 'Lattae',
                  product_img:
                    'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                  product_cost: 7,
                  product_price: 32,
                  available_period: '1-month'
                },
                {
                  id: 6,
                  genre_id: 1,
                  product_name: 'Espresso',
                  product_img:
                    'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
                  product_cost: 6,
                  product_price: 30,
                  available_period: '1-month'
                }
              ])
            })
            // .then(() => {
            //   return knex('displayMenu').insert([
            //     {
            //       id: 1,
            //       product_id: 1
            //     },
            //     {
            //       id: 2,
            //       product_id: 2
            //     },
            //     {
            //       id: 3,
            //       product_id: 3
            //     },
            //     {
            //       id: 4,
            //       product_id: 4
            //     },
            //     {
            //       id: 5,
            //       product_id: 5
            //     },
            //     {
            //       id: 6,
            //       product_id: 6
            //     }
            //   ])
            // })
            // .then(() => {
            //   return knex('order').insert([
            //     {
            //       id: 1,
            //       user_id: 2,
            //       lifecycle_status: 'Accepted'
            //     }
            //   ])
            // })
            .then(() => {
              return knex('purchase').insert([
                {
                  id: 1,
                  user_id: 2,
                  product_id: 1,
                  quantity: 3,
                  product_size: 'large',
                  product_milk: 'whole_milk',
                  product_temperature: 'hot',
                  special_instruction: 'extra milk and sugar',
                  status: 'pending'
                },
                {
                  id: 2,
                  user_id: 2,
                  product_id: 3,
                  quantity: 5,
                  product_size: 'small',
                  product_milk: 'whole_milk',
                  product_temperature: 'hot',
                  special_instruction: 'extra milk, no sugar',
                  status: 'pending'
                },
                {
                  id: 3,
                  user_id: 3,
                  product_id: 4,
                  quantity: 8,
                  product_size: 'Medium',
                  product_milk: 'soy milk',
                  product_temperature: 'Hot',
                  special_instruction: 'extra sugar',
                  status: 'confirmed'
                }
              ])
            })

            .catch(error => console.log(`Error seeding data: ${error}`))
        ])
      })
      .catch(error => console.log(`Error seeding data: ${error}`))
  )
}
