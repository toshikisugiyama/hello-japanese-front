import React from 'react'
import Helmet from 'react-helmet'
import Navbar from './Navbar'
import Footer from './Footer'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Hello Japanese" />
    <Navbar />
    <div>{children}</div>
		<Footer />
  </div>
)

export default TemplateWrapper
