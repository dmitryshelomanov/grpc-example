const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')


const booksDefinition = protoLoader.loadSync('books.proto', {})
const booksProto = grpc.loadPackageDefinition(booksDefinition)
const client = new booksProto.books.BookService('localhost:50051', grpc.credentials.createInsecure())

client.insert({ title: Math.random().toString(), author: Math.random().toString() }, function(err, response) {
  client.list({}, function(err, response) {
    console.log(response)
  })  
})
