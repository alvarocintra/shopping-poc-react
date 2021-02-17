import { GraphQLClient, gql } from 'graphql-request'

let result;

async function main() {
  const endpoint = 'https://shopping-apiman-dev.azure-api.net/graphql'

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'Ocp-Apim-Subscription-Key': 'adfb9221597a425ebfa843a4e60ce6f9',
    },
  })

  const mutation = gql`
    mutation($person: personInput!){
      createPerson(person: $person){
        id,
        firstName,
        lastName,
        age,
        createdAt
      }
    }
  `

  const variables = {
    person: {
      firstName: 'Josxe11',
      lastName: 'Silvxa22',
      age: '4423'
    }
  }

  const data = await graphQLClient.request(mutation, variables)
  console.log(JSON.stringify(data, undefined, 2))
  result = JSON.stringify(data, undefined, 2)
}

main().catch((error) => console.error(error))

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {result}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
