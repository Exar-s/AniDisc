import http from 'http';
import app from './app.js';
import { PORT } from './config/var.js';
const server = http.createServer(app);

// setTimeout(function(){
//   server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
  
// }, 60000)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});