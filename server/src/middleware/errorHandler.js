/**
 * Middleware de tratamento de erros.
 * Captura exceções não tratadas, loga o erro e retorna resposta JSON padronizada.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
    });
};

module.exports = errorHandler;
