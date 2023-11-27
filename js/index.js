import { InitializeTimer } from "./clock.js";//TODO: Not used. Delete?
import { updateDate } from "./date.js";

document.addEventListener("DOMContentLoaded", async function (event) {

    updateDate();
    let currentPageId = "";
    const MapPages =
    {
        // "home" : { fileName : "home-body.html"  , callback : function() {InitializeTimer();} }
        "home": { fileName: "home-body.html", callback: null }
        , "about": { fileName: "about-body.html", callback: null }
        , "word": { fileName: "word-body.html", callback: null }
        , "features": { fileName: "features-body.html", callback: null }
        , "downloads": { fileName: "downloads-body.html", callback: null }
    };

    async function ReRegisterLinks() {
        for (const key in MapPages) {
            let elem = document.getElementById(key + "-page");
            if (elem != null) {
                elem.addEventListener("click", function (e) {
                    LoadPage(key, true); // when clicked "home" in the menu.
                });
            }
        }
    }

    async function LoadPage(id, pushHistory) {
        if (id == currentPageId)
            return; // Don"t process request if on the same page.

        const content = await fetch(MapPages[id].fileName);

        gtag("event", "page_view", {
            // page_title: "<Page Title>",
            // page_location: "<Page Location>",
            page_path: "/" + id
            , send_to: "UA-132326144-1"
        });


        document.getElementById("hero-body").innerHTML = await content.text();
        currentPageId = id;
        if (pushHistory) {
            let historyToken = "";
            if (id != "home")
                historyToken = "#" + id;

            history.pushState(id, "hello world", historyToken);
        }


        if (MapPages[id].callback != null)
            MapPages[id].callback();

        window.scrollTo(0, 0);
        ReRegisterLinks();
    }

    window.onpopstate = function (event) {
        const pageID = event.state;
        if (pageID == null) {
            history.back();
        }
        else {
            LoadPage(pageID, false);
        }
    };


    function HideMenu() {
        var burger = document.querySelector(".burger");
        var menu = document.querySelector("#" + burger.dataset.target);
        burger.classList.remove("is-active");
        menu.classList.remove("is-active");
    }


    //     Load initial page from hash Url
    let StartPage = "home"; // default to home

    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        {
            for (let key in MapPages) {
                if (key == hash) {
                    StartPage = key;
                    break;
                }
            }
        }
    }


    await LoadPage(StartPage, true); // when document is ready load first page

    /*
    document.getElementById("downloads").addEventListener("click", function (e) {
        LoadPage("downloads", true); // when clicked "about" in the menu.
    });
    */


    /*
    document.getElementById("aboutPage").addEventListener("click", function (e) {
        LoadPage("about", true); // when clicked "about" in the menu.
    });

    document.getElementById("home-page").addEventListener("click", function (e) {
        LoadPage("home", true); // when clicked "home" in the menu.
    });
    */

    // The following code is based off a toggle menu by @Bradcomp
    // source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
    const burger = document.querySelector(".burger");
    const menu = document.querySelector("#" + burger.dataset.target);
    burger.addEventListener("click", function () {
        burger.classList.toggle("is-active");
        menu.classList.toggle("is-active");
    });

    // Hide menu if click anywhere on the navigation bar.
    document.getElementById("navbarMenu").addEventListener("click", function () {
        HideMenu();
    });
});