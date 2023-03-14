import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios';
import './Account.css';

const Account = () => {
    return (
        <div className='Account'>
            <h1>Temporary for Profile Picture Placement</h1>
            <p>Name: </p>
        </div>

    );

}

const UserAccount = props => {
    // start a state varaible with a blank array
    const [data, setData] = useState([])
  
    // get the id of the animal this component is rendering... the useParams function will grab it from the URL
    const userID = useParams()
  
    // the following side-effect will only be called once on initial render
    useEffect(() => {
      // fetch some mock data about animals for sale
      // the id of the animal that was clicked on is passed as a part of the match field of the props
      console.log(`fetching animal id=${userID}...`)
      axios("https://my.api.mockaroo.com/account_mock_data.json?key=c5fab7e0")
        .then(response => {
          // extract the data from the server response
          setData(response.data)
        })
        .catch(err => {
          // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
          console.log(`Sorry, buster.  No more requests allowed today!`)
          console.error(err) // the server returned an error... probably too many requests... until we pay!
  
          // make some backup fake data
          const backupData = [
            {
              id: 2,
              title: "Numbat",
              country: "Russia",
              price: "$2.37",
              description:
                "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
            },
          ]
  
          setData(backupData[0])
        })
    }, [userID])
  
    const handleBuyButtonClick = e => {
      // placeholder... do something more interesting
      alert(`You clicked the button to buy the ${data.title}.`)
    }
  
  
    return (
      <div className="UserAccount">
        <h1>{data.title}</h1>
        <section className="main-content">
          <article className="user" key={data.id}>
            <div className="details">
              <address className="address">{data.country}</address>
              <strong className="price">{data.price}</strong>
              <p>{data.description}</p>
              <button className="buy-now" onClick={handleBuyButtonClick}>
                Buy now!
              </button>
            </div>
          </article>
        </section>
      </div>
    )
  }

export default Account