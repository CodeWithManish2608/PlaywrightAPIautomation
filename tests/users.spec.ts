import { test, expect } from '@playwright/test';

test('GET - Fetch all users', async ({ request }) => {

    // 1. Send GET request
    const response = await request.get(
        'http://localhost:3000/users'
    );

    // 2. Verify status code
    expect(response.status()).toBe(200);

    // 3. Extract response body
    const responseBody = await response.json();

    // 4. Verify total users
    expect(responseBody).toHaveLength(2);

    // 5. Access first object
    console.log(responseBody[0].name);
 

    // 6. Access second object
    console.log(responseBody[1].name);

    // 7. Verify email
    expect(responseBody[0].email).toBe('manish@test.com');

});