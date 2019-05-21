const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')


const booksDefinition = protoLoader.loadSync('books.proto', {})
const booksProto = grpc.loadPackageDefinition(booksDefinition)
const server = new grpc.Server()
const books = []

server.addService(booksProto.books.BookService.service, {
  list(call, callback) {
    callback(null, { books })
  },
  insert(call, callback) {
    books.push(call.request)
    callback(null, {})
  },
  get(call, callback) {
    const book = books.find((b) => b.id === call.request.id)

    if (book) {
      callback(null, book)
    }
    else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: 'Not Found',
      })
    }
  },
})
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
server.start()
