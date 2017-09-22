import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Page404 extends Component {

  render() {
    return (
        <div className="page-one-column">
          <div className="post-detail-right">
            <h3>Content not found</h3>
            <Link to="/">back to home page</Link>
          </div>
        </div>
    )
  }
}


export default Page404
