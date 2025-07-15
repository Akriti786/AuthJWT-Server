export default function errorHandler(err, req, res, _next) {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server error'
  });
}
