import Fastify from 'fastify';

import { users } from './users';
import { re } from '@babel/core/lib/vendor/import-meta-resolve';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  if(request.body.toLowerCase().indexOf('fuck') !== -1){
    reply.statusCode = 403;
    return reply.send("unresolved");
  }else {
    reply.statusCode = 200;
    return reply.send(request.body.toUpperCase());
  }
})

fastify.post('/lowercase', (request, reply) => {
  if(request.body.toLowerCase().indexOf('fuck') !== -1){
    reply.statusCode = 403;
    return reply.send("unresolved");
  }else {
    reply.statusCode = 200;
    return reply.send(request.body.toLowerCase());
  }
})

fastify.get('/user/:id', (request, reply) => {
  if(users[request.params.id]){
    return users[request.params.id];
  }else {
    reply.statusCode = 400;
    return reply.send("User not exist");
  }
})

fastify.get('/users', (request, reply) => {
  const { filter } = request.query;
  const { value } = request.query;

  if(!filter && !value){
    return reply.send(Object.values(users));
  }

  const result = Object.values(users).filter((item) => {
    if (filter === 'age'){
      return  item[`${filter}`] === +value;
    }
     return  item[`${filter}`] === value;
  })
  return reply.send(result);

})

export default fastify;
