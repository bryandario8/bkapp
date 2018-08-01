import 'react-native'
import React from 'react'
import Menu from '../src/pages/Products'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

beforeEach(() => {
  jest.spyOn(console, 'error')
  global.console.error.mockImplementation(() => {})
})

afterEach(() => {
  global.console.error.mockRestore()
})

/* eslint-env mocha */
test('renders correctly cp', () => {   // Corregir prueba
  const tree = renderer.create(
    <Menu />
  )
})
