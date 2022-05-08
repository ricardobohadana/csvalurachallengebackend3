"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const AuthenticateUser_1 = require("./useCases/AuthenticateUser");
const AuthorizeUser_1 = require("./useCases/AuthorizeUser");
const CreateTransaction_1 = require("./useCases/CreateTransaction");
const CreateUser_1 = require("./useCases/CreateUser");
const DeleteUser_1 = require("./useCases/DeleteUser");
const GetTransactionGroups_1 = require("./useCases/GetTransactionGroups");
const GetTransactions_1 = require("./useCases/GetTransactions");
const GetUser_1 = require("./useCases/GetUser");
const GetUsers_1 = require("./useCases/GetUsers");
const ReportTransactions_1 = require("./useCases/ReportTransactions");
const UpdateUser_1 = require("./useCases/UpdateUser");
const router = (0, express_1.Router)();
exports.router = router;
// authentication routes
router.post("/register", (request, response) => {
    return CreateUser_1.createUserController.handle(request, response);
});
router.post("/login", (request, response) => {
    return AuthenticateUser_1.authenticateUserController.handle(request, response);
});
router.get("/checkAuth", (request, response) => {
    return AuthorizeUser_1.authorizeUserController.handle(request, response);
});
// users data routes
router.use("/users", (request, response, next) => {
    return AuthorizeUser_1.authorizeUserController.handle(request, response, next);
});
router.use("/user", (request, response, next) => {
    return AuthorizeUser_1.authorizeUserController.handle(request, response, next);
});
router.get("/users", (request, response) => {
    return GetUsers_1.getUsersController.handle(request, response);
});
router.get("/user/:userId", (request, response) => {
    return GetUser_1.getUserController.handle(request, response);
    return;
});
router.delete("/user/:userId", (request, response) => {
    return DeleteUser_1.deleteUserController.handle(request, response);
    return;
});
router.put("/user/:userId", (request, response) => {
    return UpdateUser_1.updateUserController.handle(request, response);
});
// transaction routes
router.use("/transactions", (request, response, next) => {
    return AuthorizeUser_1.authorizeUserController.handle(request, response, next);
});
router.post("/transactions", (request, response) => {
    return CreateTransaction_1.createTransactionController.handle(request, response);
    // return response.status(200).json(request.body);
});
router.get("/transactions", (request, response) => {
    return GetTransactionGroups_1.getTransactionGroupsController.handle(request, response);
});
router.get("/transactions/details", (request, response) => {
    return GetTransactions_1.getTransactionsController.handle(request, response);
});
router.get("/transactions/report", (request, response) => {
    return ReportTransactions_1.reportTransactionsController.handle(request, response);
});
