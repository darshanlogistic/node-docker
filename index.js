const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const postRouter = require("./routes/postRoutes")
const authRouter = require("./routes/authRoutes")
const app = express()
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || "BLANK"
const session = require("express-session")
const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  REDIS_URL,
  SESSION_SECRET,
} = require("./config/config")

const redis = require("redis")
const RedisStore = require("connect-redis")(session)
const redisClient = redis.createClient({
  host: REDIS_URL,
})

// mongodb://root:password@mongo:27017/?authSource=admin
// mongodb://username:password@ipAddress(Container DNS):PORT/?authSource=admin
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Success fully connected to db")
  })
  .catch((e) => {
    console.log("mongo error :: ", e.message)
  })
app.use(cors({}))
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 3000000,
    },
  })
)

// Routes

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello From Docker server")
})

app.use("/posts", postRouter)
app.use("/auth", authRouter)
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
