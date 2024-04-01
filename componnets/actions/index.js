import request from "./request";
import axios from "axios";
import {ToastAndroid} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
    return await AsyncStorage.getItem('userInfo')
        .then(response => {
            if (response) {
                try {
                    let data = JSON.parse(response);
                    return data.token
                } catch (e) {
                    ToastAndroid.show(er.message, 2000);
                }
            }
        })
}

export const getUserData = async () => {
    return await AsyncStorage.getItem('userInfo')
        .then(response => {
            if (response) {
                try {
                    return JSON.parse(response);
                } catch (e) {
                    ToastAndroid.show(er.message, 2000);

                }
            }
        })
}

export const getUserId = async () => {
    return await AsyncStorage.getItem('userInfo')
        .then(response => {
            if (response) {
                try {
                    let data = JSON.parse(response);
                    return data._id
                } catch (e) {
                    ToastAndroid.show(er.message, 2000);

                }
            }
        })
}
export const registration = (data) => {
    return request.post('api/register', data)
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            console.log(error)
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const loginUser = (data) => {
    return request.post('api/login', data)
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const getCareTakers = (token) => {
    return request.get('api/caretakers', {
        headers: {
            Authorization: token
        }
    })
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const getChildrens = (token, id) => {
    return request.get('api/children', {
        headers: {
            Authorization: token,
        },
        params: id
    })
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const getServices = (token, id) => {
    return request.get('api/services', {
        headers: {
            Authorization: token,
        },
    })
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const getBookingsRequest = (token, filter) => {
    return request.get('api/requestBooking', {
        headers: {
            Authorization: token,
        },
        params: filter
    })
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const acceptBookingStatus = (token, updateId) => {
    return request.put('api/requestBooking', {updateId: updateId, acceptStatus: true}, {
        headers: {
            Authorization: token,
        },
    })
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const getChildInfo = (token, data) => {
    return request.get('api/childInfo', {
        headers: {
            Authorization: token,
        },
        params: {data}
    })
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const addChildren = (token, data) => {
    return request.post('api/children', data, {
        headers: {
            Authorization: token
        }
    })
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const updateChildren = (token, data) => {
    return request.put('api/children', data, {
        headers: {
            Authorization: token
        }
    })
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}
export const updateRequestElements = (token, data, id) => {
    return request.put('api/updateRequest', data, {
        headers: {
            Authorization: token,
        },
        params: {
            _id: id
        }
    })
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const addBookingRequest = (token, data) => {
    return request.post('api/requestBooking', data, {
        headers: {
            Authorization: token
        }
    })
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}

export const uploadImage = (data) => {
    let {uri, name, type} = data;
    console.log(uri, name, type, "]]]]]]]]]]]]]]]]]]]")
    const formData = new FormData();

    formData.append('uri', uri); // Provide the file URI
    formData.append('type', type); // Optionally provide the file type


    return axios.post('http://192.168.0.110:5000/api/upload/attachment', {file: formData})
        .then(response => {
            if (response?.data?.success) {
                return response.data;
            } else {
                ToastAndroid.show("Something went wrong", 2000);
            }
        })
        .catch(error => {
            console.log(error)
            if (error?.response?.data?.data?.error?.message) {
                ToastAndroid.show(error.response.data.data.error.message, 2000);
            } else {
                ToastAndroid.show(error.message, 2000);
            }
        })
}
