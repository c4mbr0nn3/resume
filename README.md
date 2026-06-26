# Astro Resume

This is my personal resume built with Astro and Tailwind CSS. It is hosted on Netlify and can be viewed [here](https://resume.francescozorzi.me/).

If you would like to use this as a template for your own resume, feel free to fork this repository and customize it to your liking.

The resume structure is based on the JSON Resume schema with markdown capabilities for project and work descriptions.

I only implemented the following sections of JSON Resume:

- Basics
- Work
- Education
- Skills
- Languages
- Projects

You can find the JSON Resume schema [here](https://jsonresume.org/schema/).

## Getting Started

1. Fork this repository
2. Clone the repository
3. Use Node 24 via `nvm use`
4. Install dependencies with `pnpm install`
5. Customize the resume data in `src/assets/resume.en.json`
6. Run the development server with `pnpm dev`
7. Build the project with `pnpm build`
8. Deploy the project to Netlify or your preferred hosting service

## License

Data in `src/assets/resume.en.json` and `src/assets/resume.it.json` is my personal data and should not be used without my permission.

Other than that, this project is open source and available under the [MIT License](LICENSE). Feel free to use this project as a template for your own resume.

## Acknowledgements

Thanks to [Nathan Friend](https://nathanfriend.io/) who inspired me with his project [Nuxt Résumé](https://gitlab.com/nfriend/nuxt-resume). I wanted to reproduce a similar look and feel without looking at the source code of his project, just a visual reference.
