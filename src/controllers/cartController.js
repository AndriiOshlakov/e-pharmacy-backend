import { Cart } from '../models/cart.js';
import { Order } from '../models/order.js';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    'items.productId',
  );

  if (!cart) {
    return res.status(200).json({ items: [] });
  }

  res.json(cart);
};

export const updateCart = async (req, res) => {
  const { items } = req.body; // 🔥

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      userId: req.user._id,
      items: [],
    });
  }

  for (const newItem of items) {
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === newItem.productId,
    );

    if (existingItem) {
      existingItem.quantity += newItem.quantity;
    } else {
      cart.items.push(newItem);
    }
  }

  await cart.save();

  res.json(cart);
};

export const decreaseCart = async (req, res) => {
  const { items } = req.body;

  let cart = await Cart.findOne({ userId: req.user._id });

  for (const newItem of items) {
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === newItem.productId,
    );

    if (existingItem) {
      existingItem.quantity -= newItem.quantity;
    }
  }

  await cart.save();

  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  // фільтруємо всі items крім того який треба видалити
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId,
  );

  await cart.save();

  res.json(cart);
};

export const checkoutCart = async (req, res) => {
  const { userName, phone, email, address } = req.body;

  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    'items.productId',
  );

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  let total = 0;

  const orderItems = cart.items.map((item) => {
    const price = item.productId.price;

    total += price * item.quantity;

    return {
      productId: item.productId._id,
      name: item.productId.name,
      price,
      photo: item.productId.photo,
      quantity: item.quantity,
    };
  });

  const order = await Order.create({
    userId: req.user._id,
    userName,
    phone,
    email,
    address,
    total,
    items: orderItems,
  });

  await Cart.deleteOne({ userId: req.user._id });

  res.status(201).json({
    message: 'Order successfully created',
    order,
  });
};
