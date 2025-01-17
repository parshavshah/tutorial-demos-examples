const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");

// Initialize Express app and Sequelize
const app = express();
const sequelize = new Sequelize("sqlite::memory:"); // Using SQLite in-memory for simplicity

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Define the User model
const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// API to list users with pagination, search, and ordering
app.get("/users", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    orderBy = "name",
    order = "ASC",
  } = req.query;

  console.log(req.query);

  // Parse page and limit into integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  if (
    isNaN(pageNumber) ||
    isNaN(limitNumber) ||
    pageNumber < 1 ||
    limitNumber < 1
  ) {
    return res.status(400).json({ error: "Invalid page or limit parameter." });
  }

  if (!["ASC", "DESC"].includes(order.toUpperCase())) {
    return res
      .status(400)
      .json({ error: "Invalid order parameter. Use ASC or DESC." });
  }

  try {
    const { count, rows } = await User.findAndCountAll({
      where: {
        [Sequelize.Op.or]: [
          { name: { [Sequelize.Op.like]: `%${search}%` } },
          { email: { [Sequelize.Op.like]: `%${search}%` } },
        ],
      },
      order: [[orderBy, order.toUpperCase()]],
      offset: (pageNumber - 1) * limitNumber,
      limit: limitNumber,
    });

    res.json({
      totalUsers: count,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
      users: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

// Sync database and seed some data for demonstration
(async () => {
  try {
    await sequelize.sync({ force: true });

    // Seed data
    for (let i = 1; i <= 100; i++) {
      await User.create({
        name: `User ${i}`,
        email: `user${i}@example.com`,
      });
    }

    console.log("Database synced and users created.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
