//import './styles.css'

// Menu data structure
// var menuLinks = [
//   { text: "about", href: "/about" },
//   { text: "catalog", href: "/catalog" },
//   { text: "orders", href: "/orders" },
//   { text: "account", href: "/account" },
// ];

//updated menuLinks array as per the RLAB
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

//Select and cache the <main> element in a variable named mainEl
const mainEl = document.querySelector("main");

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property
mainEl.style.backgroundColor = "var(--main-bg)";

// Set the content of mainEl to <h1>DOM Manipulation</h1>
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";

// Add a class of flex-ctr to mainEl
mainEl.classList.add("flex-ctr");

// PART 2

// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl
const topMenuEl = document.querySelector("#top-menu");

// Set the height of the topMenuEl element to be 100%
topMenuEl.style.height = "100%";

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

// Add a class of flex-around to topMenuEl
topMenuEl.classList.add("flex-around");

// Assuming you have a DOM element with id "topMenu" where you want to append the menu items
// Iterate over the menuLinks array

menuLinks.forEach(function (link) {
  // Create a new <a> element
  var linkElement = document.createElement("a");

  // Set the href attribute
  linkElement.setAttribute("href", link.href);

  // Set the content (text) of the link
  linkElement.textContent = link.text;

  // Append the new <a> element to the topMenuEl element
  topMenuEl.appendChild(linkElement);
});


// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl
const subMenuEl = document.querySelector("#sub-menu");

// Set the height of the subMenuEl element to be 100%
subMenuEl.style.height = "100%";

// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

// Add a class of flex-around to subMenuEl
subMenuEl.classList.add("flex-around");

//RLAB Part 1.1
// Set the CSS position property of subMenuEl to the value of absolute

subMenuEl.style.position = "absolute";

// Set the CSS top property of subMenuEl to the value of 0
subMenuEl.style.top = "0";

// Helper function to build the submenu
function buildSubmenu(subLinks) {
  // Clear the current contents of subMenuEl
  subMenuEl.innerHTML = "";
  
  // If subLinks is not provided or is empty, return
  if (!subLinks || subLinks.length === 0) {
    return;
  }
  console.log(subLinks)
  // Iterate over the subLinks array
  subLinks.forEach(function(link) {
    // Create an <a> element
    var subLinkElement = document.createElement("a");

    // Add an href attribute to the <a>, with the value set by the href property of the "link" object
    subLinkElement.setAttribute("href", link.href);

    // Set the element's content to the value of the text property of the "link" object
    subLinkElement.textContent = link.text;

    // Append the new element to the subMenuEl
    subMenuEl.appendChild(subLinkElement);
    console.log(subMenuEl)
  });
}

// Attach a delegated 'click' event listener to topMenuEl
const topMenuLinks = topMenuEl.querySelectorAll("a");

topMenuEl.addEventListener("click", function (event) {
  // Call the event object's preventDefault() method
  event.preventDefault();

  // Immediately return if the element clicked was not an <a> element
  if (!event.target.matches("a")) return;

  // Toggle the "active" class on the clicked <a> element
  event.target.classList.toggle("active");

  // Remove the "active" class from each other <a> element in topMenuLinks
  topMenuLinks.forEach(function (link) {
    if (link !== event.target) {
      link.classList.remove("active");
      console.log("Actived removed");
    }
  });

  // Cache the "link" object for the clicked <a> element
  const clickedLink = menuLinks.find(
    (link) => link.text === event.target.textContent
  );
  
  // Show or hide the submenu depending on the menu state

  console.log(clickedLink)
  if (!event.target.classList.contains("active")) {
    if (clickedLink.subLinks) {
      console.log(clickedLink.subLinks);
      subMenuEl.style.top = "100%";
    } else {
      subMenuEl.style.top = "0";
      //console.log(clickedLink.subLinks);
    }
  } else {
    subMenuEl.style.top = "0";
  }

  // Build the submenu based on the clicked link's subLinks
  buildSubmenu(clickedLink.subLinks);
});

  // Attach a delegated 'click' event listener to subMenuEl
subMenuEl.addEventListener("click", function(event) {
  // Call the event object's preventDefault() method
  event.preventDefault();
  
  // Immediately return if the element clicked was not an <a> element
  if (!event.target.matches("a")) return;

  // Log the content of the <a> element to verify the handler is working
  console.log(event.target.textContent);

  // Set the CSS top property of subMenuEl to 0
  subMenuEl.style.top = "0";

  // Remove the "active" class from each <a> element in topMenuLinks
  topMenuLinks.forEach(link => {
    link.classList.remove("active");
  });

  // Update the contents of mainEl to the contents of the <a> element clicked within subMenuEl
  mainEl.innerHTML = "<h1>" + event.target.textContent + "</h1>";
});

