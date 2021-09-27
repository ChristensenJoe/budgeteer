
puts "Seeding Users..."

jim = User.create(username: "Jim", password: '1234', password_confirmation: '1234', email: 'jim@example.com', unallocated_balance: 25000.00, )

Paycheck.create(user_id: jim.id, amount: 6000);