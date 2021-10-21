var axios = require("axios").default;

const CallAPI = async (optionalIP) => {
    const apiKey = process.env.REACT_APP_GEO_IPIFY_API_KEY;
    var options = {
        method: 'GET',
        url: `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`,
        params: {ipAddress: optionalIP},
    }

    const res = await axios.request(options)
        .then(function (response) {
                console.log(response.data.location)
                console.log("called api")
                return (response.data);
        }).catch(function (error) {
                console.error(error);
        });

    return res;
}

export default CallAPI;