import 'react-native'
import React from 'react'
import Registros from '../src/pages/SignUp'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

/* eslint-env mocha */
it('renders correctly Signup cp006', () => {
  const tree = renderer.create(
    <Registros />
  )
})
