const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method
    });

    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Terjadi kesalahan internal server';

    // Handle MySQL errors
    if (err.code === 'ER_DUP_ENTRY') {
        statusCode = 409;
        message = 'Data duplikat ditemukan';
    } else if (err.code === 'ER_NO_REFERENCED_ROW') {
        statusCode = 400;
        message = 'Referensi data tidak valid';
    }

    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;