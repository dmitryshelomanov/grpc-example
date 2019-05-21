const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')


const booksDefinition = protoLoader.loadSync('books.proto', {})
const booksProto = grpc.loadPackageDefinition(booksDefinition)
const client = new booksProto.books.BookService('localhost:50051', grpc.credentials.createInsecure())

const buildBook = () => ({
  id: process.argv[3] || 1,
  title: Math.random().toString(),
  author: Math.random().toString(),
})

const routes = {
  getBooks() {
    client.list({}, (err, response) => {
      console.log(response)
    })
  },
  addBook() {
    client.insert(buildBook(), (err, response) => {
      this.getBooks()
    })
  },
  getBook() {
    const id = process.argv[3] || 1

    client.get({ id }, (err, response) => {
      if (!err) {
        console.log(response)
      }
      else {
        throw new Error(err)
      }
    })
  },
}

const method = process.argv[2] || 'getBooks'

routes[method]()
