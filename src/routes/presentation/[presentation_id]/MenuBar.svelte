<menu>
    <ul>
        <li>
            <button>File</button>
            <ul class="dropdown">
                <li><a href="#">New</a></li>
                <li><a href="#">Open</a></li>
                <li><a href="#">Download</a></li>
            </ul>
        </li>
        <li>
            <button>Edit</button>
            <ul class="dropdown">
                <li><a href="#">Undo</a></li>
                <li><a href="#">Redo</a></li>
                <li><a href="#">Cut</a></li>
                <li><a href="#">Copy</a></li>
                <li><a href="#">Paste</a></li>
                <li><a href="#">Delete</a></li>
            </ul>
        </li>
        <li>
            <button>Insert</button>
            <ul class="dropdown">
                <li><a href="#">Textbox</a></li>
                <li><a href="#">Image</a></li>
                <li><a href="#">Video</a></li>
                <li><a href="#">Audio</a></li>
                <li><a href="#">Shape</a></li>
            </ul>
        </li>
    </ul>
</menu>

<style lang="scss">
    menu {
        grid-area: menubar;
        display: block;
        margin: 0;
        padding: 0;
        background-color: green;

        ul {
            list-style: none;
            padding: 0;
            z-index: 1;
            > li {
                width: 100px;
                background-color: white;
                display: block;
                float: left;
                text-align: center;

                line-height: var(--menubar-height);
                
                display: flex;
                justify-content: stretch;
                align-items: stretch;
                button {
                    border: none;
                }
                button:focus + ul {
                    display: block;
                    visibility: visible;
                }
                > ul {
                    > li {
                        &:hover {
                            background-color: whitesmoke;
                        }
                    }
                }
            }
        }

        a {
            color: initial;
            text-decoration: none;
        }

        ul > li:hover li:hover {
            background-color: whitesmoke;
        }
    }

    li:hover {
        cursor: pointer;
    }

    ul li ul {
        visibility: hidden;
        position: relative;
        left: 0;
        display: none;
    }

    ul li ul li {
        clear: both;
        width: 100%;
    }
</style>
