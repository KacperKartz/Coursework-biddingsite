import React from 'react'
import { useRouteError } from 'react-router-dom'



const ErrorPage = () => {
  const error = useRouteError();

  if (error.status === 404){
    return(
      <>
        <h1>Error page not found</h1>
      </>
    )
  }


  return (
    <div>

    </div>
  )
}

export default ErrorPage