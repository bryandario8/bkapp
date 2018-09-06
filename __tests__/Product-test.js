import 'react-native'
import React from 'react'
import {Categories, Products} from '../src/pages/Products'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

/* eslint-env mocha */
test('renders correctly Categories cp003', () => { // Corregir prueba
  const tree = renderer.create(
    <Categories />
  )
})
