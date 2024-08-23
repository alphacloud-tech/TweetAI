const axios = require('axios');
require('dotenv').config();

exports.createNewTitle = async () => {
    try {
        const payload = { name: 'Miss', }

        const response = await axios.post(`${process.env.TEST_URL}/title/create`, payload);// Replace with the actual URL
        return response.data.data.id;

    } catch (error) {
        throw error;
    }
};


exports.createNewTitleForDelete = async () => {
    try {

        const payload = { name: 'Hon.', }

        const response = await axios.post(`${process.env.TEST_URL}/title/create`, payload);// Replace with the actual URL

        return response.data.data.id;
    } catch (error) {
        throw error;
    }
};


exports.createNewTitleForUpdate = async () => {
    try {

        const payload = { name: 'Ms', }

        const response = await axios.post(`${process.env.TEST_URL}/title/create`, payload);// Replace with the actual URL
        return response.data.data.id;

    } catch (error) {
        throw error;
    }
};



////////////////////////////////////////// start application //////////////////////////////////////////////////////////////////
exports.captureNewApplication = async () => {
    try {

        const payload = {
            court_id: 1,
            division_id: 1,
            purpose_id: 1,
            destination: London,
            country: 'United States',
            location: 'United States',
            from: '2023-12-01',
            to: '2023-12-31',
            detail: "medical issue",
            approved_by: 1,
            approval_date: '2023-12-11',
            status_id: 1,
            doc_url: 'http://'
        }

        const response = await axios.post(`${process.env.TEST_URL}/application/capture`, payload);// Replace with the actual URL
        return response.data.data.id;

    } catch (error) {
        throw error;
    }
};
////////////////////////////////////////// end application //////////////////////////////////////////////////////////////////
