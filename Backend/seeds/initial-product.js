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
        knex('ordered_item').del()
      })
      .then(() => {
        knex('order').del()
      })
      .then(() => {
        knex('customer_info').del()
      })
      // .then(() => {
      //   knex('admin').del()
      // })
      .then(() => {
        knex('users').del()
      })

      .then(function () {
        // Inserts seed entries
        return Promise.all([
          knex('users')
            .insert([
              { id: 1, email: 'admin@gmail.com', password: '1' },
              { id: 2, email: 'user1@gmail.com', password: '1' },
              { id: 3, email: 'user2@gmail.com', password: '1' }
            ])
            .then(() => {
              return knex('customer_info').insert([
                {
                  id: 1,
                  user_id: 1,
                  phone: '1234 5678',
                  credit_card_info: null,
                  delivery_address: null
                },
                {
                  id: 2,
                  user_id: 2,
                  phone: '2468 1357',
                  credit_card_info: '1234 1234 1234 1234',
                  delivery_address: 'cwb'
                },
                {
                  id: 3,
                  user_id: 3,
                  phone: '3456 5432',
                  credit_card_info: '2234 3234 4234 5234',
                  delivery_address: 'cwb'
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
            //   return knex('order').insert([
            //     {
            //       id: 1,
            //       user_id: 2,
            //       status: 'pending'
            //     },
            //     {
            //       id: 2,
            //       user_id: 3,
            //       status: 'pending'
            //     }
            //   ])
            // })
            // .then(() => {
            //   return knex('ordered_item').insert([
            //     {
            //       id: 1,
            //       product_id: 1,
            //       order_id: 1,
            //       quantity: 20,
            //       product_size: 'small',
            //       product_milk: 'whole_milk',
            //       product_temperature: 'hot',
            //       special_instruction: 'order_id_1',
            //       price: null
            //     },
            //     {
            //       id: 2,
            //       product_id: 2,
            //       order_id: 1,
            //       quantity: 60,
            //       product_size: 'small',
            //       product_milk: 'soy_milk',
            //       product_temperature: 'cold',
            //       special_instruction: 'order_id_1',
            //       price: null
            //     },
            //     {
            //       id: 3,
            //       product_id: 3,
            //       order_id: 2,
            //       quantity: 33,
            //       product_size: 'small',
            //       product_milk: 'soy_milk',
            //       product_temperature: 'cold',
            //       special_instruction: 'order_id_1',
            //       price: null
            //     },
            //     {
            //       id: 4,
            //       product_id: 4,
            //       order_id: 2,
            //       quantity: 56,
            //       product_size: 'small',
            //       product_milk: 'soy_milk',
            //       product_temperature: 'cold',
            //       special_instruction: 'order_id_1',
            //       price: null
            //     }
            //   ])
            // })

            .catch(error => console.log(`Error seeding data: ${error}`))
        ])
      })
      .catch(error => console.log(`Error seeding data: ${error}`))
  )
}
