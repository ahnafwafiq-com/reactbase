# **ReactBase Todo App**

A **Todo app** built with **React** with **Firebase**.

## Getting Started:

### **Test the app:**

Use the link below to test the app live.

[reactbase.ahnafwafiq.com](https://reactbase.ahnafwafiq.com/)

### **Play Around with the code:**

You can see how the app works and the code right here in Github. But if you want to play around with it, I recommend you cloning the repo on your local machine by running the following command on your terminal. Make sure you have te latest version of git installed.

```shell
$ git clone https://github.com/ahnafwafiq09/firebase-react.git
```

Afterwards, you can run any of the following commands to get all the dependencies and packages used by the project. Make sure you have node.js version 18 for higher installed on your system.

```shell
$ npm install
```

If you prefer yarn, run:

```shell
$ yarn install
```

If you prefer pnpm, run:

```shell
$ pnpm install
```

To run a development server on your local system, run the following command:

```shell
$ npm run dev
```

This will open up a development server on your local system at port 5173. Go to http://localhost:5173 on any web browser to use it.

You can also use a cloud version of VSCode by hitting the period (.) key right here in the homepage of the Github Repo.

### **Make Contributions:**

Pull requests are welcome! We appreciate you wanting to improve our project with your own features and fixes. For major changes, please open an issue first to discuss what you would like to be changed. If you want to make contributions, fork the repo and start working on a seperate git branch. When your done, submit a pull request for us to review your changes. Github Actions will run checks on your code to validate it. After we merge your pull request, another Github Actions workflow will automatically deploy it to the Hosting and your changes will be live with 10-15 minutes.

## Basic Overview:

The project is very basic and uses very basic react and firebase features. There is not a lot going on underneeth the hood. It handless user authentication using Firebase and stores the todo items in a Cloud Firestore instance.

### **Front-end:**

For the front-end, the project uses **React.js** version 18. The reason for using **React** is because it is the most popular UI library right now. Not because it is the fastest or most efficient because there are much faster frameworks/libraries out there. React gives you enough flexibility to build **beautiful** and **responsive** apps quickly. But it is relatively slow because it ships a **virtual DOM** to the frontend along with the javascript bundle which makes it notoriously slow and hard to load. The index.html is also fully empty with just a root div and a reference to the main script.js file in the body element. So it is very bad for SEO. Despite all that, I decided to ignore those and just get familier with **React** and **Firebase**.

### **Build Tool**

The project uses **Vite** as the build tool. **Vite** is benchmarked to be much faster than traditional options like **Webpack** and **Parcel**. It also supports **HMR (Hot module replacement)** which makes it much better for development. **Vite** also supports **Typescript** and **ESLint** out of the box which is what we are using on this project. **Vite** also uses native **ES Modules** which provides much better developer experience than **common.js** and other module types. Thus I decided to use it for this project.

### **Linting and Type safety:**

**Javascript** being a **dynamicly typed language**, is prone to **bugs** and **runtime errors**. Being **dynamicly typed** also reduces the ammount of **intellisense** the IDE can provide and reduces developer productivity. **Static typing** is essential for productivity and it drasticly reduces runtime and production errors. The app uses **Typescript** and **ESlint** for type **inference** and **safety**. Both of these also allow for a **great developer experience** and reduces **runtime** and **production** bugs and errors. The **Firebase SDK** supports **Typescript** out of the box which makes using it very easy for this project. We can also use **Typescript JSX** with **React** which is natively supported by **Vite, Typescript, ESLint and React**. You can check if the app has type errors by running the two following commands:

```shell
$ npm run lint
```

```shell
$ npm run typecheck
```

You can also use yarn or pnpm instead of npm accordingly.

### **Back-end:**

The project has almost no back-end infrastructure of it's own. Instead, it uses Firebase for everything. The Firebase SDK provides secure and powerful back-end tools for front-end developers which allows them to leverage the power of GCP for little to no cost at all. This project is build fully with Firebase starting from User authenticaion, Database, and even Hosting. Firebase is secure by default which is the main reason behind using it. Self-hosted back-ends take a lot of effort to be scalable and secure. Firebase handles all of that for you allowing great developer experience. A few noticable cons of using Firebase is that the bundle usually gets really large in production. Luckily, vite accounts fir that by using creative code-splitting and dynamically importing only packages that the end user needs. This will be talked about me below.
