import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const StudentInfo = ({student}) => {
    const styles = StyleSheet.create({
        page: {
            background: 'white',
            paddingTop: '2cm',
            paddingBottom: '2cm',
            paddingLeft: '2cm',
            paddingRight: '2cm',
            backgroundColor: 'rgba(203, 218, 233, 0.438)'
          },
        view: {
            width: 'fit-content',
            padding: '0em 1em 2em',
            margin: '3em auto 1em',
            border: '1px solid black',
            outline: '3px solid black',
            outlineOffset: '5px',
          },
        header: {
          marginBottom: 20,
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          textDecoration: 'underline'
        },
        section: {
          flexDirection: 'row',
          marginBottom: 10,
        },
        label: {
          width: 150,
          fontWeight: 'bold',
          textTransform: 'uppercase',
        },
        value: {
          flex: 1,
        },
    });
    if(!student) {
        return <p>You cannot access this page</p>
    }
    return (
        <Document>
            <Page style={styles.page}>
                <View>
                    <Text style={styles.header}>Admit Card</Text>
                    <View style={styles.section}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{student.name}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>School:</Text>
                        <Text style={styles.value}>{student.school}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Class:</Text>
                        <Text style={styles.value}>{student.class}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Roll No.:</Text>
                        <Text style={styles.value}>{student.roll}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Phone No.:</Text>
                        <Text style={styles.value}>{student.phone}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.value}>{student.address}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default StudentInfo