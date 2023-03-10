import { View, Text, Button, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import st from "./styles";


const ListProduct = (props) => {

    const [isLoading, setisLoading] = useState(true);
    const [dssp, setdssp] = useState([]);
    // viết hàm load SP
    const getListPro = async () => {
        let url_api = "https://63db6922a3ac95cec5a10e24.mockapi.io/demo-api/sanpham";
        try {
            const response = await fetch(url_api);
            const json = await response.json();
            // đổ dữ liệu vào state
            setdssp(json);

        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false);// trạng thái đã load xong
        }
    }
    const renderProduct = (row) => {

        const xoaSp = () => {
            let url_api = "https://63db6922a3ac95cec5a10e24.mockapi.io/demo-api/sanpham/" + row.item.id;
               
            fetch(url_api, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                
            })
                .then((res) => {
                    if (res.status == 200){
                        alert('Xóa thành công');
                        getListPro();
                    }
                        

                }).catch((err) => {
                    console.log(err);
                });
        }


        console.log(row);
        return (
            <View>
                <Text>Tên sp: {row.item.name}  -- giá {row.item.price}
                </Text>

                <Button title="Xóa" onPress={xoaSp} />


                <Button title="Sửa" onPress={ ()=>{
                    props.navigation.navigate('EditProduct',{item_sp:row.item})
                }} />

            </View>
        );
    }
    // gọi load dữ liệu
    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // do something
            getListPro();// gọi hàm load dữ liệu
        });

        return unsubscribe;
    }, [props.navigation]);


    return (
        <View style={st.khungDSSP} >
            <Text>Danh sách SP</Text>
            <Button title="Thêm SP"
                onPress={() => { props.navigation.navigate('AddProduct') }}
            />

            {
                (isLoading) ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList data={dssp}
                        keyExtractor={(item) => { return item.id; }}
                        renderItem={renderProduct} />
                )
            }



        </View>
    );
}

export default ListProduct;