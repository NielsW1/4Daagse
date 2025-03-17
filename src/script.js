const requestBody = JSON.stringify({
  operationName: "GetRegistrationsForSale",
  variables: {
    id: "zRLhtOq7pOcB",
    tickets: null,
    limit: 10
  },
  query: `query GetRegistrationsForSale($id: ID!, $tickets: [String!], $limit: Int!) {
      event(id: $id) {
        id
        registrations_for_sale_count
        filtered_registrations_for_sale_count: registrations_for_sale_count(tickets: $tickets)
        sold_registrations_count
        tickets_for_resale {
          id
          title
          __typename
        }
        registrations_for_sale(tickets: $tickets, limit: $limit) {
          id
          ticket {
            id
            title
            __typename
          }
          start_time
          corral_name
          time_slot {
            id
            start_date
            start_time
            title
            multi_date
            __typename
          }
          promotion {
            id
            title
            __typename
          }
          resale {
            id
            available
            total_amount
            fee
            public_url
            public_token
            upgrades {
              id
              product {
                id
                title
                is_ticket_fee
                __typename
              }
              product_variant {
                id
                title
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
    }`
  });

chrome.alarms.onAlarm.addListener((alarm) => {
  requestTickets().then(res => handleResponse(res))
});

async function requestTickets() {
  let date = new Date().toJSON();
  console.log(`Fetching data at ${date}`)
  const response = await fetch('https://atleta.cc/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: requestBody,
  });
  if (response.status === 200) {
    const jsonResponse = await response.json();

    console.log(jsonResponse);
    return jsonResponse;
  } else {
    console.log(`Something went wrong fetching data: ${response.status}`)
  }
}

function handleResponse(response) {
  if (response.data.event.registrations_for_sale_count >= 0) {
    sendNotification()
  }
}

function sendNotification() {
  console.log("Sending notification")
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/logo.png",
    title: "4Daagse ticket beschikbaar!",
    message: "https://www.4daagse.nl/deelnemen/ticket-overdragen"
  });
}
