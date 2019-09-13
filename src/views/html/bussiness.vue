<template lang="pug">
div
  nav.navbar.is-primary(role="navigation" aria-label="main navigation")
    .container
      .navbar-brand
        a.navbar-item
          img(src="https://bulma.io/images/bulma-logo.png")
        a.navbar-burger.burger(role="button" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample")
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")
          span(aria-hidden="true")
      .navbar-menu(id="navbarBasicExample")
        .navbar-start
          a.navbar-item Home
          a.navbar-item Services
          a.navbar-item About
          a.navbar-item Team
          a.navbar-item Contact
        .navbar-end
          .navbar-item.has-dropdown.is-hoverable
            a.navbar-link more
            .navbar-dropdown
              a.navbar-item English
              hr.navbar-divider
              a.navbar-item Vietnamese
  section.hero.is-light.is-bold
    .hero-body
      .container
        .columns
          .column
            figure.image.is-2by1
              img(src="@/assets/800x400.png")
          .column.has-text-left
            h1.title Company name
            h2.subtitle Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec ante eros.
            button.button.is-primary Readmore
            button.button.is-primary.is-outlined Contact us
</template>