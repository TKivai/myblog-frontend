function HeaderBar () {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary" style={{width: "100%"}}>
            <div class="container-fluid">      
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/">HOME</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link active" href="/posts">View Posts</a>
                        </li>
                    </ul>
                    <a class="nav-link active" aria-current="page" href="/users/login" style={{color: "white"}}>Login</a>
                    <a class="nav-link active" aria-current="page" href="/users/register" style={{color: "white"}}>Register</a>
                    <form action="/users/logout" method="post">
                        <button class="btn btn-danger" type="submit">Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default HeaderBar;