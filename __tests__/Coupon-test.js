import 'react-native'
import React from 'react'
import Cupones from '../src/pages/Cupones'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

/* eslint-env mocha */
test('renders correctly Coupons cp004', () => {
  const tree = renderer.create(
    <Cupones />
  )
})
