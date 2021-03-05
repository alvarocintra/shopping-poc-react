// import { GraphQLClient, gql } from 'graphql-request'
import logo from "./logo.svg";
import "./App.css";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// require("isomorphic-fetch");
//https://shopping-apiman-dev.azure-api.net/graphql
//https://shopping-graphql.azurewebsites.net/graphql

// async function Teste() {
//   const endpoint = 'https://shopping-apiman-dev.azure-api.net/graphql'

//   const graphQLClient = new GraphQLClient(endpoint, {
//     headers: {
//       'Ocp-Apim-Subscription-Key': 'adfb9221597a425ebfa843a4e60ce6f9',
//     },
//   })

//   const mutation = gql`
//     mutation($person: personInput!){
//       createPerson(person: $person){
//         id,
//         firstName,
//         lastName,
//         age,
//         createdAt
//       }
//     }
//   `

//   const variables = {
//     person: {
//       firstName: 'Josxe11',
//       lastName: 'Silvxa22',
//       age: '4423'
//     }
//   }

//   const data = await graphQLClient.request(mutation, variables)
//   console.log(JSON.stringify(data, undefined, 2))
// }

const client = new ApolloClient({
  uri: 'https://shopping-graphql.azurewebsites.net/graphql',
  cache: new InMemoryCache(),
  headers: {
    'Ocp-Apim-Subscription-Key': 'adfb9221597a425ebfa843a4e60ce6f9'
  }
});

export const Get = async () => {
  let data;

  await client.query({
    query: gql(`
      query{
        persons{
          id,
          firstName,
          lastName,
          age,
          createdAt
        }
      }`
    )
  })
  .then(result => {
    console.log(result)
    data = result
    console.log(data)
    return (
      <ul>
        { data.data.persons.map((person, i) => (
          <li key={person.id}>{person.firstName}</li>
        ))}
      </ul>
    )
  })
  .catch(e => console.error(e))
}

export const Post = async () => {
  let data;

  const mutation = gql(`
    query{
      mutation($person: personInput!){
        createPerson(person: $person){
          id,
          firstName,
          lastName,
          age,
          createdAt
        }
      }
    },
    variables {
      person: {
        firstName: 'Josxe11',
        lastName: 'Silvxa22',
        age: '4423'
      }
    }
  `)

  const variables = {
    person: {
      firstName: 'Josxe11',
      lastName: 'Silvxa22',
      age: '4423'
    }
  }

  await client.query({
    query: mutation
  })
  .then(result => {
    console.log(result)
    data = result
    console.log(data)
    return (
      <ul>
        { data.data.persons.map((person, i) => (
          <li key={person.id}>{person.firstName}</li>
        ))}
      </ul>
    )
  })
  .catch(e => console.error(e))
}



// Teste().catch((error) => console.error(error))

// function Teste() {
//   fetch("https://shopping-graphql.azurewebsites.net/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Ocp-Apim-Subscription-Key": "adfb9221597a425ebfa843a4e60ce6f9",
//       'Access-Control-Allow-Origin': '*'
//     },
//     body: JSON.stringify({
//       query: `
//       mutation($person: personInput!){
//         createPerson(person: $person){
//           id,
//           firstName,
//           lastName,
//           age,
//           createdAt
//         }
//       }`,
//       variables: {
//         person: {
//           firstName: "asd123",
//           lastName: "321dsa",
//           age: "33",
//         },
//       },
//     }),
//   })
//     .then((res) => console.log(res.json()))
//     .then((res) => console.log(res));
// }

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" onClick={Get}>Get Persons</button>
        <button type="button" onClick={Post}>Post Person</button>
      </header>
    </div>
  );
}

class Square extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}

export default App;
