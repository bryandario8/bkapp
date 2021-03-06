/**
 * @fileoverview Opcicion para descargar
 *
 * @version v1.0.1
 *
 * History
 * Se realizo el componente para permitir al usuario descargar un cupon
 * Esta es la primer version para poder descargar
 */
import React from 'react'
import { Alert, Text, TouchableOpacity, StyleSheet } from 'react-native'

import {Actions} from 'react-native-router-flux'

// Creacion de una variable
const Download = () => {
  const showAlert = () => {
    Alert.alert(
      'Requiere inicio de sesión.',
      'Para Iniciar Sesión presione Continuar',
      [
        { text: 'Cancelar', onPress: () => console.log('Cancelar'), style: 'cancel' },
        { text: 'Continuar', onPress: Actions.login }
      ],
      {cancelable: false}
    )
  }

  return (
    <TouchableOpacity onPress={showAlert} style={styles.button}>
      <Text style={styles.btnText}>Descargar</Text>
    </TouchableOpacity>
  )
}

export default Download

// Estilos del componente
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#185494',
    // width: 100,
    borderRadius: 5,
    alignItems: 'center'
  },
  btnText: {
    padding: 10,
    fontWeight: 'bold',
    color: '#fff'
  }
})
