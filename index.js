'use strict';

const mongoose = require('mongoose');
const server = require('./src/server');

require('dotenv').config();
const port = process.env.PORT;

// Create a mongoose model

// // Signup Route -- create a new user
// // Two ways to test this route with httpie
// // echo '{"username":"john","password":"foo"}' | http post :3000/signup
// // http post :3000/signup usernmae=john password=foo
// app.post('/signup', async (req, res) => {
//   try {
//     req.body.password = await bcrypt.hash(req.body.password, 10);
//     const user = new Users(req.body);
//     const record = await user.save(req.body);
//     res.status(200).json(record);
//   } catch (e) {
//     res.status(403).send('Error Creating User');
//   }
// });

// // Signin Route -- login with username and password
// // test with httpie
// // http post :3000/signin -a john:foo
// app.post('/signin', async (req, res) => {
//   /*
//     req.headers.authorization is : "Basic sdkjdsljd="
//     To get username and password from this, take the following steps:
//       - Turn that string into an array by splitting on ' '
//       - Pop off the last value
//       - Decode that encoded string so it returns to user:pass
//       - Split on ':' to turn it into an array
//       - Pull username and password from that array
//   */

//   let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', 'sdkjdsljd=']
//   let encodedString = basicHeaderParts.pop(); // sdkjdsljd=
//   let decodedString = base64.decode(encodedString); // "username:password"
//   let [username, password] = decodedString.split(':'); // username, password

//   /*
//     Now that we finally have username and password, let's see if it's valid
//     1. Find the user in the database by username
//     2. Compare the plaintext password we now have against the encrypted password in the db
//        - bcrypt does this by re-encrypting the plaintext password and comparing THAT
//     3. Either we're valid or we throw an error
//   */
//   try {
//     const user = await Users.findOne({ username: username });
//     const valid = await bcrypt.compare(password, user.password);
//     if (valid) {
//       res.status(200).json(user);
//     } else {
//       throw new Error('Invalid User');
//     }
//   } catch (error) {
//     res.status(403).send('Invalid Login');
//   }
// });

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.start(port);
  })
  .catch(error => {
    console.error('Could not start server', error.message);
  });
