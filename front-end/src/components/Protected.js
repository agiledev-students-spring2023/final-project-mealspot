import React, { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"

const Protected = props => {
  const jwtToken = localStorage.getItem("token") // the JWT token, if we have already received one and stored it in localStorage
  console.log(`JWT token: ${jwtToken}`) // debugging
  const authToken = 'jwt ' + jwtToken + ''
  console.log(`Auth token: ${authToken}`)

  axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/protected`, {
    headers: { Authorization: authToken }, // pass the token, if any, to the server
  })
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(
      "The server rejected the request for this protected resource... we probably do not have a valid JWT token."
    )
  })

  return (
    <>
    </>
  )
}

export default Protected