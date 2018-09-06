import 'react-native'
import React from 'react'
import SignIn from '../src/pages/SignIn'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

/* eslint-env mocha */
test('renders correctly Login cp005', () => {
  const tree = renderer.create(
    <SignIn />
  )
})
