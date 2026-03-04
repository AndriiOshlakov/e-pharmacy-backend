export const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};
