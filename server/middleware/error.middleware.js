export default function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode || 500;

    res.status(statusCode).json({
        message: err.message,
        stack: err.stack,
    });
}
