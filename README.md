This is Auth in SERVER side

mkdir jwt-auth-api 
cd jwt-auth-api
npm init -y
npm i express mongoose bcryptjs jsonwebtoken dotenv express-validator cors
npm i -D nodemon

FOR RUNNING 
node server.js



Testing with Postman / cURL

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"a@a.com","password":"secret12"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"a@a.com","password":"secret12"}'

# Authenticated query
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <TOKEN_FROM_LOGIN>"
  
