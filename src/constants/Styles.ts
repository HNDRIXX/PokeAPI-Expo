import { StyleSheet, ViewStyle } from 'react-native';
import Colors from './Colors';

const Main = StyleSheet.create({
    darkContainer: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },

    roundBorder: {
        borderRadius: 20, 
        overflow: 'hidden'
    },

    alignJustify: {
        alignItems: 'center', 
        justifyContent: 'center',
    },

    alignCenter: { alignItems: 'center' },

    flexRow: { flexDirection: 'row' },

    // Text
    textWhiteCenter: {
        color: '#fff',
        textAlign: 'center'
    },

    textWhiteCapitalize: {
        textTransform: 'capitalize', 
        color: '#fff',
    },
});

const CardStyle = StyleSheet.create({
    // Pokemon Card Item
    button: {
        width: 170, 
        padding: 20, 
        margin: 10, 
        backgroundColor: '#202020',
    },

    container: {
        width: 80,
        backgroundColor: '#646464', 
        paddingVertical: 6,
        // gap: 10
    },

    imageBadge: {
        width: 20, 
        height: 20,
        marginRight: 5
    },

    imageCard: {
        width: 100, 
        height: 100, 
        marginVertical: 10 
    },

    imageType: {
        width: 65, 
        height: 15, 
        margin: 5, 
        borderRadius: 5, 
        overflow: 'hidden' 
    },

    textName:{
        marginBottom: 10
    },
});

const StyleDetails = StyleSheet.create({
    container: {
        ...Main.darkContainer,
        paddingVertical: 20,
        flex: 1,
    },

    wrapper: {
        ...Main.roundBorder,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        backgroundColor: Colors.dark.gray,
    },

    contentWrapper: {
        ...Main.alignCenter,
        ...Main.roundBorder,
        backgroundColor: '#202020', 
        width: '100%', 
        padding: 15, 
        marginBottom: 15
    },

    typeContainer: {
        marginBottom: 10,
    },

    abilitiesContainer: {
        alignItems: 'flex-start', 
        width: '100%',
        // gap: 10,
        marginBottom: 15,
    },

    typeWrapper: {
        ...Main.flexRow,
    },

    twoColContainer: {
        flexDirection: "row", 
        flexWrap: "wrap"
    },

    twoColWrapper: {
        width: '50%', 
        padding: 5 
    },

    imagePokemon: {
        width: 250, 
        height: 250, 
        marginVertical: 10,
    },

    imageType:{
        marginHorizontal: 5,
        width: 90,
        height: 30,
        borderRadius: 5,
        overflow: 'hidden'
    },

    textName:{
        ...Main.textWhiteCapitalize, 
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },

    textTitleType: {
        textAlign: 'left', 
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
        color: '#fff',
    },

    textValue: {
        ...Main.textWhiteCapitalize,
        fontSize: 16,
        fontWeight: 'bold',
    },

    textFlavor:{
        ...Main.textWhiteCapitalize,
        ...Main.textWhiteCenter,
        fontStyle: 'italic',
        marginVertical: 15,
    },

    textAbilities: {
        ...Main.roundBorder,
        ...Main.textWhiteCapitalize, 
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderColor: Colors.light.icon,
        borderWidth: 1,
        marginBottom: 10,
    },

    textGapColumn: {
        ...Main.textWhiteCapitalize,
        fontSize: 13,
        marginBottom: 2
    }
});

const StyleBadge = StyleSheet.create({
    container: {
        ...CardStyle.container,
        ...Main.alignJustify,
        ...Main.flexRow,
        ...Main.roundBorder,
    },
});

export default { Main, CardStyle, StyleDetails, StyleBadge };
