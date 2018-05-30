import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { StyleSheet, View, Text, TouchableOpacity, TextInput,ScrollView,InputAccessoryView} from 'react-native';

//Validation
const validate = values => {
    const errors = {};      
    if (!values.nombre) {
        errors.nombre = 'Obligatorio'
    } else if (values.nombre.length > 20) {
        errors.nombre = 'El nombre no debe pasar de 20 caracteres'
    } 
    if (!values.email) {
        errors.email = 'Obligatorio'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Correo invalido'
    } 
    if (!values.password) {
        errors.email = 'Obligatorio'
    }else if (values.password.length< 4 ) {
         errors.email = 'Ingrese una Contraseña valida'
    }
    if (!values.apellido) {
        errors.apellido = 'Obligatorio'
    } else if (values.apellido.length > 20 ) {
        errors.apellido = 'El apellido no debe pasar de 20 caracteres ni menor que 4'
    } 
    if (!values.ciudad) {
        errors.ciudad = 'Obligatorio'
    } else if (values.ciudad.length > 20) {
        errors.ciudad = 'El campo ciudad no debe pasar de 20 caracteres'
    } 
    if (!values.sector) {
        errors.sector = 'Obligatorio'
    } else if (values.sector.length > 25) {
        errors.sector = 'El sector no debe pasar de 25 caracteres'
    } 
    return errors
}
/*const warn = values => {
    const warnings = {};  
    if (values.age < 19) {
        warnings.age = 'You seem a bit young...'
    }  
    return warnings
}*/
const renderField = ({ label, keyboardType, meta: { touched, error, warning }, input: { onChange, ...restInput }}) => {
    return (<View style={{ flexDirection: 'column', height: 70, alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
            <TextInput style={{ borderColor: 'steelblue', borderWidth: 1, height: 37, width: 220, padding: 5 }}
                keyboardType={keyboardType} onChangeText={onChange} {...restInput}
            placeholder={label}>
            </TextInput>
        </View>
        {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
                (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
    </View>);
};
const submit = values => {
    alert(`Validation success. Values = ~${JSON.stringify(values)}`);    
}
const ContactComponent = props => {
    const { handleSubmit } = props;
    return (
         <ScrollView keyboardDismissMode="interactive">
        <View style={{ flex: 1, flexDirection: 'column', margin: 40, justifyContent: 'flex-start', }}>
           
            <Text style={{ fontSize: 18, fontWeight: 'bold', width: 200, textAlign: 'center', margin: 10 }}>Registro</Text>
            <Field name="nombre" keyboardType="default" label="Nombre " component={renderField} />
            <Field name="apellido" keyboardType="default" label="Apellido " component={renderField} />
            <Field name="email" keyboardType="email-address" label="Email " component={renderField} />
            <Field name="password" keyboardType="password" label="Contraseña " component={renderField} />
            <Field name="ciudad" keyboardType="default" label="Ciudad " component={renderField} />
            <Field name="sector" keyboardType="default" label="Sector " component={renderField} />
            <Field name="celular" keyboardType="numeric" label="Celular " component={renderField} />
            <TouchableOpacity onPress={handleSubmit(submit)} style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{
                    backgroundColor: 'steelblue', color: 'blue', fontSize: 16,
                    height: 50, width: 200, textAlign: 'center', padding: 10
                }}>Enviar</Text>
            </TouchableOpacity>
           
        </View>
         </ScrollView>
    );
}
const RegistroFormulario = reduxForm({
    form: 'contact', // a unique identifier for this form    
    validate                // <--- validation function given to redux-form    
    //warn
})(ContactComponent);

export default RegistroFormulario;
