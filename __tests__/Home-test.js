import 'react-native'
import React from 'react'
import Home from '../src/pages/Home'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

/* eslint-env mocha */
test('renders correctly Home cp001', () => {
  const tree = renderer.create(
    <Home />
  )
})
