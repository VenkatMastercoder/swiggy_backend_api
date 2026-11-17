const express = require("express");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create a Instance of HTTP Server
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("APIs Working");
});

// API 1 - GET : http//:localhost:3000/restaurants --> Return all Restaurant
app.get("/restaurants", async (req, res) => {
  // 1. Data from Frontend

  // 2. DB Logic
  const db_data = await prisma.restaurant.findMany();

  // 3. Data to Frontend
  res.send(db_data);
});

// API 2 - POST --> http://localhost:3000/restaurants --> Add a Restaurant
app.post("/restaurants", async (req, res) => {
  // 1. Data from Frontend
  const data = req.body;

  console.log(data);

  // 2. DB Logic
  const new_data = await prisma.restaurant.create({
    data: {
      id: data.id,
      restaurant_id: data.restaurant_id,
      image_url: data.image_url,
      title: data.title,
      rating: data.rating,
      tag: data.tag,
    },
  });

  // 3. Send Data to Frontend
  res.send(new_data);
});

// API 3 - PUT --> http://localhost:3000/restaurants --> Update a Restaurant
app.put("/restaurants", async (req, res) => {
  // 1. Data from Frontend
  const data = req.body;

  console.log(data)

  // 2. DB Logic
  const updated_data = await prisma.restaurant.update({
    where: {
      restaurant_id: data.restaurant_id
    },
    data: {
      id: data.id,
      restaurant_id: data.restaurant_id,
      image_url: data.image_url,
      title: data.title,
      rating: data.rating,
      tag: data.tag,
    },
  });

  // 3. Data to Frontend
  res.send(updated_data)
});

// API 4 - Delete ---> http://localhost:3000/restaurants --> Delete a Restaurant
app.delete("/restaurants", async (req,res)=>{
  // 1. Data from Frontend
  const data = req.body

  // 2. DB Logic
  await prisma.restaurant.delete({
    where: {
      restaurant_id: data.restaurant_id
    }
  })

  // 3. Data to Frontend
  res.send("Restaurant Deleted")
})

app.listen(3000);
