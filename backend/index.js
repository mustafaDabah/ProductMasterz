const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const connectToDB = require("./config/connectToDB");
const { notFound, errorHandler } = require("./middlewares/error");
const app = express();

// connection to DB
connectToDB();

// MIDDLEWARES
app.use(bodyParser.json({ limit: 12 * 1048576 }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

// ROUTES
app.use("/api/v0/admin-mails", require("./routes/adminMailRoutes"));
app.use("/api/v0/nodes", require("./routes/nodeRoutes"));
app.use("/api/v0/tags", require("./routes/tagRoutes"));
app.use("/api/v0/languages", require("./routes/languageRoutes"));

app.use("/api/v0/sections", require("./routes/sectionRoutes"));
app.use("/api/v0/pages", require("./routes/pageRoutes"));

// Permanent Routes
app.use("/api/v0/home", require("./routes/homeRoutes"));
app.use("/api/v0/webinar", require("./routes/webinarRoutes"));
app.use("/api/v0/registered-lead", require("./routes/registeredLeadRoutes"));

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
