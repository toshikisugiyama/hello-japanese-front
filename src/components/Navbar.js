import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import './Navbar.sass'

const initialToUpperCase = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
const Navbar = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(sort: { fields: wordpress_id }, limit: 5) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
			<header className="header">
				<nav className="head-navbar navbar">
					<div className="container">
						<div className="container-item">
							<Link to="/" className="container-item-title">
								<h1>Hello Japanese</h1>
							</Link>
						</div>
						<div className="container-item">
							{data.allWordpressPage.edges.map(edge => (
								<Link
									className="container-item-pages"
									to={edge.node.slug}
									key={edge.node.slug}
								>
									{initialToUpperCase(edge.node.slug)}
								</Link>
							))}
						</div>
					</div>
				</nav>
			</header>
    )}
  />
)

export default Navbar
