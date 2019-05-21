const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')


const booksDefinition = protoLoader.loadSync('books.proto', {})
const booksProto = grpc.loadPackageDefinition(booksDefinition)
const server = new grpc.Server()
const books = []

server.addService(booksProto.books.BookService.service, {
  list: function (call, callback) {
    callback(null, { books })
  },
  insert: function (call, callback) {
    books.push(call.request)
    callback(null, {})
  },
})
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
server.start()
