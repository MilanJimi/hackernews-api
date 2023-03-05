const authenticate = jest.fn().mockImplementation((req, res, next) => {
  req.body.userId = req.body.userId ?? 'mock_user_id'
  return next()
})

export { authenticate }
