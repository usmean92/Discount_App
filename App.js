import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataTable } from 'react-native-paper';




function Saved ({route, navigation }) {
  
 var data = route.params.list;
 const [getList,setList] = useState(data); 
const removeData =(key)=>{

  data=data.filter(item=>item.key!=key)
  setList(data);
}


const clear =()=>{

var key=-1;
  data=data.filter(item=>item.key==key)
  setList(data);
}
  return (

    <View style={styles.Records,{backgroundColor:'white'}}>

    <DataTable>
    <DataTable.Header>
      <DataTable.Title numeric >Options</DataTable.Title>
      <DataTable.Title numeric >Original</DataTable.Title>
      <DataTable.Title numeric >Discount</DataTable.Title>
      <DataTable.Title numeric> Final Price</DataTable.Title>
    </DataTable.Header>

    
    {
    getList.map((item) => (
      <DataTable.Row>
        <DataTable.Cell numeric>
        <TouchableOpacity
        style={{backgroundColor:'#696969', padding:7}}
        onPress={()=>removeData(item.key)}
        >
        <Text style={{color:'white'}}>Remove</Text>
        </TouchableOpacity>
        </DataTable.Cell>
        <DataTable.Cell numeric>{item.orgP}</DataTable.Cell>
        <DataTable.Cell numeric>{item.disP}</DataTable.Cell>
        <DataTable.Cell numeric>{item.price}</DataTable.Cell>

        
      </DataTable.Row>
      
    ))
  }
  </DataTable> 
  <View style={{flexDirection:'row'}}>
  <TouchableOpacity
      onPress={clear}
      style={styles.Btn}
      >
      <Text style={{color:'white'}}>Clear Saved</Text>
      </TouchableOpacity>
       <TouchableOpacity
      onPress={() => navigation.navigate('Home', {
            dataList:getList
          })
          }
      style={styles.Btn}
      >
      <Text style={{color:'white'}}>Go Back</Text>
      </TouchableOpacity>
      </View>
</View>
  );
}

function App1({route, navigation }) {
  const [InputText1, setInputText1] = useState("");
  const [InputText2, setInputText2] = useState("");
  const [Msg, setMsg] = useState([]);
  const [original, setOriginal] = useState(0);

  const [discountt, setDisocunt] = useState(0);
const [Value, setValue] = useState(0);
const [discountedPrice, setDiscountedPrice] = useState(0);
const [getItemsList,setItemsList] = useState([]);
const [getcounter, setCounter] = useState(0);





  navigation.setOptions({
      headerRight: () => (
        
        <TouchableOpacity
           onPress={() => {
            navigation.navigate('Saved', {
            list:getItemsList})
            setCounter(0);
            }
          }
          style={styles.Btn}
      >
      <Text style={{color:'white'}}>Saved Record</Text>
      </TouchableOpacity>
      ),
    });

 if(route.params!=null){
   
 const {dataList}=route.params;
if(getcounter==0){
  setCounter(-1);
if(dataList.length==0){
  var key=-11111;
  setItemsList(getItemsList.filter(item=>item.key==key))
}else{

for(var i=0; i<getItemsList.length;i++){
  var flag=0;

  for(var j=0; j<dataList.length;j++){
    if((getItemsList[i].orgP==dataList[j].orgP)&&(getItemsList[i].disP==dataList[j].disP)){
      flag+=1;
    }
}
 
if(flag==0){
  setItemsList(getItemsList.filter(item=>item.key!=getItemsList[i].key))
}
}

}
 }
 
  
 }






  function PriceValidation(text){
  if(text<0){
    setMsg((Msg) => {
                Msg[0] = "Price should be a positive number."
                return Msg;
            });
    setOriginal(0);
    setDiscountedPrice("null");
  }else{
    setOriginal(text);
    setInputText1(text);
     setMsg((Msg) => {
                Msg[0] = ""
                return Msg;
            });
  }

}
function Discount (){
if(original ==0 ){
  setDiscountedPrice("null");
  setValue("null");
}else{
 var dis = original * (discountt/100);
 dis=dis.toFixed(2);
 setValue(dis);
 var priceFinal=original - dis;
 priceFinal=priceFinal.toFixed(2);
 setDiscountedPrice(priceFinal);
}
}
const AddData = () => {

  var flag=0;
  for (var i=0; i<getItemsList.length;i++){
  
       if(getItemsList[i].orgP == original && getItemsList[i].disP == discountt){
          flag++;
       }
  }

  if(flag>0){
    alert("Record Existed in History. Change field values.")
  }else{
    
    setItemsList([...getItemsList,{orgP:original,disP:discountt,price:discountedPrice}]);
    alert("Record Saved.");
    }
    
}
function Validation(t){
  if(t>100){

    setMsg((Msg) => {
                Msg[1] = "Discount Value should not be greater then 100"
                return Msg;
            });
    setDisocunt(0);
  }else{
    setDisocunt(t);
    setInputText2(t);
    setMsg((Msg) => {
                Msg[1] = ""
                return Msg;
            });
  }
}
useEffect(() =>{
  Discount();
})


  return (
    <View style={styles.container}>
      <View style={{flex:1, flexDirection:"row",justifyContent:'center',alignItems:'center'}}>
      <Text  style={styles.Text}>Original Price</Text>
      <TextInput 
      keyboardType = 'number-pad'
      style={styles.Field}
      placeholder='Enter value'
      value={InputText1}
      onChangeText={text => PriceValidation(text)}
      />
      <Text style={{fontSize:15, color:'red'}}>{Msg[0]}</Text>
      </View>

      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{flex:1, flexDirection:"row",justifyContent:'center',alignItems:'center'}}>
      <Text  style={styles.Text}>Discount</Text>
      <TextInput 
      keyboardType = 'number-pad'
      style={styles.Field}
      placeholder='Enter value'
      value={InputText2}
      onChangeText={text => Validation(text)}
      />
      <Text style={{fontSize:15, color:'red', margin:5}}>{Msg[1]}</Text>
      </View>
      <Text style={styles.Text}>Total Amount Saved: {Value}</Text>
      </View>
      
      <View style={{flex:1, flexDirection:"row",justifyContent:'center',alignItems:'center'}}>    
      <Text  style={styles.Text}>Discounted Price</Text>
      <Text style={{ fontSize:15,paddingRight:10}}> : {discountedPrice}</Text>
      </View>
      <View style={{flex:1, flexDirection:"row",justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity
      onPress={AddData}
      disabled={(discountt==0) && (original==0)}
      style={styles.Btn}
      >
      <Text style={{color:'white'}}>Save</Text>
      </TouchableOpacity>
      </View>
      
    </View>
  );
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen
          name="Home"
          component={App1}
          options={({ navigation, route }) => ({
             title:'Home',
             headerStyle:{
               height:100,

             }
          })}
        />
        <Stack.Screen
          name="Saved"
          component={Saved}
          options={({ navigation, route }) => ({
           title:'History of Records',
           headerLeft:null
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    padding: 8
    // ,alignItems:"center"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Field: {
    marginHorizontal:20,
    borderWidth:2,
    borderRadius:10/2,
    width:'50%',
    height:'10%',
    padding:25,
    borderColor:'grey'
  },
  Text: {
    color:'grey',
    fontSize:15,
    
  },
  discountedPCont:{
    flexDirection:'row',
    marginTop:-10,
    borderWidth:2,
    width:'75%',
    borderColor:'#742F2F',
    
  },
  discountedPText :{
    padding:10,
    fontSize:20,
    fontWeight:'bold',
    color:'#434747'
  },
  Btn :{
    marginHorizontal:10,
    backgroundColor:'#696969',
    justifyContent:'center',
    alignItems:'center',
    width:'50%',
    padding:10,
  },
});
export default App;
