import axios from "axios";

const token = 'fb5b3d9080d36e1e3eead4b0cebcb430b1c654b5';


export const saveForm = async (payload) => {

    console.log("payload", payload);

    // const response = await axios.post(`${API_URL}/api/loan/lead/create/`, payload, {
    //     headers: {
    //         token: `${token}`,
    //     },
    // }).then(res => res.data.data)
    // .catch(err => console.log(error))

    // return response;

}

export const saveEditedForm = async (payload) => {

    console.log("payload", payload);

    const response = await axios.post(`${API_URL}/api/loan/lead/create/`, payload, {
        headers: {
            token: `${token}`,
        },
    }).then(res => res.data.data)
    .catch(err => console.log(error))

    return response;

}