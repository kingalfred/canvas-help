import Head from 'next/head'
import Link from 'next/link'

const Layout = ({ children, sidebarLinks }) => {
  return (
    <div className="wrapper">
      <Head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" defer></script>
      </Head>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/">
          <a className="navbar-brand">
            Canvas Help
          </a>
        </Link>
      </nav>

      <div className="content">
        {sidebarLinks && (
          <div className="sidebar">
            {sidebarLinks.map(link => (
              <Link href={link.href}>
                <a>{link.label}</a>
              </Link>
            ))}
          </div>
        )}

        <div className="container">
          {children}
        </div>
      </div>

      <div className="container mt-5">
      <footer className="p-3 pt-4 text-center border-top">
        <p>Copyright (c) 2020 King Alfred School</p>
      </footer>
      </div>
    </div>
  )
}

export default Layout