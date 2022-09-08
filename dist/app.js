"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const trips_1 = __importDefault(require("./routes/trips"));
const bookedTrips_1 = __importDefault(require("./routes/bookedTrips"));
const email_1 = __importDefault(require("./routes/email"));
const admin_1 = __importDefault(require("./routes/admin"));
const database_config_1 = __importDefault(require("./config/database.config"));
database_config_1.default.sync().then(() => {
    console.log("connected successfully, on port:");
});
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use('/', (req, res) => {
    res.status(200).json({
        messag: "welcome"
    });
});
app.use('/api/trips', trips_1.default);
app.use('/api/bookedtrips', bookedTrips_1.default);
app.use('/api/mail', email_1.default);
app.use("/api/admin", admin_1.default);
//app.use("/users", usersRouter);
exports.default = app;
