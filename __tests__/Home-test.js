import 'react-native'
import React from 'react'
import Propaganda from '../src/pages/Propaganda'

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
test('renders correctly Home cp001', () => {
  const tree = renderer.create(
    <Propaganda />
  )
})
