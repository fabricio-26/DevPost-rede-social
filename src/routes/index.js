import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { AuthContenxt } from '../contexts/auth';

export default function Routes() {
    const { signed } = useContext(AuthContenxt)
    const loading = false;

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <ActivityIndicator size={50} color="#e52246" />
            </View>
        )
    }

    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    );


}