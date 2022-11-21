// we want to immediately grab all the links on the page that have a pre-chosen data element and then do the magic on them.
var AutoSpa = function () {
    // all the links that are meant to work with auto-spa
    // will have an attribute:
    // data-auto-link: boolean
    // the code will grab the hrefs of those links and fetch those pages
    // it will then place the pages in the dom inside the container with the id
    // that is signaled with the attribute
    // data-auto-target: string
    // when the new page is loading, there will be a loading element rendered
    // in a container with the attribute data-auto-loading
    // the user creates this container.
    var allAutoLinks = document.querySelectorAll('a[data-auto-link]');
    var handleLinkFire = function (e) {
        e.preventDefault();
        var targetContainer = document.getElementById(e.target.dataset["data-auto-target"]);
        if (e.target.href) {
            fetch(e.target.href)
                .then(function (res) { return res.json(); })
                .then(function (data) {
                return targetContainer.textContent ? targetContainer.textContent = data : null;
            })["catch"](function (err) { return console.log(err); });
        }
        // get the url at the href and then hoist it into the target container
        // while the page is loading, show the loading indicator in the
        // data-auto-loading container
    };
    allAutoLinks.forEach(function (link) { return link.addEventListener("click", function (e) { return handleLinkFire(e); }); });
};
document.addEventListener("DOMContentLoaded", AutoSpa);
