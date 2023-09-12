import { ListOfUser } from '../../helper/Constacts';
import UserListing from '../UserListing';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';



test('UserListing', () => {
    
    it('userLisiting with JWT APi ', async () => {
        const mock = new MockAdapter(axios);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGlhbmUgTXVycGh5IiwiZW1haWwiOiJrYXpraGFAZ21haWwuY29tIiwiZW1wQ29kZSI6MTAwMiwiaWF0IjoxNjk0NTE2NTEzLCJleHAiOjE2OTQ1MTc3MTN9.9p6oi_rdgl_uJdUxUuj-Ljnvift9aZo2bJ6Hn-cgZsw';


        mock.onGet(ListOfUser, { headers: { Authorization: `Bearer ${token}` } }).reply(200, { data: 'Mocked data' });

        // Call the API function with the token
        const result = await UserListing(token);
    
        expect(result).toEqual({ data: 'Mocked data' });

    });

});
