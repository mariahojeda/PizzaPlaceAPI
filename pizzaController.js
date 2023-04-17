const Pizza = require('../models/pizzaModel');

exports.createPizza = async (req, res) => {
  console.log('createPizza OK');
  try {
    const { flavor, toppings, size, price } = req.body;
    const pizza = new Pizza({
      flavor,
      toppings,
      size,
      price,
    });
    const createdPizza = await pizza.save();
    console.log('Pizza criada: ', createdPizza);
    res.status(201).json(createdPizza);
  } catch (error) {
    console.log('Erro ao criar pizza: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getPizzas = async (req, res) => {
  console.log('getPizzas OK');
  try {
    const pizzas = await Pizza.find();
    console.log('Pizzas retrieved: OK', pizzas);
    res.json(pizzas);
  } catch (error) {
    console.log('ERRO', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getPizzaById = async (req, res) => {
  console.log('getPizzaById OK');
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (pizza) {
      console.log('OK', pizza);
      res.json(pizza);
    } else {
      console.log('Pizza não encontrada');
      res.status(404).json({ message: 'Pizza não encontrada' });
    }
  } catch (error) {
    console.log('Error ao buscar por id: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updatePizza = async (req, res) => {
  console.log('updatePizza OK');
  try {
    const { flavor, toppings, size, price } = req.body;
    const pizza = await Pizza.findById(req.params.id);
    if (pizza) {
      pizza.flavor = flavor;
      pizza.toppings = toppings;
      pizza.size = size;
      pizza.price = price;
      const updatedPizza = await pizza.save();
      console.log('Pizza updated: ', updatedPizza);
      res.json(updatedPizza);
    } else {
      console.log('Pizza não encontrada');
      res.status(404).json({ message: 'Pizza não encontrada' });
    }
  } catch (error) {
    console.log('Erro ao atualizar pizza: ', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.deletePizza = async (req, res) => {
  console.log('deletePizza OK');
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (pizza) {
      await pizza.deleteOne();
      console.log('Pizza removida');
      res.json({ message: 'Pizza removida' });
    } else {
      console.log('Pizza não encontrada');
      res.status(404).json({ message: 'Pizza não encontrada' });
    }
  } catch (error) {
    console.log('Erro ao deletar pizza: ', error.message);
    res.status(500).json({ message: error.message });
  }
};