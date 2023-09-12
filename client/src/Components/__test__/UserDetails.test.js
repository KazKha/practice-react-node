

import { SingleUserDetails } from '../../helper/Constacts';
import UserDetails from '../UserDetails';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';



describe('userDetails', () => {

    it('userDetails with JWT APi ', async () => {

        const mock = new MockAdapter(axios);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGlhbmUgTXVycGh5IiwiZW1haWwiOiJrYXpraGFAZ21haWwuY29tIiwiZW1wQ29kZSI6MTAwMiwiaWF0IjoxNjk0NTE4Njk4LCJleHAiOjE2OTQ1MTk4OTh9.N3zVbeyZrKBQO4DMmJDLIH2RwwMSBUciVj0LHxi9tbs';

        const postData = {
            "getDataOf": "1076"
        };

        
        // Mock the POST request with JWT token
        mock.onPost(SingleUserDetails , postData, { headers: { Authorization: `Bearer ${token}` } }).reply(200, { data: 'Mocked data' });

        // Call the API function with the token and data
        const result = await UserDetails(token, postData);

        expect(result).toEqual({ data: 'Mocked data' });


    });

});
