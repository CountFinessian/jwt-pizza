import { sleep, check, group, fail } from 'k6'
import http from 'k6/http'

export const options = {
  cloud: {
    distribution: { 'amazon:us:ashburn': { loadZone: 'amazon:us:ashburn', percent: 100 } },
    apm: [],
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: 'ramping-vus',
      gracefulStop: '30s',
      stages: [
        { target: 5, duration: '30s' },
        { target: 15, duration: '1m' },
        { target: 10, duration: '30s' },
        { target: 10, duration: '30s' },
      ],
      gracefulRampDown: '10s',
      exec: 'scenario_1',
    },
  },
}

export function scenario_1() {
  // Create a vars object to store dynamic variables
  const vars = {};

  group('page_1 - https://pizza.cs329.click/', function () {
    let response

    // Initial page load
    response = http.get('https://pizza.cs329.click/', {
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
      },
    })
    sleep(5.5)

    // Login request
    response = http.put(
      'https://pizza-service.cs329.click/api/auth',
      '{"email":"jawoba004@gmail.com","password":"D3cember!"}',
      {
        headers: {
          'content-type': 'application/json',
          origin: 'https://pizza.cs329.click',
        },
      }
    )
    
    // Check login response
    if (!check(response, { 
      'login status equals 200': response => response.status === 200,
      'login response has token': response => {
        // Store the auth token
        vars.authToken = response.json().token
        return vars.authToken !== undefined
      }
    })) {
      fail('Login failed or no token received')
    }
    sleep(8.7)

    // Get menu with authorization
    response = http.get('https://pizza-service.cs329.click/api/order/menu', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${vars.authToken}`,
        'content-type': 'application/json',
        origin: 'https://pizza.cs329.click',
      },
    })
    
    // Check menu request
    check(response, { 
      'menu status equals 200': response => response.status === 200 
    })

    // Get franchise information
    response = http.get('https://pizza-service.cs329.click/api/franchise', {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${vars.authToken}`,
        'content-type': 'application/json',
        origin: 'https://pizza.cs329.click',
      },
    })
    sleep(7)

    // Place order
    response = http.post(
      'https://pizza-service.cs329.click/api/order',
      '{"items":[{"menuId":1,"description":"Veggie","price":0.0038}],"storeId":"1","franchiseId":1}',
      {
        headers: {
          accept: '*/*',
          authorization: `Bearer ${vars.authToken}`,
          'content-type': 'application/json',
          origin: 'https://pizza.cs329.click',
        },
      }
    )
    
    // Check order placement
    if (!check(response, { 
      'order status equals 200': response => response.status === 200,
      'order response has JWT': response => {
        // Store the order JWT for verification
        vars.orderJWT = response.json().jwt
        return vars.orderJWT !== undefined
      }
    })) {
      fail('Order placement failed or no JWT received')
    }
    sleep(42)

    // Verify order
    response = http.post(
      'https://pizza-factory.cs329.click/api/order/verify',
      JSON.stringify({ jwt: vars.orderJWT }),
      {
        headers: {
          accept: '*/*',
          'content-type': 'application/json',
          origin: 'https://pizza.cs329.click',
        },
      }
    )
    
    // Check order verification
    check(response, { 
      'verify status equals 200': response => response.status === 200 
    })
  })
}