import 'react-native'
import React from 'react'
import SignIn from '../src/pages/SignIn'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

beforeEach(() => {
  jest.spyOn(global.console, 'error')
  global.console.error.mockImplementation(() => {})
})

afterEach(() => {
  global.console.error.mockRestore()
})

/* eslint-env mocha */
test('renders correctly Login cp005', () => {
  const tree = renderer.create(
    <SignIn />
  )
})
