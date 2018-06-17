import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    ScrollView,
    InputAccessoryView,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';

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
        errors.password = 'Obligatorio'
    }else if (values.password.length< 4 ) {
         errors.password = 'Ingrese una Contraseña valida'
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
const renderField = ({ label, keyboardType,seguridad, meta: { touched, error, warning }, input: { onChange, ...restInput }}) => {
    if (seguridad == "false") {
         return (
            
             <View style={{ flexDirection: 'column', height: 60, alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
                <TextInput style = {{width:'100%'}}
                    keyboardType={keyboardType} onChangeText={onChange} {...restInput}
                placeholder={label} secureTextEntry={false}>
                </TextInput>
            </View>
            {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
                    (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>);
    }else{
        return (
             <View style={{ flexDirection: 'column', height: 60, alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'row', height: 40, alignItems: 'center' }}>
                <TextInput style = {{width:'100%'}}
                    keyboardType={keyboardType} onChangeText={onChange} {...restInput}
                placeholder={label} secureTextEntry={true}>
                </TextInput>
            </View>
            {touched && ((error && <Text style={{ color: 'red' }}>{error}</Text>) ||
                    (warning && <Text style={{ color: 'orange' }}>{warning}</Text>))}
        </View>);
    }
   
};
const submit = values => {
        try{
            fetch("http://132.148.147.172:9999/api/signup/", {
               method: "post",
                header: {
                  'Accept' : 'application/json',
                  'Content-type' :'application/json',
                },
               body:  JSON.stringify(values)})
                .then((response) => response.json())
                .then((response) => { 
                        alert(response);
                    if (response['error'] == 'false') {
                        alert(response['msg']);
                      }else if(response['error'] == 'true'){
                        alert(response['msg']);
                    }
            });
        }catch(error){
            console.log(error);
        }
        
}
/*const submit = values => {
    alert(`Validation success. Values = ~${JSON.stringify(values)}`);    
}*/
const ContactComponent = props => {
    const { handleSubmit } = props;
    return (
         <ScrollView keyboardDismissMode="interactive">
        <View style={{ flex: 1, flexDirection: 'column', margin: 20,marginBottom: 70, justifyContent: 'flex-start'}}>
         
            <Text style={{ fontSize: 18, fontWeight: 'bold', width: "100%", textAlign: 'center', margin: 10 }}>Registro</Text>
            <KeyboardAvoidingView  behavior="padding" >
             <Field name="username" keyboardType="default" label="Nombre usuario " seguridad="false"  component={renderField} />
             <Field name="email" keyboardType="email-address" label="Email " seguridad="false" component={renderField}  />
            <Field name="password" keyboardType="default" label="Contraseña " seguridad="true" component={renderField}  />
            <Field name="first_name" keyboardType="default" label="Nombre " seguridad="false" component={renderField} />
            <Field name="last_name" keyboardType="default" label="Apellido " seguridad="false"  component={renderField} />
            <Field name="identification" keyboardType="numeric" label="Cedula " seguridad="false" component={renderField} />
            <Field name="phone" keyboardType="numeric" label="Celular " seguridad="false" component={renderField} />
            <Field name="province" keyboardType="default" label="Provincia " seguridad="false" component={renderField} />
            <Field name="city" keyboardType="default" label="Ciudad " seguridad="false" component={renderField}  />
            <Field name="sector" keyboardType="default" label="Sector " seguridad="false" component={renderField}  />
            </KeyboardAvoidingView>
            <TouchableOpacity onPress={handleSubmit(submit)} style={{ margin: 10, alignItems: 'center',width : '100%'}}>
                <Text style={{
                    backgroundColor: 'steelblue', color: 'white', fontSize: 20,
                    height: 50, width: "100%", textAlign: 'center', padding: 10
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
