<div>
    <menu>
        <label class="search">
            <i class="ph-bold ph-magnifying-glass" />
            <input type="search" placeholder="Search menus..." />
        </label>
    </menu>
</div>

<style lang="scss">
    div {
        box-sizing: border-box;
        grid-area: toolbar;
        padding: 10px;
    }
    menu {
        width: 100%;
        height: 100%;
        border-radius: 50px;
        background-color: rgb(237, 242, 250);
        box-sizing: border-box;
        display: flex;
        margin: 0;
        padding: 5px;
    }
    .search {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px;

        box-sizing: border-box;
        width: 150px;
        border: none;
        border-radius: 50px;
        background-color: white;

        cursor: text;
        &:focus-within {
            outline: auto;
        }

        i {
            font-size: 14px;
        }
        input[type="search"] {
            flex: 1;
            width: 100px;
            font-size: 13px;
            border: none;
            &:focus {
                border: none;
                outline: none;
            }
        }
    }
</style>
