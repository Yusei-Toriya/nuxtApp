const middleware = {}

middleware['messages'] = require('..\\middleware\\messages.ts')
middleware['messages'] = middleware['messages'].default || middleware['messages']

export default middleware
