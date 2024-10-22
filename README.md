<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a id="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">💸 Fincheck</h3>
  <p align="center">
    A simple and complete platform for your financial management
    <br />
    <br />
    <a href="https://github.com/nicolasteofilo/fincheck">View Demo</a>
    ·
    <a href="https://github.com/nicolasteofilo/fincheck/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/nicolasteofilo/fincheck/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

Fincheck is a modern and complete platform that will help you organize your finances in an uncomplicated way!

![Home Page](/.github/images/homepage.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

#### Front-end

- [![Vite][Vite]][Vite-url]
- [![React][React.js]][React-url]
- [![ReactQuery][ReactQuery]][ReactQuery-url]
- [![Tailwindcss][Tailwindcss]][Tailwindcss-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started
To get a local copy and run it, follow these simple steps.

### Prerequisites
1. First make sure you have npm and yarn:
```sh
npm install yarn@latest -g
```

2. Clone the repo
```sh
git clone https://github.com/nicolasteofilo/fincheck
```

### Database
You can choose to use the database manually installed, but here we will follow using docker.

First, we must create a PostgreSQL database with docker:

```sh
docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
```

Don't forget to change the creation variables and save them for later use.

### API
Now, let's run the API to be consumed by our client later.

1. Inside the project folder, go to the API folder
```sh
cd api
```

2. Now, let's install the dependencies
```sh
yarn
```

3. Inserting environment variables
```sh
touch .env
```

Enter the following environment variables:
`JWT_SECRET`
`DATABASE_URL`
`PORT`

Eaxample:
```bash
  JWT_SECRET="supersecretjwt"
  DATABASE_URL="postgresql://root:root@localhost:5432/fincheck"
  PORT=3333
```

4. With the database and environment variables configured, we must now run the migrations, in this case it will be done with Prisma:
```sh
npx prisma migrate dev
```

5. Running the API
```sh
yarn start:dev
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

<!-- ROADMAP -->


### Client
With the API configured, let's configure and run the front-end

1. Inside the project folder, go to the front-end folder
```sh
cd frontend
```

2. Now, let's install the dependencies
```sh
yarn
```

3. Inserting environment variables
```sh
touch .env
```

Enter the following environment variables:
`VITE_API_URL`

Eaxample:
```bash
VITE_API_URL = "http://localhost:3333"
```

5. Running the front-end
```sh
yarn dev
```

## Roadmap

- [x] Create a account in application
- [x] Log in to the application with an account
- [ ] Transactions
  - [x] Create transaction
  - [x] List transaction
  - [x] Edit transaction
  - [x] Delete transaction
- [ ] Bank Accounts
  - [x] Create bank account with initial balance
  - [x] Edit bank account
  - [x] Delete bank account
- [ ] Filters
  - [x] Filter transaction by bank account
  - [x] Filter transaction by month and year
  - [x] Filter transaction by month and year


See the [open issues](https://github.com/nicolasteofilo/fincheck/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/nicolasteofilo/fincheck/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nicolasteofilo/fincheck" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Nicolas Teófilo - nicolasteofilodecastro@gmail.com

Project Link: [https://github.com/nicolasteofilo/fincheck](https://github.com/nicolasteofilo/fincheck)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/nicolasteofilo/fincheck.svg?style=for-the-badge
[contributors-url]: https://github.com/nicolasteofilo/fincheck/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nicolasteofilo/fincheck.svg?style=for-the-badge
[forks-url]: https://github.com/nicolasteofilo/fincheck/network/members
[stars-shield]: https://img.shields.io/github/stars/nicolasteofilo/fincheck.svg?style=for-the-badge
[stars-url]: https://github.com/nicolasteofilo/fincheck/stargazers
[issues-shield]: https://img.shields.io/github/issues/nicolasteofilo/fincheck.svg?style=for-the-badge
[issues-url]: https://github.com/nicolasteofilo/fincheck/issues
[license-shield]: https://img.shields.io/github/license/nicolasteofilo/fincheck.svg?style=for-the-badge
[license-url]: https://github.com/nicolasteofilo/fincheck/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/nicolasteofilo
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwindcss]: https://img.shields.io/badge/TailwindCSS-20232A?style=for-the-badge&logo=tailwindcss&logoColor=61DAFB
[Tailwindcss-url]: https://tailwindcss.com/
[ReactQuery]: https://img.shields.io/badge/ReactQuery-20232A?style=for-the-badge&logo=react%20query&logoColor=61DAFB
[ReactQuery-url]: https://tanstack.com/query/latest/docs/framework/react/overview
[Vite]: https://img.shields.io/badge/Vite-20232A?style=for-the-badge&logo=vite&logoColor=61DAFB
[Vite-url]: https://vite.dev/
